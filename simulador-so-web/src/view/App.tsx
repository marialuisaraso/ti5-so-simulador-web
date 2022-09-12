import React from 'react';
import simboloLogo from './simboloLogo.png';
import './App.css';
import { main } from '../simulator/main';

function App() {
  React.useEffect(()=>{
    main();
  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={simboloLogo} className="App-logo" alt="logo" />
        <p>
          Simulador de Sistema Operacional.
        </p>
      </header>
    </div>
  );
}

export default App;
