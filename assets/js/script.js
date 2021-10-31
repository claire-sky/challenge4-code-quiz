var timer = 0;
var timerEl = document.getElementById('timeLeft');
var score = 0;
var questions = [
        {
        question: "What does DOM stand for?",
        answers: {
            1: "Display Order Method",
            2: "Document Order Model",
            3: "Display Object Method",
            4: "Document Object Model"
        },
        correctAnswer: '4'
    },
    {
        question: "Which has a condition and will only stop running the code once the condition returns",
        answers: {
            1: "loops",
            2: "conditionals",
            3: "switch",
            4: "break"
        },
        correctAnswer: '1'
    },
    {
        question: "Which is not a data type?",
        answers: {
            1: "String",
            2: "Method",
            3: "Boolean",
            4: "null"
        },
        correctAnswer: '2'
    },
    {
        question: "Which displays a dialog box with a specified message, along with an OK and a Cancel button?",
        answers: {
            1: "alert",
            2: "prompt",
            3: "confirm",
            4: "deny"
        },
        correctAnswer: '3'
    },
    {
        question: "Which is not an operator?",
        answers: {
            1: "&",
            2: "|",
            3: "@",
            4: "="
        },
        correctAnswer: '3'
    },
]

// quiz start screen with button
function startQuiz() {
        "Coding Quiz Challenge",
        "See if you can answer all 5 questions in 30 seconds. For fun, incorrect answers result in a 5 second penalty! ;)",
        "Start Quiz"
    countdown();
};

// function to build quiz
function buildQuiz() {
    var output = [];

    // for each question
    for(var i = 0; i < questions.length; i++) {
        var answers = [];

        // for each answer
        for(number in questions[i].answers) {
            answers.push(
                `<button type="button">${number}: ${questions[i].answers[number]}</button>`
            );
        }

        output.push(
            `<div class="question"> ${questions[i].question} </div>
            <div class="answers">${answers.join('')} + </div>`
        );
    }

    quizContainer.innerHTML = output.join('');
};

// function to show answer
function showAnswer() {

    // right answer adds 20pts to score

    // wrong answer removes 5000 miliseconds from timer

};

// function to end game
function endGame() {

};

// timer
function countdown() {
    var timer = 30;
    var timeInterval = setInterval(function() {
    if (timer > 1) {
      timerEl.textContent = timer;
      timer = timer - 1;
    }
    else {
      timerEl.textContent = 0;
      clearInterval(timeInterval);
    //   endGame();
    };
  }, 1000);
};


countdown();