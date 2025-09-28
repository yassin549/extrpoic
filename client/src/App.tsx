import { useState } from 'react';
import AviatorCanvas from './components/Game/AviatorCanvas';
import WalletModal from './components/Wallet/WalletModal';
import { useGameState } from './hooks/useGameState';

function App() {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const { gameState, isConnected } = useGameState();

  return (
    <main className="w-screen h-screen bg-[#06060A] text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setIsWalletOpen(true)} 
          className="bg-[#8A3FFC] hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Wallet
        </button>
      </div>
      <div className="w-full max-w-4xl h-[600px]">
        <AviatorCanvas gameState={gameState} isConnected={isConnected} />
      </div>
      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </main>
  );
}

export default App;
