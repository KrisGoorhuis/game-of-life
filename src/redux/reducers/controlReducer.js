const initialState = {
   canvasElement: null,
   width: '600',
   height: '400',
   lifeDensity: .10,
   iterations: 0,
   turnTime: 350,
   tileDimensions: 7,
}

export default function controls(state = initialState, action) {
   switch (action.type) {
      case ('SET_CANVAS'):
         return {
            ...state,
            canvasElement: action.payload
         }

      case ('SET_NEW_BOARD'):
         return {
            ...state,
            width: action.payload.width,
            height: action.payload.height,
            lifeDensity: action.payload.lifeDensity,
            iterations: action.payload.iterations,
            turnTime: action.payload.turnTime,
            tileDimensions: action.payload.tileDimensions
         }
      default:
         return state
   }
}
