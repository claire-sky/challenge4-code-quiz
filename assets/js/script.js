var timer = 0;
var timerEl = $(".timeLeft")[0];
var timeInterval = 0
var currentQuestion = 0;
var score = 0;
var highScore = [];
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
    var timer = 30;
    timeInterval = setInterval(function() {
    if (timer > 1) {
        timerEl.textContent = timer;
        timer = timer - 1;
    } else {
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
            `<div id="questionSet${questionNumber}" class="hide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join(' <br> ')} </div>
            </div>`
        );
    });

    $("#question-area")[0].innerHTML = output.join('');
};

// quiz start screen with button
$(".start-quiz-btn").on("click", function() {
    currentQuestion = 0;
    $(".start-quiz").addClass("hide");
    $("#questionSet" + currentQuestion).removeClass("hide");
    countdown();
});

// selecting an answer
$(".quiz").on("click", ".clickAnswer", function() {
    // advance to next question
    $("#questionSet" + currentQuestion).addClass("hide");
    currentQuestion = currentQuestion + 1;
    $("#questionSet" + currentQuestion).removeClass("hide");
    
    // show answer timer
    var answerTimer = function() {
        var answerTime = setInterval(function() {
        $(".results")[0].innerHTML = "";
        }, 1000 * 2);
    };

    // check answer against correctAnswer
    if (this.value == questionList[this.name].correctAnswer) {
        score += 20;
        $(".results")[0].innerHTML = "Correct!";
        answerTimer();
    } else {
        clearInterval(timer);
        timer = timer - 5;
        $(".results")[0].innerHTML = "Nice Try!";
        answerTimer();
    };

    // end game if last question is answered
    if (currentQuestion === 5) {
            endGame();
            clearTimeout(timeInterval);
            timerEl.textContent = 0;
        };
});

// function to end game
function endGame() {
    $(".quiz").addClass("hide");
    $(".end-quiz").removeClass("hide");
    $("#final-score")[0].innerHTML = "You Scored " + score + " out of 100.";
};

// function to submit score
$(".submit-score").on("click", function() {
    loadScores();

    // get initials
    var initials = document.querySelector("input").value;
    if (!initials) {
        alert("Please enter initials");
        return false;
    } else {
        highScore.push({"userInitials": initials, "userScore": score});
    }

    // submit high score to local storage
    localStorage.setItem("highScore", JSON.stringify(highScore));

    showHighScoresPage();
    displayScores();
});

// function to load scores from local storage
var loadScores = function() {
    highScore = JSON.parse(localStorage.getItem("highScore"));
    if (!highScore) {
        highScore = [];
    };
};

// show high score page
var showHighScoresPage = function() {
    $(".end-quiz").addClass("hide");
    $(".start-quiz").addClass("hide");
    $(".high-score").removeClass("hide");
};

// function to add high scores to high score page
var displayScores = function() {
    loadScores();

    // loop through scores and add to order list
    for (var i = 0; i < highScore.length; i++) {
        var li = document.createElement("li");
        li.textContent = `${highScore[i].userInitials}: ${highScore[i].userScore}`;

        // add list to page
        $("#highScoreList")[0].appendChild(li);
    };
};

// function to restart game
$(".restart-btn").on("click", function() {
    location.reload();
});

// function to clear scores
$(".clear-btn").on("click", function() {
    localStorage.setItem("highScore", JSON.stringify(""));
    location.reload();
});

// function to view high score from start screen
$(".view-high-score").on("click", function() {
    showHighScoresPage();
});

buildQuiz();