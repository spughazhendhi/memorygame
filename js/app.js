"use strict";

/**
* array hold list of cards
*/
 const cards=['fa fa-diamond',
            'fa fa-paper-plane-o',
            'fa fa-anchor',
            'fa fa-bolt',
            'fa fa-cube',
            'fa fa-leaf',
            'fa fa-bicycle',
            'fa fa-bomb'
          ];



displayShuffleCards();

/**
* @description  create cards dynamically and display it on the page
*/
 function displayShuffleCards(){
   const shuffledCards = shuffle(cards.concat(cards));
   const deckObject = document.querySelector('.deck');
   deckObject.innerHTML = '';
   for(let i = 0;i < shuffledCards.length;i++){
      //create li element and add class
      let liObject = document.createElement('li');
      liObject.classList.add('card');
      liObject.addEventListener('click',function(){
        cardClicked(liObject,shuffledCards[i]);
      });

      //create i class and add class from shuffled array
      let iObject = document.createElement('i');
      iObject.className = shuffledCards[i];
      liObject.appendChild(iObject);

      deckObject.appendChild(liObject);
    }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


let opencards=[];
let previousCardObject=null;
let matchCards=[];
let moveCounter=0;
let starCounter=3;
let timerStarted=false;
let timerCount=0;
let intervalTimerObject=null;

/**
* @description  This function handles the onlick of each card
*/
function cardClicked(cardObject,iClass){
  if(cardObject.classList.contains('open') && cardObject.classList.contains('show')){
    return;
  }
  startTimer();
  openCard(cardObject);
  incrementCounter();
  checkCardsAreSame(cardObject,iClass);
}

/**
* @description it opens the clicked card
*/
function openCard(cardObject){
  cardObject.classList.add('open');
  cardObject.classList.add('show');
}

/**
* @description  it close the card when two are not matched
*/
function closeCard(cardObject){
   cardObject.classList.remove('open');
   cardObject.classList.remove('show');
   cardObject.classList.remove('notmatch');
 }

 /**
 * @description  It starts timer when user first click the card
 */
 function startTimer(){
   if(!timerStarted){
     incrementTimer();
     intervalTimerObject = window.setInterval(incrementTimer,1000);
     timerStarted = true;
   }
 }

 /**
 * @description  This function is used to highlight mismatched cards
 */
 function mismatchCard(cardObject){
    cardObject.classList.add('notmatch');
    previousCardObject.classList.add('notmatch');
  }

  /**
  * @description  This function is used to check the two clicked cards are same
  * If two are not same highlight both cards and close it
  */
 function checkCardsAreSame(cardObject,iClass){
    if(opencards.indexOf(iClass) != -1){
       matchingCards(cardObject,iClass);
     }else{
       if(opencards.length>0){
           mismatchCard(cardObject);
           window.setTimeout(function(){
              removeCard(cardObject,iClass);
           },400);
       }else{
           opencards.push(iClass);
           previousCardObject=cardObject;
       }
    }
 }

 /**
 * @description  This function adds the list of matched cards in the array and
 * opens the pop up when user wins the game
 */
 function matchingCards(cardObject,iClass){
   matchCards.push(iClass);
   opencards=[];
   previousCardObject=null;
   if(matchCards.length===8){
         document.querySelector('#finalTimer').innerText = timerCount;
         document.querySelector('#moveCounter').innerText = moveCounter;
         document.querySelector('#starsCount').innerText = starCounter;
         document.querySelector(".modal").style.display = "block";
   }
 }

 /**
 * @description  This function is used to close the cards when they are not matched
 */
 function removeCard(cardObject,iClass){
   closeCard(previousCardObject);
   closeCard(cardObject);
   opencards=[];
   previousCardObject=null;
 }

 /**
 * @description  This function increments the counter when user presses the card
 *  hide the star object based on the number of clicks.
 */
 function incrementCounter(){
   moveCounter++;
   document.querySelector('.moves').innerText=moveCounter;
   if(moveCounter === 21 || moveCounter === 27){
      let starsObject=document.querySelectorAll('.stars .fa.fa-star');
      if(moveCounter === 21){
        starsObject[0].style.visibility = 'hidden';
      }else{
       starsObject[1].style.visibility = 'hidden';
      }
      starCounter--;
   }
 }

//add click event to restart object
 document.querySelector('.restart').addEventListener('click',function(){
   resetGame();
 });

 /**
 * @description  This function resets the game
 */
 function resetGame(){
   opencards = [];
   previousCardObject = null;
   matchCards = [];
   moveCounter = 0;
   starCounter = 3;
   timerCount = 0;
   timerStarted = false;
   document.querySelector('.moves').innerText = moveCounter;
   document.querySelector('.timer').innerText = timerCount;
   let starsObject=document.querySelectorAll('.stars .fa.fa-star');
   starsObject[0].style.visibility = 'visible';
   starsObject[1].style.visibility = 'visible';
   displayShuffleCards();
   if(intervalTimerObject !== null){
     clearInterval(intervalTimerObject);
     intervalTimerObject = null;
   }
 }

 /**
 * @description  This function is used to play the game again.
 */
 function playAgain(){
   document.querySelector('#moveCounter').innerText = "";
   document.querySelector('#finalTimer').innerText = "";
   document.querySelector('#moveCounter').innerText = "";
   document.querySelector(".modal").style.display = "none";
   resetGame();
 }

 /**
 * @description  This function increments the counter.
 */
 function incrementTimer(){
   timerCount++;
   document.querySelector('.timer').innerText = timerCount;
 }
