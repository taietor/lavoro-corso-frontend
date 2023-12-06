function startGame() {
  // Recupera i dati dalla form di registrazione
  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;

  // Validazione dei dati di registrazione
  if (!name || !surname) {
    alert("Inserisci il nome e il cognome.");
    return;
  }

  // Mostra il nome e cognome nella sezione di gioco
  document.getElementById("userName").innerText = name;
  document.getElementById("userSurname").innerText = surname;

  // Nascondi la sezione di registrazione e mostra la sezione di gioco
  document.getElementById("registration").classList.add("hidden");
  document.getElementById("game").classList.remove("hidden");

  // Mostra il primo enigma
  showEnigma(1);
}

function showEnigma(enigmaNumber) {
  // Logica per mostrare l'enigma corrispondente
  document.getElementById(`enigma${enigmaNumber}`).classList.remove("hidden");
}

function checkAnswer(enigmaNumber) {
  // Validazione della risposta
  const answer = document.getElementById(`answer${enigmaNumber}`).value;
  if (!answer) {
    alert("Inserisci una risposta.");
    return;
  }

  // Logica per controllare la risposta e aggiornare il punteggio
  const correctAnswer = "risposta_corretta"; // Sostituisci con la risposta corretta
  if (answer.toLowerCase() === correctAnswer) {
    updateScore(10); // Aggiungi 10 punti per ogni risposta corretta
  }

  // Nascondi l'enigma corrente
  document.getElementById(`enigma${enigmaNumber}`).classList.add("hidden");
  // Mostriamo l'enigma successivo (se ce ne sono)
  showEnigma(enigmaNumber + 1);
}

function updateScore(points) {
  // Logica per aggiornare il punteggio
  const currentScoreElement = document.getElementById("currentScore");
  const maxScoreElement = document.getElementById("maxScore");

  const currentScore = parseInt(currentScoreElement.innerText);
  const maxScore = parseInt(maxScoreElement.innerText);

  const newScore = currentScore + points;
  currentScoreElement.innerText = newScore;

  if (newScore > maxScore) {
    maxScoreElement.innerText = newScore;
  }
}
