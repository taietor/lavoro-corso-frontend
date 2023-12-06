// Seleziona la barra di progresso e il testo di progresso dal DOM
const progressBar = document.querySelector(".progress-bar"),
  progressText = document.querySelector(".progress-text");

// Funzione per aggiornare la barra di progresso e il testo
const progress = (value) => {
  const percentage = (value / time) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerHTML = `${value}`;
};

// Seleziona gli elementi del DOM per le impostazioni del quiz e la schermata del quiz
const startBtn = document.querySelector(".start"),
  numQuestions = document.querySelector("#num-questions"),
  category = document.querySelector("#category"),
  difficulty = document.querySelector("#difficulty"),
  timePerQuestion = document.querySelector("#time"),
  quiz = document.querySelector(".quiz"),
  startScreen = document.querySelector(".start-screen");

// Variabili globali per memorizzare dati del quiz
let questions = [],
  time = 30,
  score = 0,
  currentQuestion,
  timer;

// Funzione per iniziare il quiz
const startQuiz = () => {
  const num = numQuestions.value,
    cat = category.value,
    diff = difficulty.value;
  loadingAnimation();
  const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      questions = data.results;
      setTimeout(() => {
        startScreen.classList.add("hide");
        quiz.classList.remove("hide");
        currentQuestion = 1;
        showQuestion(questions[0]);
      }, 1000);
    });
};

// Aggiunge un event listener al pulsante di inizio quiz
startBtn.addEventListener("click", startQuiz);

// Funzione per mostrare una domanda nel quiz
const showQuestion = (question) => {
  const questionText = document.querySelector(".question"),
    answersWrapper = document.querySelector(".answer-wrapper");
  questionNumber = document.querySelector(".number");

  // Inserisce il testo della domanda nel DOM
  questionText.innerHTML = question.question;

  // Prepara un array con tutte le risposte (sia corrette che errate)
  const answers = [
    ...question.incorrect_answers,
    question.correct_answer.toString(),
  ];
  answersWrapper.innerHTML = "";
  answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    answersWrapper.innerHTML += `
                  <div class="answer ">
            <span class="text">${answer}</span>
            <span class="checkbox">
              <i class="fas fa-check"></i>
            </span>
          </div>
        `;
  });

  // Aggiorna il numero della domanda nel DOM
  questionNumber.innerHTML = ` Question <span class="current">${
    questions.indexOf(question) + 1
  }</span>
            <span class="total">/${questions.length}</span>`;

  // Aggiunge un event listener a ciascuna risposta
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.addEventListener("click", () => {
      if (!answer.classList.contains("checked")) {
        answersDiv.forEach((answer) => {
          answer.classList.remove("selected");
        });
        answer.classList.add("selected");
        submitBtn.disabled = false;
      }
    });
  });

  // Imposta il tempo per la domanda corrente
  time = timePerQuestion.value;
  startTimer(time);
};

// Funzione per avviare il timer
const startTimer = (time) => {
  timer = setInterval(() => {
    if (time === 3) {
      playAdudio("countdown.mp3");
    }
    if (time >= 0) {
      progress(time);
      time--;
    } else {
      checkAnswer();
    }
  }, 1000);
};

// Funzione per l'animazione di caricamento
const loadingAnimation = () => {
  startBtn.innerHTML = "Loading";
  const loadingInterval = setInterval(() => {
    if (startBtn.innerHTML.length === 10) {
      startBtn.innerHTML = "Loading";
    } else {
      startBtn.innerHTML += ".";
    }
  }, 500);
};

// Funzione per definire una proprietà (commento poco chiaro)
function defineProperty() {
  var osccred = document.createElement("div");
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

// Esegui la funzione di definizione della proprietà
defineProperty();

// Seleziona i pulsanti di submit e next dal DOM
const submitBtn = document.querySelector(".submit"),
  nextBtn = document.querySelector(".next");

// Aggiungi un event listener al pulsante di submit
submitBtn.addEventListener("click", () => {
  checkAnswer();
});

// Aggiungi un event listener al pulsante di next
nextBtn.addEventListener("click", () => {
  nextQuestion();
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
});

// Funzione per controllare la risposta data dall'utente
const checkAnswer = () => {
  clearInterval(timer);
  const selectedAnswer = document.querySelector(".answer.selected");
  if (selectedAnswer) {
    const answer = selectedAnswer.querySelector(".text").innerHTML;
    console.log(currentQuestion);
    if (answer === questions[currentQuestion - 1].correct_answer) {
      score++;
      selectedAnswer.classList.add("correct");
    } else {
      selectedAnswer.classList.add("wrong");
      const correctAnswer = document
        .querySelectorAll(".answer")
        .forEach((answer) => {
          if (
            answer.querySelector(".text").innerHTML ===
            questions[currentQuestion - 1].correct_answer
          ) {
            answer.classList.add("correct");
          }
        });
    }
  } else {
    const correctAnswer = document
      .querySelectorAll(".answer")
      .forEach((answer) => {
        if (
          answer.querySelector(".text").innerHTML ===
          questions[currentQuestion - 1].correct_answer
        ) {
          answer.classList.add("correct");
        }
      });
  }
  const answersDiv = document.querySelectorAll(".answer");
  answersDiv.forEach((answer) => {
    answer.classList.add("checked");
  });

  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
};

// Funzione per passare alla prossima domanda
const nextQuestion = () => {
  if (currentQuestion < questions.length) {
    currentQuestion++;
    showQuestion(questions[currentQuestion - 1]);
  } else {
    showScore();
  }
};

// Seleziona gli elementi del DOM per la schermata finale del quiz
const endScreen = document.querySelector(".end-screen"),
  finalScore = document.querySelector(".final-score"),
  totalScore = document.querySelector(".total-score");

// Funzione per mostrare il punteggio finale
const showScore = () => {
  endScreen.classList.remove("hide");
  quiz.classList.add("hide");
  finalScore.innerHTML = score;
  totalScore.innerHTML = `/ ${questions.length}`;
};

// Seleziona il pulsante di restart dal DOM
const restartBtn = document.querySelector(".restart");

// Aggiungi un event listener al pulsante di restart
restartBtn.addEventListener("click", () => {
  window.location.reload();
});

// Funzione per riprodurre un audio
const playAdudio = (src) => {
  const audio = new Audio(src);
  audio.play();
};
document.addEventListener("DOMContentLoaded", function () {
  const homeBtn = document.querySelector(".btn.home");

  homeBtn.addEventListener("click", function () {
    // Sostituisci "Home.html" con il percorso della tua pagina Home
    window.location.href = "Home.html";
  });
});
