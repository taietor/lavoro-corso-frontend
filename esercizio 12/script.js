var numero1 = 10;
var numero2 = 5;

var somma = numero1 + numero2;
var sottrazione = numero1 - numero2;
var moltiplicazione = numero1 * numero2;
var divisione = numero1 / numero2;

console.log("Somma: " + somma);
console.log("Sottrazione: " + sottrazione);
console.log("Moltiplicazione: " + moltiplicazione);
console.log("Divisione: " + divisione);
// es 2
for (let i = 0; i < 1; i++) {
  var numeroCasuale = Math.floor(Math.random() * 10) + 1;
  console.log("a caso esce: " + numeroCasuale);
}
// es 3
for (let i = 0; i < 1; i++) {
  var numeroCasuale = Math.ceil(Math.random() * 20);
  console.log("a caso esce: " + numeroCasuale);
}
// es 4
var numero3 = 0;

if (numero3 > 0) {
  console.log("positivo come positivo");
} else if (numero3 < 0) {
  console.log("negativo bestia");
} else {
  console.log("zero di zero");
}
// es 5
var numeroSegreto = 42;
do {
  var tentativo = parseInt(prompt("Indovina il numero segreto (da 1 a 100):"));
  if (tentativo === numeroSegreto) {
    console.log("sei troppo forte");
    break;
  } else {
    console.log("haha sfigato");
  }
} while (true);
