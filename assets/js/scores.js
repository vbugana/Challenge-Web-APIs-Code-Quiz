//display scorecard and hide other divs
var  score = document.querySelector('#score');
//at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
    clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute('hidden');
  score.textContent = time;
}

var  submitButton = document.querySelector('#submit-button');
var  inputElement = document.querySelector('#initials');

//store user initials and score when submit button is clicked
submitButton.addEventListener('click', storeScore);

function storeScore(event) {
  //prevent default behaviour of form submission
  event.preventDefault();

  //check for input
  if (!inputElement.value) {
    alert('Please enter your initials before pressing submit!');
    return;
  };
   //store score and initials in an object
   var  leaderBoardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderBoard(leaderBoardItem);

  //hide the question card, display the leader board card
  hideCards();
  leaderBoardCard.removeAttribute('hidden');

  renderLeaderBoard();

//updates the leader's board stored in local storage
function updateStoredLeaderBoard(leaderBoardItem) {
  var  leaderBoardArray = getLeaderBoard();
  //append new leader's board item to leader's board array
  leaderBoardArray.push(leaderBoardItem);
  localStorage.setItem('leaderBoardArray', JSON.stringify(leaderBoardArray));
}

//get ' leaderBoardArray' from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderBoard() {
  var  storedLeaderBoard = localStorage.getItem('leaderBoardArray');
  if (storedLeaderBoard !== null) {
    var   leaderBoardArray= JSON.parse(storedLeaderBoard);
    return  leaderBoardArray;
  } else {
    leaderBoardArray = [];
  }
  return  leaderBoardArray;
}}

var  submitButton = document.querySelector('#submit-button');
var  inputElement = document.querySelector('#initials');

//store user initials and score when submit button is clicked
submitButton.addEventListener('click', storeScore);

function storeScore(event) {
  //prevent default behaviour of form submission
  event.preventDefault();

  //check for input
  if (!inputElement.value) {
    alert('Please enter your initials before pressing submit!');
    return;
  }
 
 //store score and initials in an object
 var  leaderBoardItem = {
  initials: inputElement.value,
  score: time,
};

updateStoredLeaderBoard(leaderBoardItem);

//hide the question card, display the leader's board card
hideCards();
leaderBoardCard.removeAttribute('hidden');

renderLeaderBoard();
}

//updates the leader's board stored in local storage
function updateStoredLeaderBoard(leaderBoardItem) {
var  leaderBoardArray = getLeaderBoard();
//append new leader's board item to leader's board array
leaderBoardArray.push(leaderBoardItem);
localStorage.setItem('leaderBoardArray', JSON.stringify(leaderBoardArray));
}

//get 'leaderBoardArray' from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderBoard() {
var  storedLeaderBoard = localStorage.getItem('leaderBoardArray');
if (storedLeaderBoard !== null) {
  var  leaderBoardArray = JSON.parse(storedLeaderBoard);
  return leaderBoardArray;
} else {
  leaderBoardArray = [];
}
return leaderBoardArray;
}

//display leader's board on leader's board card
function renderLeaderBoard() {
var  sortedLeaderBoardArray = sortLeaderBoard();
var  highScoreList = document.querySelector('.highscore-list');
highScoreList.innerHTML = '';
for (var  i = 0; i < sortedLeaderBoardArray.length; i++) {
  var  leaderBoardEntry = sortedLeaderBoardArray[i];
  var  newListItem = document.createElement('li');
  newListItem.textContent =
    leaderBoardEntry.initials + ' - ' + leaderBoardEntry.score;
  highScoreList.append(newListItem);
}
}

//sort leader's board array from highest to lowest
function sortLeaderBoard() {
var  leaderBoardArray = getLeaderBoard();
if (!leaderBoardArray) {
  return;
}

leaderBoardArray.sort(function (a, b) {
  return b.score - a.score;
});
return leaderBoardArray;
}

var  clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearScores);

//clear local storage and display empty leader's board
function clearScores() {
localStorage.clear();
renderLeaderBoard();
}

var  backButton = document.querySelector('#back-button');
backButton.addEventListener('click', returnToStart);

//Hide leader's board card show start card
function returnToStart() {
hideCards();
startCard.removeAttribute('hidden');
}

//use link to view scores from any point on the page
var  leaderBoardLink = document.querySelector('.leaderboard-link');
leaderBoardLink.addEventListener('click', showLeaderboard);

function showLeaderBoard() {
hideCards();
leaderBoardCard.removeAttribute('hidden');

//stop countdown
clearInterval(intervalID);

//assign undefined to time and display that, so that time does not appear on page
time = undefined;
displayTime();

//display leader's board on leader's board card
renderLeaderBoard();
}
//display leader's board on leader's board card
function renderLeaderBoard() {
  var  sortedLeaderBoardArray = sortLeaderBoard();
  var  scoreList = document.querySelector('#highscore-list');
  scoreList.innerHTML = '';
  for (var  i = 0; i < sortedLeaderBoardArray.length; i++) {
    var  leaderBoardEntry = sortedLeaderBoardArray[i];
    var  newListItem = document.createElement('li');
    newListItem.textContent =
      leaderBoardEntry.initials + ' - ' + leaderBoardEntry.score;
    scoreList.append(newListItem);
  }
}

//sort leader's board array from highest to lowest
function sortLeaderBoard() {
  var  leaderBoardArray = getLeaderBoard();
  if (!leaderBoardArray) {
    return;
  }

  leaderBoardArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return leaderBoardArray;
}

var  clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearScores);

//clear local storage and display empty leader's board
function clearScores() {
  localStorage.clear();
  renderLeaderBoard();
}

var  backButton = document.querySelector('#back-button');
backButton.addEventListener('click', returnToStart);

//Hide leader's board card show start card
function returnToStart() {
  hideCards();
  startCard.removeAttribute('hidden');
}

//use link to view scores from any point on the page
var  leaderBoardLink = document.querySelector('.leaderboard-link');
leaderBoardLink.addEventListener('click', showLeaderBoard);

function showLeaderBoard() {
  hideCards();
  leaderBoardCard.removeAttribute('hidden');

  //stop countdown
  clearInterval(intervalID);

  //assign undefined to time and display that, so that time does not appear on page
  time = undefined;
  displayTime();

  //display leader's board on leader's board card
  renderLeaderBoard();
}
