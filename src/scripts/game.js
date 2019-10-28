
// canvasElement, props.width, props.height, props.tileDimensions, props.turnTime, props.lifeDensity)
let startGame = (canvas, width, height, tileDimensions, turnTime, lifeDensity) => {
   let ctx = canvas.getContext('2d')

   // Uses dimensions to determine how many tiles our canvas can fit
   let gameBoard = createBoard(width, height, tileDimensions)
   gameBoard = populate(gameBoard, lifeDensity)
   
   // Contains the call to draw(), hence w/h/dimensions. There must be a better way.
   advanceTime(ctx, width, height, gameBoard, tileDimensions, turnTime)
}

// I am certain there is a better way to do this. I understand what 'hacking' means to a developer now.
// Giddy personal project progress waits for no man. Or sound architecture.
let paused = false
export function pause() {
   paused = !paused
}


class Tile {
   constructor(x, y, life = false) {
      this.life = life
      this.x = x
      this.y = y
      this.neighbors = 0
   }

   decideFate(gameBoard) {
      // Via Wikipedia:
      // 1) Any live cell with fewer than two live neighbours dies, as if by underpopulation.
      // 2) Any live cell with two or three live neighbours lives on to the next generation.
      // 3) Any live cell with more than three live neighbours dies, as if by overpopulation.
      // 4) Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
      this.neighbors = 0

      for (let i = this.x - 1; i <= this.x + 1; i++) {
         for (let j = this.y - 1; j <= this.y + 1; j++) {
            if (i === this.x && j === this.y) { 
               continue // If we're examining ourselves, go to the next loop.
            }
            if (i < 0 || j < 0 || i >= gameBoard.length || j >= gameBoard[i].length) {
               continue // If we're outside bounds, go to the next loop
            }
            if (gameBoard[i][j].life) {
               this.neighbors++
            }
            if (gameBoard[i][j].life === false) {
               // ...
            }
         }
      }
    
      
      if (this.life) {
         if (this.neighbors < 2) {
            return false
         }
         if (this.neighbors === 2 || this.neighbors === 3) {
            return true
         }
         if (this.neighbors > 3) {
            return false
         }
      }

      if (this.life === false) {
         if (this.neighbors === 3) {
            return true
         }
      }
      
      return false
   }
}


let createBoard = (width, height, tileDimensions) => {
   let _gameBoard
   let tilesWide = Math.floor(width / tileDimensions)
   let tilesHigh = Math.floor(height / tileDimensions)
   
   // We want to create our two dimensional array first.
   _gameBoard = new Array(tilesWide)

   for (let i = 0; i < tilesWide; i++) {
      _gameBoard[i] = new Array(tilesHigh)
   }
   
   // Then we can fill it by index.
   for (let i = 0; i < tilesWide; i++) {
      for (let j = 0; j < tilesHigh; j++) {
         _gameBoard[i][j] = new Tile(i, j)
      }
   }
   // C#: Tile[,] gameTiles = new Tile[tilesWide, tilesHigh]. Done.

   return _gameBoard
}   

let populate = (gameBoard, lifeDensity) => {
   
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
         let thisRoll = Math.random()
         
         gameBoard[i][j].life = thisRoll <= lifeDensity ? true : false
      }
   }

   // long rectangle for tests:
   // gameBoard[1][1].life = true
   // gameBoard[2][1].life = true
   // gameBoard[3][1].life = true
   // gameBoard[1][2].life = true
   // gameBoard[2][2].life = true
   // gameBoard[3][2].life = true

   return gameBoard
}

let drawBoard = (ctx, width, height, gameBoard, tileDimensions) => {
   ctx.clearRect(0, 0, width, height) // Clear the board before a redraw. Otherwise we get trails.
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
         let tile = gameBoard[i][j]

         if (tile.life === true) {
            ctx.fillStyle = '#77af77'
            ctx.fillRect(tile.x*tileDimensions, tile.y*tileDimensions, tileDimensions, tileDimensions)
         } else {
            ctx.strokeStyle = 'rgb(30, 30, 42)'
            ctx.strokeRect(tile.x*tileDimensions, tile.y*tileDimensions, tileDimensions, tileDimensions)
         }
      }
   }
}



let advanceTime = (ctx, width, height, gameBoard, tileDimensions, turnTime) => {
   let nextBoard = createBoard(width, height, tileDimensions)
   
   // We must create a separate copy - calculation needs to be applied all-at-once,
   // and just creating a new variable operated by reference to the original.
   // Which meant each changed tile would influence the subsequent tiles. We don't want that.
   for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
         nextBoard[i][j].life = gameBoard[i][j].life
      }
   }

   if (!paused) {
      for (let i = 0; i < gameBoard.length; i++) {
         for (let j = 0; j < gameBoard[i].length; j++) {
            nextBoard[i][j].life = gameBoard[i][j].decideFate(gameBoard)
         }
      }
      drawBoard(ctx, width, height, gameBoard, tileDimensions) // Uses dimensions just to draw shapes of a size.
   }

   setTimeout( () => {
      console.log("tick")
      advanceTime(ctx, width, height, nextBoard, tileDimensions, turnTime)
   }, turnTime)
}

// let timeNextLoop = setTimeout( () => {
//    console.log("tick")
//    advanceTime(ctx, width, height, nextBoard, tileDimensions, turnTime)
// }, turnTime)
export default startGame