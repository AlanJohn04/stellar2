#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, token, Address, Env, Symbol,
};

#[contracttype]
pub enum DataKey {
    Admin,
    TargetAmount,
    Token,
    PledgedAmount,
    Claimed,
    Pledger(Address),
}

#[contract]
pub struct Crowdfund;

#[contractimpl]
impl Crowdfund {
    pub fn initialize(env: Env, admin: Address, token: Address, target_amount: i128) {
        admin.require_auth();
        if env.storage().instance().has(&DataKey::Admin) {
            panic!("already initialized");
        }
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token);
        env.storage().instance().set(&DataKey::TargetAmount, &target_amount);
        env.storage().instance().set(&DataKey::PledgedAmount, &0i128);
        env.storage().instance().set(&DataKey::Claimed, &false);
    }

    pub fn pledge(env: Env, pledger: Address, amount: i128) {
        pledger.require_auth();
        if amount <= 0 {
            panic!("amount must be positive");
        }
        
        let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let token_client = token::Client::new(&env, &token_id);
        
        token_client.transfer(&pledger, &env.current_contract_address(), &amount);

        let mut current_pledged: i128 = env.storage().instance().get(&DataKey::PledgedAmount).unwrap();
        current_pledged += amount;
        env.storage().instance().set(&DataKey::PledgedAmount, &current_pledged);

        let pledger_key = DataKey::Pledger(pledger.clone());
        let mut user_pledged: i128 = env.storage().persistent().get(&pledger_key).unwrap_or(0);
        user_pledged += amount;
        env.storage().persistent().set(&pledger_key, &user_pledged);

        env.events().publish((symbol_short!("Pledged"), pledger), amount);
    }

    pub fn claim(env: Env) {
        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        
        let target: i128 = env.storage().instance().get(&DataKey::TargetAmount).unwrap();
        let current_pledged: i128 = env.storage().instance().get(&DataKey::PledgedAmount).unwrap();
        
        if current_pledged < target {
            panic!("target not reached");
        }
        
        let claimed: bool = env.storage().instance().get(&DataKey::Claimed).unwrap();
        if claimed {
            panic!("already claimed");
        }
        
        let token_id: Address = env.storage().instance().get(&DataKey::Token).unwrap();
        let token_client = token::Client::new(&env, &token_id);
        
        token_client.transfer(&env.current_contract_address(), &admin, &current_pledged);
        env.storage().instance().set(&DataKey::Claimed, &true);

        env.events().publish((symbol_short!("Claimed"),), current_pledged);
    }

    pub fn get_status(env: Env) -> (i128, i128) {
        let target: i128 = env.storage().instance().get(&DataKey::TargetAmount).unwrap_or(0);
        let pledged: i128 = env.storage().instance().get(&DataKey::PledgedAmount).unwrap_or(0);
        (target, pledged)
    }
}
