import { questions } from "./sorular.js";

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");

function showQuestion() {
  const current = questions[currentQuestion];
  questionElement.textContent = current.question;
  optionsElement.innerHTML = "";

  current.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.dataset.option = option;
    button.addEventListener("click", () => checkAnswer(option));
    optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  const current = questions[currentQuestion];

  const selectedButton = document.querySelector(
    `button[data-option="${selectedOption}"]`
  );
  const trueButton = document.querySelector(
    `button[data-option="${current.correctAnswer}"]`
  );
  //   console.log(selectedButton);
  if (selectedOption === current.correctAnswer) {
    selectedButton.classList.add("true");
    score++;
  } else {
    selectedButton.classList.add("false");
    trueButton.classList.add("true");
  }

  const allButtons = document.querySelectorAll("button");
  allButtons.forEach((button) => {
    // console.log(button);
    button.disabled = true; // Butonların tıklama özelliğini kapat
  });

  const submitButton = document.getElementById("submit");
  submitButton.disabled = false;

  // current questionun değeri questions.lengthin değerinden küçükse çalışacak koşul
  currentQuestion++;

  submitButton.addEventListener("click", () => {
    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
}

function showResult() {
  questionElement.style.display = "none";
  optionsElement.style.display = "none";
  submitButton.style.display = "none";
  resultElement.textContent = `Puanınız: ${score}/${questions.length}`;
  resultElement.style.display = "block";
}

showQuestion();
