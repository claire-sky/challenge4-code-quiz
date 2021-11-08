var timer = 30;
var timerEl = $("#timeLeft")[0];
var quizContainer = $("#question-area")[0];
var currentQuestion = 0;
var score = 0;
var questionList = [
    {
        question: "What does DOM stand for?",
        answers: {
            1: "Display Order Method",
            2: "Document Order Model",
            3: "Display Object Method",
            4: "Document Object Model"
        },
        correctAnswer: 4
    },
    {
        question: "Which has a condition and will only stop running the code once the condition returns",
        answers: {
            1: "loops",
            2: "conditionals",
            3: "switch",
            4: "break"
        },
        correctAnswer: 1
    },
    {
        question: "Which is not a data type?",
        answers: {
            1: "String",
            2: "Method",
            3: "Boolean",
            4: "null"
        },
        correctAnswer: 2
    },
    {
        question: "Which displays a dialog box with a specified message, along with an OK and a Cancel button?",
        answers: {
            1: "alert",
            2: "prompt",
            3: "confirm",
            4: "deny"
        },
        correctAnswer: 3
    },
    {
        question: "Which is not an operator?",
        answers: {
            1: "&",
            2: "||",
            3: "@",
            4: "="
        },
        correctAnswer: 3
    }
];

// timer
function countdown() {
    var timeInterval = setInterval(function() {
    if (timer > 1) {
        timerEl.textContent = timer;
        timer = timer - 1;
    }
    else {
        timerEl.textContent = 0;
        clearInterval(timeInterval);
        endGame();
    };
  }, 1000);
};

// function to build quiz
function buildQuiz() {
    const output = [];

    // for each question
    questionList.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        // for each answer
        for(num in currentQuestion.answers) {
            answers.push(
                `<button type="button" name="${questionNumber}" value="${num}" class="clickAnswer">
                ${num}: ${currentQuestion.answers[num]}</button>`
            );
        }

        // add question and answer to output
        output.push(
            `<div id="questionSet${questionNumber}" class="show">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join(' <br> ')} </div>
            </div>`
        );
    });

    $("#question-area")[0].innerHTML = output.join('');
};

// quiz start screen with button
$(".start-quiz-btn").on("click", function() {
    $(".start-quiz").addClass("show");
    $("#questionSet" + currentQuestion).removeClass("show");
    countdown();
});

// selecting an answer
$(".quiz").on("click", ".clickAnswer", function() {
    // advance to next question
    $("#questionSet" + currentQuestion).addClass("show");
    currentQuestion = currentQuestion + 1
    $("#questionSet" + currentQuestion).removeClass("show");
    
    // show answer timer
    var answerTimer = function() {
        var answerTime = setInterval(function() {
        $("#results")[0].innerHTML = "";
        clearInterval(answerTime);
        }, 1000 * 2);
    };

    // check answer against correctAnswer
    if (this.value == questionList[this.name].correctAnswer) {
        score += 20;
        console.log(score);
        $("#results")[0].innerHTML = "Correct!"
        answerTimer();
    } else {
        clearInterval(timer);
        timer = timer - 5;
        console.log("fail")
        $("#results")[0].innerHTML = "Nice Try!"
        answerTimer();
    };
});

// advance questions
function showSet(n) {
    set[currentSet].addClass("show");
    set[n].removeClass("show");
    currentSet = n;
};

// function to end game
function endGame() {
    $(".quiz").addClass("show");
    $(".end-quiz").removeClass("show");
    $("#final-score")[0].innerHTML = "You Scored " + score + " out of 100.";
};

// function to submit score
$(".submit-score").on("click", function() {
    $(".end-quiz").addClass("show");
    $(".high-score").removeClass("show");
});

// function to restart game
$(".restart-btn").on("click", function() {
    $(".high-score").addClass("show");
    $(".start-quiz").removeClass("show");
});

buildQuiz();
// showSet(currentSet);