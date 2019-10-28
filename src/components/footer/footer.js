import React from 'react'

import './footer.css'


let Footer = () => {
   return (
      <React.Fragment>
         <h5 id="what_is_this">What is this?</h5>
         <p id="explanation">
            John Conway's Game of Life is a set of simple rules governing the existence 
            of 'cellular automata'. In short, the presence of absense of 'life' in tiles near
            one we aer simulating determines whether it winks out - as if by overpopulation or isolation
             - or happily lives on.
         </p>
      </React.Fragment>
   )
}


export default Footer