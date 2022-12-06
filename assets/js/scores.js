
//display scorecard and hide other divs
var  score = document.querySelector("#score");

//at end of quiz, clear the timer, hide any visible cards and display the scorecard and display the score as the remaining time
function endQuiz() {
  clearInterval(intervalID);
  hideCards();
  scoreCard.removeAttribute("hidden");
  score.textContent = time;
}

var  submitButton = document.querySelector("#submit-button");
var  inputElement = document.querySelector("#initials");

//store user initials and score when submit button is clicked
submitButton.addEventListener("click", storeScore);

function storeScore(event) {
  //prevent default behaviour of form submission
  event.preventDefault();

  //check for input
  if (!inputElement.value) {
    alert("Please enter your initials before pressing submit!");
    return;
  }

  //store score and initials in an object
  var  leaderboardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderboard(leaderboardItem);

  //hide the question card, display the leaderboardcard
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  renderLeaderboard();
}

//updates the leaderboard stored in local storage
function updateStoredLeaderboard(leaderboardItem) {
  var  leaderboardArray = getLeaderboard();
  //append new leaderboard item to leaderboard array
  leaderboardArray.push(leaderboardItem);
  localStorage.setItem("leaderboardArray", JSON.stringify(leaderboardArray));
}

//get "leaderboardArray" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
  var  storedLeaderboard = localStorage.getItem("leaderboardArray");
  if (storedLeaderboard !== null) {
    var  leaderboardArray = JSON.parse(storedLeaderboard);
    return leaderboardArray;
  } else {
    leaderboardArray = [];
  }
  return leaderboardArray;
}

//display leaderboard on leaderboard card
function renderLeaderboard() {
  var  sortedLeaderboardArray = sortLeaderboard();
  var  highscoreList = document.querySelector("#highscore-list");
  highscoreList.innerHTML = "";
  for (var  i = 0; i < sortedLeaderboardArray.length; i++) {
    var  leaderboardEntry = sortedLeaderboardArray[i];
    var  newListItem = document.createElement("li");
    newListItem.textContent =
      leaderboardEntry.initials + " - " + leaderboardEntry.score;
    highscoreList.append(newListItem);
  }
}

//sort leaderboard array from highest to lowest
function sortLeaderboard() {
  var  leaderboardArray = getLeaderboard();
  if (!leaderboardArray) {
    return;
  }

  leaderboardArray.sort(function (a, b) {
    return b.score - a.score;
  });
  return leaderboardArray;
}

var  clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", clearHighscores);

//clear local storage and display empty leaderboard
function clearHighscores() {
  localStorage.clear();
  renderLeaderboard();
}

var  backButton = document.querySelector("#back-button");
backButton.addEventListener("click", returnToStart);

//Hide leaderboard card show start card
function returnToStart() {
  hideCards();
  startCard.removeAttribute("hidden");
}

//use link to view highscores from any point on the page
var  leaderboardLink = document.querySelector("#leaderboard-link");
leaderboardLink.addEventListener("click", showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute("hidden");

  //stop countdown
  clearInterval(intervalID);

  //assign undefined to time and display that, so that time does not appear on page
  time = undefined;
  displayTime();

  //display leaderboard on leaderboard card
  renderLeaderboard();
}