$(document).ready(function () {
  // Aggiunta di una classe "visible" alle sezioni con un ritardo di 2 secondi l'una dall'altra
  setTimeout(function () {
    $("#section1").addClass("visible");
  }, 1000);

  setTimeout(function () {
    $("#section2").addClass("visible");
  }, 2000);

  setTimeout(function () {
    $("#section3").addClass("visible");
  }, 3000);

  setTimeout(function () {
    $("#section4").addClass("visible");
  }, 4000);
});
