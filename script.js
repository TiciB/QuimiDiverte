import { quimicos } from "./chem.js";

const startButton = document.querySelector(".start-game");
const questionContainer = document.querySelector(".questions-container");
const answersContainer = document.querySelector(".answers-container");
const questionText = document.querySelector(".question-text");
const nextQuestionButton = document.querySelector(".next-question");
const playAgainButton = document.querySelector(".play-again");
const saibaMaisButton = document.querySelector(".biblio");
const secundario = document.querySelector(".app2");
const nameEl = document.getElementById("name");
const imageEl = document.getElementById("image");
const bioEl = document.getElementById("bio");
const nextChem = document.querySelector(".next-chem");
const principal = document.querySelector(".app");
const voltaInicio = document.querySelector(".again-button");

startButton.addEventListener("click", startGame)
nextQuestionButton.addEventListener("click", displayNextQuestion);
playAgainButton.addEventListener("click", () => {
  window.location.reload();
});
saibaMaisButton.addEventListener("click", () => {
  principal.classList.add("hide"); 
  secundario.classList.remove("hide");
  showChemi(currentChemiIndex);
})
nextChem.addEventListener("click", () => {
  currentChemiIndex++;
  
  showChemi(currentChemiIndex);
});
voltaInicio.addEventListener("click", () => {
  window.location.reload();
});

let currentQuestionIndex = 0;
let totalCorrectAnswers = 0;
let currentChemiIndex = 0;


function startGame() {
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    displayNextQuestion();
}

function displayNextQuestion(){
    resetState();

    if(quimicos.length === currentQuestionIndex){
        return finishGame();
    }

    questionText.innerText = quimicos[currentQuestionIndex].perguntas;
    quimicos[currentQuestionIndex].alternativas.forEach(alternativa => {
        const newAnswer = document.createElement("button");
        newAnswer.innerText = alternativa.texto;
        newAnswer.classList.add("btn", "answer");
        newAnswer.textContent = alternativa.texto;
        answersContainer.appendChild(newAnswer);

        if (alternativa.correta) {
            newAnswer.dataset.correct = alternativa.correta;
        }

        newAnswer.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }

    nextQuestionButton.classList.add("hide");
}

function selectAnswer(event){
    const selectButton = event.target;
    const isCorrect = selectButton.dataset.correct === "true";

    if (isCorrect) {
        selectButton.classList.add("correct");
        totalCorrectAnswers++;
    } else {
        selectButton.classList.add("incorrect");
    }
    
    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    currentQuestionIndex++;
    if (currentQuestionIndex === quimicos.length) {
        finishGame();
    } else {
        nextQuestionButton.classList.remove("hide");
    }
}

function finishGame() {
  const totalQuestions = quimicos.length;
  const performance = Math.round((totalCorrectAnswers / totalQuestions) * 100);

  let message = " ";

  switch (true) {
    case performance >= 90:
      message = "Que lindo, cara!";
      break;
    case performance >= 60:
      message = "Vamo tá estudando, hein?";
      break;
    case performance >= 40:
      message = "Eu só digo uma coisa, eu não digo é nada!";
      break;
    default:
      message = "Vá estudar bença, vá!";
  }

  questionContainer.innerHTML = 
  `
    <p style="font-family: 'Exo 2', sans-serif; font-size: 20px; color: #001e4d; text-align: center;">
    Acertos: ${totalCorrectAnswers} de ${totalQuestions} perguntas. <br/>
    <span> ${message}</span>
    </p>

  `
  playAgainButton.classList.remove("hide");
  saibaMaisButton.classList.remove("hide")

}

function showChemi(index) {   
  const chemi = quimicos[index];
  nameEl.textContent = chemi.nome;
  imageEl.src = chemi.foto;
  imageEl.alt = `Retrato de ${chemi.nome}`;
  bioEl.textContent = chemi.biografia;

  if (index === quimicos.length - 2) {
     nextChem.classList.add("hide");
  } 
}

