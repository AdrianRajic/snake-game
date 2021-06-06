document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 // first div in our grid
  let appleIndex = 0 // first div in our grid
  let currentSnake = [2,1,0] // 2 = head, 0 = tail with all 1's being the body
  let direction = 1 // snake will always go 1 div down the array
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0


  //to start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake')) // takes each index of the current snake array in to consideration and removes all classnames of snake from the divs the current snake array is in
    squares[appleIndex].classList.remove('apple') // removes the apple class from the div 
    clearInterval(interval) // resetting everything (score, interval etc)
    score = 0
    randomApple() // randomly generates an apple and after that wright what i want to happen
    direction = 1 
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake')) // adds class name to the divs that the snake array is currently in
    interval = setInterval(moveOutcomes, intervalTime) // this function deals with any outcomes for our decisions to move the snake
  }


  //function that deals with all the outcomes of the Snake
  function moveOutcomes() {

    //deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //if snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //if snake goes into itself
    ) {
      return clearInterval(interval) //this will clear the interval if any of the above happen
    }

    // defines what the tail is

    const tail = currentSnake.pop() //removes last item of the array and shows it
    squares[tail].classList.remove('snake')  //removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head of the array

    //deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple') // removes apple class name for a clean slate
      squares[tail].classList.add('snake') // adds a class and makes the snake appear to grow longer
      currentSnake.push(tail) 
      randomApple() // generates a new apple when this one is gone
      score++ // adds 1 to the score
      scoreDisplay.textContent = score // displays new score 
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnake[0]].classList.add('snake')
  }


  //generate new apple once apple is eaten
  function randomApple() {
    do{
      appleIndex = Math.floor(Math.random() * squares.length) // generates a random number based on the squares length and makes the apple appear anywhere on the grid
    } while(squares[appleIndex].classList.contains('snake')) //makes sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple') 
  }


  //assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake') // removes the classlists for snake betwwen each move, prevents the snake from appearing to be left behind

    if(e.keyCode === 39) {
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one div in the grid
    } else if (e.keyCode === 38) {
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      direction = -1 // if we press left, the snake will go left one div in the grid
    } else if (e.keyCode === 40) {
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})
