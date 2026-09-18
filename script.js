

const questions = [

    // Question 1
    {
        category: "React",
        type: "single",

        question: "Which hook is used to manage state in a React functional component?",

        hint: "Think about the hook commonly used with a value and setter function.",

        options: [
            "useEffect",
            "useState",
            "useContext",
            "useRef"
        ],

        answer: "useState"
    },


    // Question 2
    {
        category: "React",
        type: "single",

        question: "What is JSX in React?",

        hint: "It allows you to write HTML-like syntax inside JavaScript.",

        options: [
            "A database",
            "A CSS framework",
            "A JavaScript syntax extension",
            "A backend server"
        ],

        answer: "A JavaScript syntax extension"
    },


    // Question 3
    {
        category: "React",
        type: "multi",

        question: "Which of the following are commonly used React concepts?",

        hint: "Select all the concepts that belong to React.",

        options: [
            "Components",
            "Props",
            "useState",
            "MongoDB"
        ],

        answer: [
            "Components",
            "Props",
            "useState"
        ]
    },


    // Question 4
    {
        category: "MongoDB",
        type: "single",

        question: "What type of database is MongoDB?",

        hint: "MongoDB stores data using documents.",

        options: [
            "Relational database",
            "NoSQL database",
            "Graph database",
            "Spreadsheet database"
        ],

        answer: "NoSQL database"
    },


    // Question 5
    {
        category: "MongoDB",
        type: "single",

        question: "Which format is commonly used to represent MongoDB documents?",

        hint: "Think about a JavaScript object-like structure.",

        options: [
            "JSON",
            "HTML",
            "CSS",
            "XML only"
        ],

        answer: "JSON"
    },


    // Question 6
    {
        category: "Node.js",
        type: "single",

        question: "What is Node.js mainly used for?",

        hint: "Node.js allows JavaScript to run outside the browser.",

        options: [
            "Creating database tables only",
            "Running JavaScript on the server",
            "Designing CSS",
            "Creating HTML tags"
        ],

        answer: "Running JavaScript on the server"
    },


    // Question 7
    {
        category: "Express.js",
        type: "single",

        question: "Which HTTP method is commonly used to create new data through an API?",

        hint: "Think about REST APIs and CRUD operations.",

        options: [
            "GET",
            "POST",
            "DELETE",
            "OPTIONS"
        ],

        answer: "POST"
    },


    // Question 8
    {
        category: "JavaScript",
        type: "fill",

        question: "Which keyword is used to declare a variable that cannot be reassigned?",

        hint: "It is commonly used when declaring React components and constants.",

        answer: "const"
    },


    // Question 9
    {
        category: "MERN Stack",
        type: "multi",

        question: "Which technologies are part of the MERN stack?",

        hint: "MERN stands for four technologies.",

        options: [
            "MongoDB",
            "Express.js",
            "React",
            "Node.js"
        ],

        answer: [
            "MongoDB",
            "Express.js",
            "React",
            "Node.js"
        ]
    },


    // Question 10
    {
        category: "React",
        type: "single",

        question: "Which React feature is commonly used to run side effects such as API calls?",

        hint: "It starts with 'use'.",

        options: [
            "useState",
            "useEffect",
            "useProps",
            "useAPI"
        ],

        answer: "useEffect"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let currentIndex = 0;

let score = 0;

let selectedAnswers = [];

let questionAnswered = false;


// ==========================================
// GET HTML ELEMENTS
// ==========================================

const currentQuestionElement =
    document.getElementById("currentQuestion");

const totalQuestionsElement =
    document.getElementById("totalQuestions");

const progressElement =
    document.getElementById("progress");

const progressText =
    document.getElementById("progressText");

const categoryElement =
    document.getElementById("category");

const questionElement =
    document.getElementById("question");

const questionHint =
    document.getElementById("questionHint");

const answersElement =
    document.getElementById("answers");

const fillContainer =
    document.getElementById("fillContainer");

const fillAnswer =
    document.getElementById("fillAnswer");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextBtn");

const quizContainer =
    document.getElementById("quizContainer");

const resultContainer =
    document.getElementById("resultContainer");

const finalScore =
    document.getElementById("finalScore");

const finalTotal =
    document.getElementById("finalTotal");

const resultMessage =
    document.getElementById("resultMessage");

const restartButton =
    document.getElementById("restartBtn");


// ==========================================
// INITIAL SETUP
// ==========================================

totalQuestionsElement.textContent = questions.length;

finalTotal.textContent = questions.length;


// ==========================================
// LOAD QUESTION
// ==========================================

function loadQuestion() {

    const currentQuestion = questions[currentIndex];

    questionAnswered = false;

    selectedAnswers = [];


    // Question number
    currentQuestionElement.textContent =
        currentIndex + 1;


    // Progress
    const progress =
        ((currentIndex + 1) / questions.length) * 100;

    progressElement.style.width =
        progress + "%";

    progressText.textContent =
        Math.round(progress) + "%";


    // Category
    categoryElement.textContent =
        currentQuestion.category;


    // Question
    questionElement.textContent =
        currentQuestion.question;


    // Hint
    questionHint.textContent =
        currentQuestion.hint;


    // Clear old answers
    answersElement.innerHTML = "";


    // Clear feedback
    feedbackElement.textContent = "";

    feedbackElement.classList.add("hidden");


    // Disable button
    nextButton.disabled = true;

    nextButton.innerHTML =
        'Check Answer <span>→</span>';


    // Fill question
    if (currentQuestion.type === "fill") {

        fillContainer.classList.remove("hidden");

        fillAnswer.value = "";

        fillAnswer.disabled = false;

        fillAnswer.focus();

    }

    // Multiple/single choice
    else {

        fillContainer.classList.add("hidden");

        fillAnswer.value = "";

        createOptions(currentQuestion);
    }
}


// ==========================================
// CREATE OPTIONS
// ==========================================

function createOptions(currentQuestion) {

    currentQuestion.options.forEach(function (option, index) {

        const button =
            document.createElement("button");

        button.classList.add("answer");


        // Option number
        const number =
            document.createElement("span");

        number.classList.add("option-number");

        number.textContent =
            String.fromCharCode(65 + index);


        // Option text
        const text =
            document.createElement("span");

        text.classList.add("option-text");

        text.textContent = option;


        // Arrow
        const arrow =
            document.createElement("span");

        arrow.classList.add("option-arrow");

        arrow.textContent = "›";


        button.appendChild(number);

        button.appendChild(text);

        button.appendChild(arrow);


        // Click
        button.addEventListener("click", function () {

            selectAnswer(
                option,
                button,
                currentQuestion
            );

        });


        answersElement.appendChild(button);

    });
}


// ==========================================
// SELECT ANSWER
// ==========================================

function selectAnswer(
    option,
    button,
    currentQuestion
) {

    if (questionAnswered) {
        return;
    }


    // Single choice
    if (currentQuestion.type === "single") {

        const buttons =
            document.querySelectorAll(".answer");


        buttons.forEach(function (btn) {

            btn.classList.remove("selected");

        });


        button.classList.add("selected");


        selectedAnswers = [option];


        nextButton.disabled = false;

    }


    // Multiple choice
    else if (currentQuestion.type === "multi") {

        button.classList.toggle("selected");


        if (selectedAnswers.includes(option)) {

            selectedAnswers =
                selectedAnswers.filter(function (item) {

                    return item !== option;

                });

        }

        else {

            selectedAnswers.push(option);

        }


        nextButton.disabled =
            selectedAnswers.length === 0;
    }

}


// ==========================================
// FILL ANSWER
// ==========================================

fillAnswer.addEventListener(
    "input",
    function () {

        if (!questionAnswered) {

            nextButton.disabled =
                fillAnswer.value.trim() === "";

        }

    }
);


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer() {

    const currentQuestion =
        questions[currentIndex];

    let isCorrect = false;


    // --------------------------------------
    // SINGLE CHOICE
    // --------------------------------------

    if (currentQuestion.type === "single") {

        isCorrect =
            selectedAnswers[0] === currentQuestion.answer;


        const buttons =
            document.querySelectorAll(".answer");


        buttons.forEach(function (button) {

            button.disabled = true;


            const text =
                button.querySelector(".option-text").textContent;


            // Correct answer
            if (text === currentQuestion.answer) {

                button.classList.add("correct");

            }


            // Wrong selected answer
            if (
                button.classList.contains("selected") &&
                text !== currentQuestion.answer
            ) {

                button.classList.add("wrong");

            }

        });

    }


    // --------------------------------------
    // MULTIPLE CHOICE
    // --------------------------------------

    else if (currentQuestion.type === "multi") {

        const correctAnswers =
            currentQuestion.answer;


        const selectedSorted =
            [...selectedAnswers].sort();


        const correctSorted =
            [...correctAnswers].sort();


        isCorrect =
            JSON.stringify(selectedSorted) ===
            JSON.stringify(correctSorted);


        const buttons =
            document.querySelectorAll(".answer");


        buttons.forEach(function (button) {

            button.disabled = true;


            const text =
                button.querySelector(".option-text").textContent;


            // Correct options
            if (correctAnswers.includes(text)) {

                button.classList.add("correct");

            }


            // Incorrect selected option
            if (
                button.classList.contains("selected") &&
                !correctAnswers.includes(text)
            ) {

                button.classList.add("wrong");

            }

        });

    }


    // --------------------------------------
    // FILL IN THE BLANK
    // --------------------------------------

    else if (currentQuestion.type === "fill") {

        const userAnswer =
            fillAnswer.value.trim().toLowerCase();


        const correctAnswer =
            currentQuestion.answer.toLowerCase();


        isCorrect =
            userAnswer === correctAnswer;


        fillAnswer.disabled = true;

    }


    // --------------------------------------
    // UPDATE SCORE
    // --------------------------------------

    if (isCorrect) {

        score++;

        feedbackElement.textContent =
            "✓ Correct! Great job.";

        feedbackElement.className =
            "feedback correct-feedback";

    }

    else {

        feedbackElement.textContent =
            "✕ Not quite. Correct answer: " +
            getCorrectAnswer(currentQuestion);

        feedbackElement.className =
            "feedback wrong-feedback";

    }


    feedbackElement.classList.remove("hidden");


    questionAnswered = true;


    nextButton.disabled = false;


    // Last question
    if (currentIndex === questions.length - 1) {

        nextButton.innerHTML =
            'View Result <span>→</span>';

    }

    else {

        nextButton.innerHTML =
            'Next Question <span>→</span>';

    }

}


// ==========================================
// GET CORRECT ANSWER
// ==========================================

function getCorrectAnswer(question) {

    if (Array.isArray(question.answer)) {

        return question.answer.join(", ");

    }

    return question.answer;
}


// ==========================================
// NEXT BUTTON
// ==========================================

nextButton.addEventListener(
    "click",
    function () {

        // First click = check answer
        if (!questionAnswered) {

            checkAnswer();

            return;
        }


        // Last question
        if (currentIndex === questions.length - 1) {

            showResult();

            return;
        }


        // Move to next question
        currentIndex++;

        loadQuestion();

    }
);


// ==========================================
// SHOW RESULT
// ==========================================

function showResult() {

    quizContainer.classList.add("hidden");

    resultContainer.classList.remove("hidden");


    finalScore.textContent = score;


    const percentage =
        (score / questions.length) * 100;


    if (percentage === 100) {

        resultMessage.textContent =
            "Perfect score! You have a strong understanding of MERN concepts.";

    }

    else if (percentage >= 80) {

        resultMessage.textContent =
            "Excellent work! Keep practicing advanced MERN concepts.";

    }

    else if (percentage >= 60) {

        resultMessage.textContent =
            "Good job! Continue practicing React, Node.js and MongoDB.";

    }

    else {

        resultMessage.textContent =
            "Keep learning! Practice the MERN fundamentals and try again.";

    }

}


// ==========================================
// RESTART QUIZ
// ==========================================

restartButton.addEventListener(
    "click",
    function () {

        currentIndex = 0;

        score = 0;

        selectedAnswers = [];

        questionAnswered = false;


        quizContainer.classList.remove("hidden");

        resultContainer.classList.add("hidden");


        loadQuestion();

    }
);


// ==========================================
// START QUIZ
// ==========================================

loadQuestion();

