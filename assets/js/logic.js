//select each card div by id and assign to variables
var startCard = document.querySelector('#start-card');
var questionCard = document.querySelector('#question-card');
var scoreCard = document.querySelector('#score-card');
var leaderBoardCard = document.querySelector('#leaderboard-card');
var questions;

//hide all cards
function hideCards() {
	startCard.setAttribute('hidden', true);
	questionCard.setAttribute('hidden', true);
	scoreCard.setAttribute('hidden', true);
	leaderBoardCard.setAttribute('hidden', true);
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
	time = questions.length * 15;

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
var timeDisplay = document.querySelector('#time');

function displayTime() {
	timeDisplay.textContent = time;
}

//display the question and answer options for the current question
function displayQuestion() {
	var question = questions[currentQuestion];
	var options = question.options;

	var h2QuestionElement = document.querySelector('#question-text');
	h2QuestionElement.textContent = question.questionText;

	for (var i = 0; i < options.length; i++) {
		var option = options[i];
		var optionButton = document.querySelector('#option' + i);
		optionButton.textContent = option;
	}

}

//behaviour when an answer button is clicked: click event bubbles up to div with id 'quiz-options'
document.querySelector('#quiz-options').addEventListener('click', checkAnswer);

//Compare the text content of the option button with the answer to the current question
function optionIsCorrect(optionButton) {
	return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect, penalise time
function checkAnswer(eventObject) {
	var optionButton = eventObject.target;
	var soundCorrect = new Audio('.assets/sfx/correct.wav');
	var soundIncorrect = new Audio('.assets/sfx/incorrect.wav');
	resultDiv.style.display = 'block';
	if (optionIsCorrect(optionButton)) {
		resultText.textContent = 'Correct!';
		setTimeout(hideResultText, 1000);
		soundCorrect.play();
	} else {
		resultText.textContent = 'Incorrect!';
		soundIncorrect.play();
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

function storeScore(event) {
	//prevent default behaviour of form submission
	event.preventDefault();

	//check for input
	if (!inputElement.value) {
		alert('Please enter your initials before pressing submit!');
		return;
	}
	//store score and initials in an object
	var leaderBoardItem = {
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
		var leaderBoardArray = getLeaderBoard();
		//append new leader's board item to leader's board array
		leaderBoardArray.push(leaderBoardItem);
		localStorage.setItem('leaderBoardArray', JSON.stringify(leaderBoardArray));
	}

	//get 'leaderBoardArray' from local storage (if it exists) and parse it into a javascript object using JSON.parse
	function getLeaderBoard() {
		var storedLeaderBoard = localStorage.getItem('leaderBoardArray');
		if (storedLeaderBoard !== null) {
			var leaderBoardArray = JSON.parse(storedLeaderBoard);
			return leaderBoardArray;
		} else {
			leaderBoardArray = [];
		}
		return leaderBoardArray;
	}
}

//display leader's board on leader's board card
function renderLeaderBoard() {
	var sortedLeaderBoardArray = sortLeaderBoard();
	var scoreList = document.querySelector('#highscore-list');
	scoreList.innerHTML = '';
	for (var i = 0; i < sortedLeaderBoardArray.length; i++) {
		var leaderBoardEntry = sortedLeaderBoardArray[i];
		var newListItem = document.createElement('li');
		newListItem.textContent =
			leaderBoardEntry.initials + ' - ' + leaderBoardEntry.score;
		scoreList.append(newListItem);
	}
}

//sort leader's board array from highest to lowest
function sortLeaderBoard() {
	var leaderBoardArray = getLeaderBoard();
	if (!leaderBoardArray) {
		return;
	}

	leaderBoardArray.sort(function(a, b) {
		return b.score - a.score;
	});
	return leaderBoardArray;
}

var clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearScores);

//clear local storage and display empty leader's board
function clearScores() {
	localStorage.clear();
	renderLeaderBoard();
}

var backButton = document.querySelector('#back-button');
backButton.addEventListener('click', returnToStart);

//Hide leader's board card show start card
function returnToStart() {
	hideCards();
	startCard.removeAttribute('hidden');
}

//use link to view scores from any point on the page
var leaderBoardLink = document.querySelector('#leaderboard-link');
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

function renderLeaderBoard() {
	var sortedLeaderBoardArray = sortLeaderBoard();
	var scoreList = document.querySelector('#highscore-list');
	scoreList.innerHTML = '';
	for (var i = 0; i < sortedLeaderBoardArray.length; i++) {
		var leaderBoardEntry = sortedLeaderBoardArray[i];
		var newListItem = document.createElement('li');
		newListItem.textContent =
			leaderBoardEntry.initials + ' - ' + leaderBoardEntry.score;
		scoreList.append(newListItem);
	}
}

//sort leader's board array from highest to lowest
function sortLeaderBoard() {
	var leaderBoardArray = getLeaderBoard();
	if (!leaderBoardArray) {
		return;
	}

	leaderBoardArray.sort(function(a, b) {
		return b.score - a.score;
	});
	return leaderBoardArray;
}
var clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearScores);

//clear local storage and display empty leader's board
function clearScores() {
	localStorage.clear();
	renderLeaderBoard();
}
var backButton = document.querySelector('#back-button');
backButton.addEventListener('click', returnToStart);

//hide leader's board card show start card
function returnToStart() {
	hideCards();
	startCard.removeAttribute('hidden');
}
//use link to view scores from any point on the page
var leaderBoardLink = document.querySelector('#leaderboard-link');
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