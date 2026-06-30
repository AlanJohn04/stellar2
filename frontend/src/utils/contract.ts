import * as StellarSdk from "@stellar/stellar-sdk";

export const fetchContractStatus = async (
  contractId: string,
  networkUrl: string,
  networkPassphrase: string
): Promise<{ targetAmount: number; pledgedAmount: number } | null> => {
  try {
    const server = new StellarSdk.rpc.Server(networkUrl);
    
    // We can use a dummy account to simulate read-only calls
    const sourceAccount = new StellarSdk.Account(
      "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF",
      "0"
    );

    const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        StellarSdk.Operation.invokeHostFunction({
          func: StellarSdk.xdr.HostFunction.hostFunctionTypeInvokeContract(
            new StellarSdk.xdr.InvokeContractArgs({
              contractAddress: StellarSdk.Address.fromString(contractId).toScAddress(),
              functionName: "get_status",
              args: [],
            })
          ),
          auth: [],
        })
      )
      .setTimeout(30)
      .build();

    const simulation = await server.simulateTransaction(tx);
    
    if (StellarSdk.rpc.Api.isSimulationError(simulation)) {
      console.error("Simulation failed:", simulation.error);
      return null;
    }

    if (simulation.result && simulation.result.retval) {
      const resultVal = simulation.result.retval;
      
      if (resultVal.switch().name === "scvVec") {
        const vec = resultVal.vec();
        if (vec && vec.length === 2) {
          const targetAmount = Number(StellarSdk.scValToNative(vec[0]));
          const pledgedAmount = Number(StellarSdk.scValToNative(vec[1]));
          return { targetAmount, pledgedAmount };
        }
      }
    }
    
    return null;
  } catch (error) {
    console.error("Failed to fetch contract status:", error);
    return null;
  }
};
