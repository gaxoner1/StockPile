import React from 'react';
import Stocks from './stocks.js'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Stock Pile</p>
        <Stocks/>
      </header>
    </div>
  );
}

export default App;
