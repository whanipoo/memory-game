//My Github repository for this project: https://github.com/whanipoo/memory-game

//Define varibles
var openedCards = [];
var allCards = document.querySelectorAll('[class="card"]');
var moves= document.querySelector('.moves');
var turnCount = 0;
var allStars = document.querySelectorAll('.fa-star');
var star = allStars[2];
var matchedCards = [];
var container = document.querySelector('.container');
var congrats = document.querySelector('.congrats');
var results = document.querySelector('.results');
var button = document.querySelector('button');
var starResult = 3;
var time = 0;
let timerOn = false;
let timerId;
var minutes = 0;
var seconds = 0;
var deck = document.querySelector('.deck');
var restart = document.querySelector('.restart');

//A Function that starts timer
function timerStart() {
    timerId = setInterval(() => {
    time++;
    console.log(time);
    displayTime();
  },1000);
}

//A Function that stops timer
function timerStop(){
  time=0;
  clearInterval(timerId);
}

//A Function that displays timer
function displayTime(){
  var minDisplay= document.querySelector('.minutes');
  var secDisplay= document.querySelector('.seconds');
  minutes = Math.floor(time/60);
  seconds = time%60;
  minDisplay.textContent = minutes;
  if(seconds < 10){
    secDisplay.textContent = '0'+seconds;
  }
  else{
    secDisplay.textContent = seconds;
  }

}


//A fuction that resets the Game
function reset() {
  timerStop();
  timerOn=false;
  time=0;
  //Flip all opened cards back
  openedCards.forEach(function(card) {
    card.classList.remove('open', 'show', 'match');
  });
  matchedCards.forEach(function(card) {
    card.classList.remove('open', 'show', 'match');
  });
  //Shuffle cards
  for (var i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
  }
  //Reset the game
  openedCards = [];
  matchedCards = [];
  //Reset timer, moves counter, and stars
  timerStop();
  turnCount=0;
  moves.textContent = turnCount;
  displayTime();

   allStars.forEach(function(currentstar) {
    currentstar.classList.add('fa-star');
    currentstar.classList.remove('fa-star-o');
    star = allStars[2];
  });
}

//Cards will be shuffled everytime the game starts or restarts
reset();

//Setting up each card for the game
allCards.forEach(function(clickedCard){
  clickedCard.addEventListener('click', function(e) {

    //Flipping the card that was clicked
    if (openedCards.length<2 && !openedCards.includes(clickedCard) && !matchedCards.includes(clickedCard) ) {
      clickedCard.classList.add('open', 'show');
      openedCards.push(clickedCard);
      console.log (openedCards.length);

      //Once the first card is clicked, the timer will start
      if (timerOn==false) {
        timerStart();
        timerOn=true;
      }
    }

    //When two cards are opened, we will check if they macth
    if (openedCards.length>1){
      if(
        openedCards[0].firstElementChild.className ===
        openedCards[1].firstElementChild.className
      ) {
        openedCards[0].classList.remove('open', 'show');
        openedCards[0].classList.add('match');
        openedCards[1].classList.remove('open', 'show');
        openedCards[1].classList.add('match');
        matchedCards.push(openedCards[0],openedCards[1]);
        openedCards = [];
      }

      //If the two cards don't match, they'll flip back
      else {
        setTimeout( function(){
          openedCards.forEach( function(clickedCard) {
            clickedCard.classList.remove('open', 'show');
            openedCards = [];
          });
        },500);
      }

      //Moves counter
      turnCount+=1;
      moves.textContent = turnCount;

      // Star rating
      if(turnCount==12||turnCount==16) {
        star.classList.remove('fa-star');
        star.classList.add('fa-star-o');
        star = allStars[1];
      }

      //If the player matches all cards, it will trigger the winning screen
      if (matchedCards.length == 16) {
        if(turnCount >=12&& turnCount<16) {
          starResult=2;
        }
        else if (turnCount >=16) {
          starResult=1;
        }
        console.log('You did it!! Congratulations!!');
        if(seconds < 10){
          results.textContent = 'It took you '+turnCount+ " moves, "+minutes+":0"+seconds+ " minutes, and you got "+starResult+" stars. Good job!";
        }
        else{
          results.textContent = 'It took you '+turnCount+ " moves, "+minutes+":"+seconds+ " minutes, and you got "+starResult+" stars. Good job!";
        }

        //Congratulations message will show up.
        setTimeout( function() {
        container.style.display="none";}, 700);
        congrats.style.display="inherit";

        //Congratulations message disappear when the button is clicked.
        button.addEventListener('click', function(e) {
          //Restart the game
          reset();
          congrats.style.display="none";
          container.style.display="";
        });
      }
    }
  });
});



//Restart button
restart.addEventListener('click', function(e) {
  //Restart the game
  reset();
});




// Udacity comments>>

// Shuffle function from http://stackoverflow.com/a/2450976
// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//
//     return array;
// }

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
