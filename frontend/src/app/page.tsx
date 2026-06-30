import { Crowdfund } from "@/components/Crowdfund";
import { WalletProvider } from "@/components/WalletProvider";

export default function Home() {
  return (
    <WalletProvider>
      <main className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center p-4">
        {/* Background glow effects */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="z-10 w-full max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">
              FutureTwin Funding
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Participate in the decentralized crowdfunding campaign on the Stellar network. Pledge XLM and watch the real-time progress.
            </p>
          </div>
          
          <Crowdfund />
        </div>
      </main>
    </WalletProvider>
  );
}
