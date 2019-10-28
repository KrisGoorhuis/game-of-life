import React, { useEffect } from 'react'
import './canvas.css'
import { connect } from 'react-redux'

import startGame from 'scripts/game.js'


// Draw is called in app.js
// game.js then accesses main_canvas below
let Canvas = (props) => {
   
   useEffect( () => {
      let canvasElement = document.querySelector('#main_canvas')
      props.dispatch({type: 'SET_CANVAS', payload: canvasElement})
      startGame(canvasElement, props.width, props.height, props.tileDimensions, props.turnTime, props.lifeDensity)
   }, [])

   return (
      <div id="canvas_container">
         <canvas 
            id="main_canvas"
            width={props.width}
            height={props.height}
         >
         </canvas>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      width: state.controlReducer.width,
      height: state.controlReducer.height,
      tileDimensions: state.controlReducer.tileDimensions,
      turnTime: state.controlReducer.turnTime,
      lifeDensity: state.controlReducer.lifeDensity,
      iterations: state.controlReducer.iterations,
   }
}

export default connect(mapStateToProps)(Canvas)