//select each card div by id and assign to variables
var startCard = document.querySelector('#start-card');
var questionCard = document.querySelector('#question-card');
var scoreCard = document.querySelector('#score-card');
var leaderboardCard = document.querySelector('#leaderboard-card');



//hide all cards
function hideCards() {
  startCard.setAttribute('hidden', true);
  questionCard.setAttribute('hidden', true);
  scoreCard.setAttribute('hidden', true);
  leaderboardCard.setAttribute('hidden', true);
}

var resultDiv = document.querySelector('#result-div');
var resultText = document.querySelector('#result-text');

//hide result div
function hideResultText() {
  resultDiv.style.display = 'none';
}

//these variables are required globally
var intervalID;
var time;
var currentQuestion;

document.querySelector('#start-button').addEventListener('click', startQuiz);

function startQuiz() {
  //hide any visible cards, show the question card
  hideCards();
  questionCard.removeAttribute('hidden');

  //assign 0 to currentQuestion when start button is clicked, then display the current question on the page
  currentQuestion = 0;
  displayQuestion();

  //set total time depending on number of questions
  time = questions.length * 10;

  //executes function 'countdown' every 1000ms to update time and display on page
  intervalID = setInterval(countdown, 1000);

  //invoke displayTime here to ensure time appears on the page as soon as the start button is clicked, not after 1 second
  displayTime();
}

//reduce time by 10 and display new value, if time runs out then end quiz
function countdown() {
  time--;
  displayTime();
  if (time < 10) {
    endQuiz();
  }
}

//display time on page
var  timeDisplay = document.querySelector('#time');
function displayTime() {
  timeDisplay.textContent = time;
}

//display the question and answer options for the current question
function displayQuestion() {
  var  question = questions[currentQuestion];
  var  options = question.options;

  var  h2QuestionElement = document.querySelector('#question-text');
  h2QuestionElement.textContent = question.questionText;

  for (var  i = 0; i < options.length; i++) {
    var  option = options[i];
    var  optionButton = document.querySelector('#option' + i);
    optionButton.textContent = option;
  }
}

//behaviour when an answer button is clicked: click event bubbles up to div with id 'quiz-options'
//eventObject.target identifies the specific button element that was clicked on
document.querySelector('#quiz-options').addEventListener('click', checkAnswer);

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
  return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
  var  optionButton = eventObject.target;
  resultDiv.style.display = 'block';
  if (optionIsCorrect(optionButton)) {
    resultText.textContent = 'Correct!';
    function play() {
    var correctSound = document.getElementById('#correctAnswer');
  audio.play();
}var audio = new Audio('audio_file.mp3');
audio.play();
    setTimeout(hideResultText, 1000);
  } else {
    resultText.textContent = 'Incorrect!';
     function play() {    
    var incorrectSound = document.getElementById('#incorrectAnswer')
    audio.play();
     }
    setTimeout(hideResultText, 1000);
    if (time >= 10) {
      time = time - 10;
      displayTime();
    } else {
      //if time is less than 10, display time as 0 and end quiz
      //time is set to zero in this case to avoid displaying a negative number in cases where a wrong answer is submitted with < 10 seconds left on the timer
      time = 0;
      displayTime();
      endQuiz();
    }
  }

  //increment current question by 1
  currentQuestion++;
  //if we have not run out of questions then display next question, else end quiz
  if (currentQuestion < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

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
  }

  //store score and initials in an object
  var  leaderboardItem = {
    initials: inputElement.value,
    score: time,
  };

  updateStoredLeaderboard(leaderboardItem);

  //hide the question card, display the leaderboardcard
  hideCards();
  leaderboardCard.removeAttribute('hidden');

  renderLeaderboard();
}

//updates the leaderboard stored in local storage
function updateStoredLeaderboard(leaderboardItem) {
  var  leaderboardArray = getLeaderboard();
  //append new leaderboard item to leaderboard array
  leaderboardArray.push(leaderboardItem);
  localStorage.setItem('leaderboardArray', JSON.stringify(leaderboardArray));
}

//get 'leaderboardArray' from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
  var  storedLeaderboard = localStorage.getItem('leaderboardArray');
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
  var  highscoreList = document.querySelector('#highscoreList');
  highscoreList.innerHTML = '';
  for (var  i = 0; i < sortedLeaderboardArray.length; i++) {
    var  leaderboardEntry = sortedLeaderboardArray[i];
    var  newListItem = document.createElement('li');
    newListItem.textContent =
      leaderboardEntry.initials + ' - ' + leaderboardEntry.score;
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
var  leaderboardLink = document.querySelector('#leaderboard-link');
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