import React from 'react';
import './App.css';
import { Provider } from 'react-redux'

import store from './redux/store.js'
import Canvas from './components/canvas/canvas.js'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>THE GAAAME. OF <span id="lifespan">LIFE</span>.</h1>
        </header>

        <Canvas />

      </div>
    </Provider>
  );
}

export default App;
