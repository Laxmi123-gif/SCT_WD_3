// Quiz Questions
const questions = [
  {
    question: "What is React mainly used for?",
    answers: [
      "Building user interfaces",
      "Managing databases",
      "Creating operating systems",
      "Managing servers",
    ],
    correctAnswer: "Building user interfaces",
  },

  {
    question: "Which hook is used to manage state in a React component?",
    answers: ["useState", "useDatabase", "useServer", "useMongo"],
    correctAnswer: "useState",
  },

  {
    question: "Which hook is commonly used for side effects in React?",
    answers: ["useEffect", "useData", "useMongo", "useServer"],
    correctAnswer: "useEffect",
  },

  {
    question: "What is JSX in React?",
    answers: [
      "A syntax that allows HTML-like code inside JavaScript",
      "A database",
      "A CSS framework",
      "A backend server",
    ],
    correctAnswer: "A syntax that allows HTML-like code inside JavaScript",
  },

  {
    question: "What is MongoDB?",
    answers: [
      "A NoSQL database",
      "A CSS library",
      "A JavaScript framework",
      "An operating system",
    ],
    correctAnswer: "A NoSQL database",
  },

  {
    question: "How does MongoDB store data?",
    answers: ["Documents", "HTML pages", "CSS files", "React components"],
    correctAnswer: "Documents",
  },

  {
    question: "Which format is commonly used by MongoDB documents?",
    answers: ["BSON", "HTML", "CSS", "XML"],
    correctAnswer: "BSON",
  },

  {
    question: "What is a collection in MongoDB?",
    answers: [
      "A group of documents",
      "A React component",
      "A CSS class",
      "A JavaScript function",
    ],
    correctAnswer: "A group of documents",
  },

  {
    question: "Which command is commonly used to install React packages?",
    answers: ["npm install", "mongo install", "react start", "node create"],
    correctAnswer: "npm install",
  },

  {
    question: "Which database is commonly used in a MERN stack application?",
    answers: ["MongoDB", "Oracle", "SQLite", "Redis"],
    correctAnswer: "MongoDB",
  },
];

// Get HTML elements
const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("answer-buttons");

const nextButton = document.getElementById("next-button");

const questionNumber = document.getElementById("question-number");

const scoreElement = document.getElementById("score");

const quizContainer = document.querySelector(".quiz-container");

const resultBox = document.getElementById("result-box");

const finalScore = document.getElementById("final-score");

const restartButton = document.getElementById("restart-button");

// Variables
let currentQuestionIndex = 0;

let score = 0;

// Start Quiz
function startQuiz() {
  currentQuestionIndex = 0;

  score = 0;

  scoreElement.innerText = "Score: 0";

  nextButton.style.display = "none";

  resultBox.style.display = "none";

  quizContainer.style.display = "block";

  showQuestion();
}

// Display Question
function showQuestion() {
  // Remove old answer buttons
  answerButtons.innerHTML = "";

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Display question
  questionElement.innerText = currentQuestion.question;

  // Display question number
  questionNumber.innerText =
    "Question " + (currentQuestionIndex + 1) + " of " + questions.length;

  // Create buttons for answers
  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");

    button.innerText = answer;

    button.classList.add("answer-button");

    // When user clicks answer
    button.addEventListener("click", function () {
      selectAnswer(button, answer);
    });

    answerButtons.appendChild(button);
  });
}

// Select Answer
function selectAnswer(selectedButton, selectedAnswer) {
  const currentQuestion = questions[currentQuestionIndex];

  // Get all answer buttons
  const buttons = answerButtons.children;

  // Disable all buttons
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  // Check answer
  if (selectedAnswer === currentQuestion.correctAnswer) {
    selectedButton.classList.add("correct");

    score++;

    scoreElement.innerText = "Score: " + score;
  } else {
    selectedButton.classList.add("wrong");

    // Show correct answer
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].innerText === currentQuestion.correctAnswer) {
        buttons[i].classList.add("correct");
      }
    }
  }

  // Show Next button
  nextButton.style.display = "block";
}

// Next Question
nextButton.addEventListener("click", function () {
  currentQuestionIndex++;

  // Check if questions are remaining
  if (currentQuestionIndex < questions.length) {
    showQuestion();

    nextButton.style.display = "none";
  } else {
    showResult();
  }
});

// Show Result
function showResult() {
  quizContainer.style.display = "none";

  resultBox.style.display = "block";

  finalScore.innerText = "Your Score: " + score + " / " + questions.length;
}

// Restart Quiz
restartButton.addEventListener("click", function () {
  startQuiz();
});

// Start the quiz when page loads
startQuiz();
