import React from 'react';
import './App.css';
import { Provider } from 'react-redux'

import store from './redux/store.js'
import Canvas from 'components/canvas/canvas.js'
import Controls from 'components/controls/controls.js'
import Footer from 'components/footer/footer.js'


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>THE GAME OF <span id="lifespan">LIFE</span>.</h1>
        </header>

        <main>
          <Canvas />
          <Controls />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </Provider>
  );
}

export default App;
