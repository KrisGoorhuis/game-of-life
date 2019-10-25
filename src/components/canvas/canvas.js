import React, { useEffect } from 'react'
import './canvas.css'
import { connect } from 'react-redux'

import startGame from 'scripts/game.js'


// Draw is called in app.js
// game.js then accesses main_canvas below
let Canvas = () => {

   useEffect( () => {
      let canvasElement = document.querySelector('#main_canvas')
      startGame(canvasElement)
   }, [])

   return (
      <div id="canvas_container">
         <canvas 
            id="main_canvas"
            width="600"
            height="400"
         >
            test
         </canvas>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      // ...
   }
}

export default connect(mapStateToProps)(Canvas)