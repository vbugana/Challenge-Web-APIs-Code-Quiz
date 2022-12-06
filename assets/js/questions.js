//Var with array and object for questions, store question text, options and answers in an array
var questions = [
  {
    questionText: 'Commonly used data types DO NOT include:',
    options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
    answer: '3. alerts',
  },
  {
    questionText: 'Arrays in JavaScript can be used to store ______.',
    options: [
      '1. numbers and strings',
      '2. other arrays',
      '3. booleans',
      '4. all of the above',
    ],
    answer: '4. all of the above',
  },
  {
    questionText:
      'String values must be enclosed within _____ when being assigned to variables.',
    options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
    answer: '3. quotes',
  },
  {
    questionText:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    options: [
      '1. JavaScript',
      '2. terminal/bash',
      '3. for loops',
      '4. console.log',
    ],
    answer: '4. console.log',
  },
  {
    questionText:
      'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
    options: ['1. break', '2. stop', '3. halt', '4. exit'],
    answer: '1. break',
  },
];

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

  //hide the question card, display the leader's board card
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
}}