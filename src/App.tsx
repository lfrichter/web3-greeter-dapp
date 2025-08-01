// src/App.tsx

import { WalletInfo } from './components/WalletInfo';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>App with Wagmi</h1>
        <WalletInfo />
      </header>
    </div>
  );
}

export default App;