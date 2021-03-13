//numerical variables for fuctions
let score = 0;
let currentQuestion = -1;
let timeLeft = 0;
let timer;
//Questions and answers
let questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["1.JavaScript variable names must begin with a letter or the underscore character", "2.JavaScript variable names are case sensitive", "3.Both above", "4.None of the above"], 
    answer: "Both above"
},
{
    title: "Which built-in method calls a function for each element in the array?",
    choices: ["1.While", "2.Loop", "3.forEach", "4.None"],
    answer: "forEach"
},
{
    title: " JavaScript is a ___ side programming language.?",
    choices: ["1.Client", "2.Server", "3.Both", "4.None of the above."],
    answer: "Both"
},
{
    title: "Which JavaScript label catches all the values, except for the ones specified?",
    choices: ["1.Catch", "2.Label", "3.Try", "4.Default"],
    answer: "Default"
},
{
    title: "How would you find the minimum of x and y using JavaScript?",
    choices: ["1.Min(x,y)", "2.Math.min(x,y)", "3.Math.min(xy)", "4.Min(xy)"],
    answer: "Math.min(x,y)"
}
]
//timer stop at end game
function endGame() {
clearInterval(timer);

let quizContent = `
<h2>Game over!</h2>
<h3>You got a ` + score +  ` /100!</h3>
<h3>That means you got ` + score / 20 +  ` questions correct!</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Set score!</button>`;

document.getElementById("front").innerHTML = quizContent;
}
//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName",  "");
    
    resetGame();
    }
    
    function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;
    
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    let quizContent = `
    <h1>
        Coding Quiz Challenge
    </h1>
    <h3>
        Try to answer the following code-related questions within the time limit, time limit will decrease if wrong answer is selected.   
    </h3>
    <button onclick="start()">Start!</button>`;
    
    document.getElementById("front").innerHTML = quizContent;
    }
//store the scores on local storage
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}


function getScore() {
let quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `Highscore:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Go Back</button>

`;

document.getElementById("front").innerHTML = quizContent;
}
//count start when start button is clicked
function start() {

    timeLeft = 75;
    document.getElementById("timeLeft").innerHTML = timeLeft;
    
    timer = setInterval(function() {
        timeLeft--;
        document.getElementById("timeLeft").innerHTML = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame(); 
        }
    }, 1000);
    
    next();
    }
function correct() {
score += 20;
next();
}


function incorrect() {
    timeLeft -= 10; 
    next();
    }

function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

let quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (let buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    let buttonCode = "<button onclick=\"[answer]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[answer]", "correct()");
    } else {
        buttonCode = buttonCode.replace("[answer]", "incorrect()");
    }
    quizContent += buttonCode
}


document.getElementById("front").innerHTML = quizContent;
}
