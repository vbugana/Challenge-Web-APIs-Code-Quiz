
//display scorecard and hide other divs
var  score = document.querySelector('#highscoreList');


var  clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearHighscores);

//clear local storage and display empty leaderboard
function clearHighscores() {
  localStorage.clear();
  renderLeaderboard();
}

var  backButton = document.querySelector('#back-button');
backButton.addEventListener('click', returnToStart);

//Hide leaderboard card show start card
function returnToStart() {


  hideCards();
  startCard.removeAttribute('hidden');
}

//use link to view highscores from any point on the page
var  leaderboardLink = document.querySelector('.leaderboard-link');
leaderboardLink.addEventListener('click', showLeaderboard);

function showLeaderboard() {
  hideCards();
  leaderboardCard.removeAttribute('hidden');

  //stop countdown
  clearInterval(intervalID);

  //assign undefined to time and display that, so that time does not appear on page
  time = undefined;
  displayTime();

  //display leaderboard on leaderboard card
  renderLeaderboard();
}
