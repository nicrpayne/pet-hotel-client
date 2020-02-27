import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AddPetForm from '../AddPetForm/AddPetForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          
        ><AddPetForm />
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
