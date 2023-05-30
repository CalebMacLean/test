// Creates Div Cards Section
const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];
  // it returns the same array with values shuffled
  function shuffle(array) {
    let counter = array.length;
    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }
    return array;
  };
  // New Shuffled Array
  let shuffledColors = shuffle(COLORS);
  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");
      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);
      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  };
  
  // Global Variables that store various click data
  const clickedArr = [];
  let clickCounter = 0;
  let isTwoClicked = false;
  let matchesLeft = COLORS.length;
  // General Helper Functions
  function clearArr(arr) {
    for(let i = 0; i <= arr.length; i++) {
      arr.pop();
    }
  };
  
  function handleCardClick(event) {
    // HTML Variables
    const div = event.target;
    const color = div.classList[0];
    // Conditional that checks to see if you are clicking on the same div or if you have more than two divs clicked
    if(div.id === 'clicked-one' || isTwoClicked) {
      return;
    } else if(div.id !== 'game') {
      clickCounter++;
      clickedArr.push(color);
      div.style.backgroundColor = color;
      // Boolean Variables
      let isMatching = clickedArr[0] === clickedArr[1];
      let isTwo = clickCounter === 2;
      // Conditional to determine what to run based on the amounts of clicks and whether or not the div's colors match
      if (clickCounter < 2) {
        div.setAttribute('id', 'clicked-one');
      }
      else if(isTwo && isMatching) {
        let divOne = document.querySelector('#clicked-one');
        divOne.removeAttribute('id');
        clickCounter = 0;
        clearArr(clickedArr);
        matchesLeft -= 2;
      }
      else if(isTwo && !isMatching) {
        isTwoClicked = true;
        let divOne = document.getElementById('clicked-one');
        setTimeout(() => {
            divOne.style.backgroundColor = 'aliceblue';
            div.style.backgroundColor = 'aliceblue';
            isTwoClicked = false;
          }, 1000);
        divOne.removeAttribute('id');
        clickCounter = 0;
        clearArr(clickedArr);
      }
    }
  };
  // game over procedures
  let gameOver = false;
  
  function checkGameProgress() {
    if(matchesLeft === 0) {
      gameOver = true;
    }
  }
  
  function gameWon() {
    checkGameProgress();
    if(gameOver === true) {
      const endContainer = document.querySelector('.end-container');
      const gameBoard = document.querySelector('#game');
      const gameChildren = gameBoard.childElementCount;
      endContainer.style.visibility = 'visible';
      clearArr(clickedArr);
      clickCounter = 0;
      gameOver = false;
      matchesLeft = COLORS.length;
  
      for(let i = 0; i < gameChildren; i++) {
        gameBoard.removeChild(gameBoard.lastChild);
      }
    }
  };
  // Global Variables
  const gameContainer = document.getElementById("game");
  const startBtn = document.querySelector('.start-container .Button');
  const endBtn = document.querySelector('.end-container .Button');
  // Event Listeners
  startBtn.addEventListener('click', function(e) {
    createDivsForColors(shuffledColors);
    const startContainer = document.querySelector('.start-container');
    // gameContainer.style.visibility = 'visible';
    startContainer.style.visibility = 'hidden';
  });
  
  endBtn.addEventListener('click', function() {
    createDivsForColors(shuffledColors);
    const endContainer = document.querySelector('.end-container');
    endContainer.style.visibility = 'hidden';
  });
  
  gameContainer.addEventListener('click', function(e) {
    if(e.target.tagName === 'DIV') {
      handleCardClick(e);
      console.log(gameOver);
    }
    gameWon();
  }); 
  