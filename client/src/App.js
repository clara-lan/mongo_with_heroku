import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         
        </p>
        <a
          className="App-link"
          //use relative link and setupProxy file to find root route
          href="/auth/google"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign In with Google.
        </a>
      </header>
    </div>
  );
}

export default App;
