import React from 'react'
import { connect } from 'react-redux'

import './controls.css'
import startGame, { pause } from 'scripts/game.js'

let Controls = (props) => {
   let generateNewBoard = () => {
      props.dispatch({type: 'SET_NEW_BOARD', payload: {
         width: document.querySelector('#control_width').value,
         height: document.querySelector('#control_height').value,
         tileDimensions: document.querySelector('#control_dimensions').value,
         turnTime: document.querySelector('#control_time').value,
         lifeDensity: document.querySelector('#control_density').value,
      }})
      startGame(props.canvasElement, props.width, props.height, props.tileDimensions, props.turnTime, props.lifeDensity)
   }

   

   return (
      <div>
         {/* <label>Width</label>
         <input id="control_width" type="text" placeholder={props.width}></input>

         <label>Height</label>
         <input id="control_height" type="text" placeholder={props.height}></input>

         <label>Tile Dimensions</label>
         <input id="control_dimensions" type="text" placeholder={props.tileDimensions}></input>

         <label>Turn Time</label>
         <input id="control_time" type="text" placeholder={props.turnTime}></input>

         <label>Life Density</label>
         <input id="control_density" type="text" placeholder={props.lifeDensity}></input>

         <button onClick={generateNewBoard}>Generate</button> */}
         <button onClick={pause}>Pause</button>
      </div>
   )
}

let mapStateToProps = (state) => {
   return {
      canvasElement: state.controlReducer.canvasElement,
      width: state.controlReducer.width,
      height: state.controlReducer.height,
      tileDimensions: state.controlReducer.tileDimensions,
      turnTime: state.controlReducer.turnTime,
      lifeDensity: state.controlReducer.lifeDensity,
   }
}

export default connect(mapStateToProps)(Controls)