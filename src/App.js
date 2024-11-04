import React from 'react';
import './index.css';
import Navbar from './components/Navbar';
import CryptoTable from './components/CryptoTable';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main id="prices" className="pt-4">
        <CryptoTable />
      </main>
    </div>
  );
}

export default App;
