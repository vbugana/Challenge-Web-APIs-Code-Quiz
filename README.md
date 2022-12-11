# Javascript-Web-APIs-Code-Quiz

## Description

* HTML and CSS and Javascript documents create a quiz with multiple choice questions with Javascript trivia.  
* This project emphasizes the use of using Javascript to make dynamic changes to an HTML document.
* This project utilizes the use of appending HTML pages.
* Final project supposed to look like the below sample provided:
  <img src="./assets/images/08-web-apis-challenge-demo.gif">

## User Acceptance

AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers

## Project Outline

An interactive, timed JavaScript quiz that stores a high score leaderboard in local storage.

Developed in accordance with the following acceptance criteria: 

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
```

## Design Notes

* Responsive user interface achieved through the use of media queries

* Additional questions can be added without affecting functionality

## Features

* Two HTML pages
    * index.html 
      * Contains landing page to start timer
      * Appends two new pages 
    * highscores.html
      * Retrieves local data from previous page
* One CSS page
    * styles.css
      * Contains centering and styling for html list features
      * Contains media queries
* Three Javascript pages
    * logic.js/questions.js/scores.js  
      * Variables, including arrays with object
      * Event listeners
      * if/else if statements
      * For Loops
      * Functions 
      * Local Storage set and get 

## License

MIT

## Room for improvement: WIP

Add audio through the DOM to the answers feedback

```
	//quiz feedback variable sound
var audioCorrectAnswerElement = document.createElement('audio','#feedback');
audioCorrectAnswerElement.setAttribute('src', './assets/sfx/correct.wav');

var audioIncorrectAnswerElement = document.createElement('audio','#feedback');
audioIncorrectAnswerElement.setAttribute('src', './assets/sfx/incorrect.wav');
```
