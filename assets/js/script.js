var timer = 30;
var timerEl = $("#timeLeft")[0];
var quizContainer = $("#question-area")[0];
// var set = $(".set")[0];
// var currentSet = 0;
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
            2: "|",
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
    //   endGame();
    };
  }, 1000);
};

// quiz start screen with button
function startQuiz() {
        "Coding Quiz Challenge",
        "See if you can answer all 5 questions in 30 seconds. For fun, incorrect answers result in a 5 second penalty! ;)",
        "Start Quiz"
    countdown();
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

        output.push(
            `<div class="set">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join(' <br> ')} </div>
            </div>`
        );
        });

    quizContainer.innerHTML = output.join('');
};

$(".quiz").on("click", ".clickAnswer", function() {
    // check answer against correctAnswer
    if (this.value == questionList[this.name].correctAnswer) {
        score += 20;
        console.log(score);
    } else {
        clearInterval(timer);
        timer = timer - 5;
        console.log("fail")
    };
    // advance to next question
});

// function to show and hide questions
// function showSet() {
//     var state = element.getAttribute("data-state");
//     if (set = 0) {
//         data-state = "visible";
//     }


    // set[currentSet].removeClass("active-set");
    // set[n].addClass("active-set");
    // currentSet = n;
// };

// function to advance to next question
function showNext() {
    // showQuestion(currentQuestion + 1);
};

// function to end game
function endGame() {

};

countdown();
buildQuiz();
// showSet(currentSet);

