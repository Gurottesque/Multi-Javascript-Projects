/* --------------------------------------------------
● Fecha y Hora de publicación: [19/06/2024]
● Versión de su código: [1.0]
● Autores: [Participantes del Bootcamp (39)]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
/* --------------------------------------------------
● Descripción del programa: Juego de Tres en Raya
-------------------------------------------------- */

const prompt = require("prompt-sync")(); //Se importa el paquete prompt-sync

const spaces = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //Array que contiene los espacios posibles del tablero

let player = "X"; // Se declara player como el caracter que representa el jugador 1 (X)
let player2 = "O"; // Se declara player como el caracter que representa el jugador 2 (O)
let game = true; // Se declara game como true para que el juego pueda comenzar, cuando se veulva false, significaría que el juego termino e impediría que se siga ejecutando el juego

drawBoard();
//Mientras que game esté en true se inicia el ciclo del juego
while (game) {
  playerMove(player);
  console.clear(); //Limpia la consola con el fin de mejorar el aspecto visual del juego y no se vea saturado
  drawBoard();

  if (checkForWin(player)) {
    game = false;
    break;
  } else if (checkForTie()) {
    game = false;
    break;
  }

  playerMove2(player2);
  console.clear();
  drawBoard();

  if (checkForWin(player2)) {
    game = false;
    break;
  } else if (checkForTie()) {
    game = false;
    break;
  }
}

/*drawBoard(spaces); Se llama a la función drawBoard para que se imprima el tablero cada vez que un jugador realice un movimiento,
de esta manera el tablero se actualiza mostrando los campos con x o O*/
function drawBoard() {
  console.log(" ");
  console.log(" " + spaces[0] + " | " + spaces[1] + " | " + spaces[2]);
  console.log("---+---+---");
  console.log(" " + spaces[3] + " | " + spaces[4] + " | " + spaces[5]);
  console.log("---+---+---");
  console.log(" " + spaces[6] + " | " + spaces[7] + " | " + spaces[8]);
  console.log(" ");
}

//playerMove: Esta función se encarga de realizar el movimiento del jugador 1, se pide que el jugador 1 ingrese un número de casilla y se verifica que sea válido
function playerMove(player) {
  let move1;
  do {
    move1 = parseInt(prompt("Jugador 1, entre un número de casilla: "));
    move1--;
    if (Number.isInteger(spaces[move1])) {
      //.isInteger verifica si el número ingresado es un entero
      spaces[move1] = player; //En caso de que si, la posición de ese número se reemplaza por el caracter del jugador
      break;
    } else {
      console.log("Movimiento no válido");
    }
  } while (move1 < 0 || move1 > 8 || isNaN(spaces[move1])); //isNan verifica si lo ingresado por el usaurio no es un número, en caso de que no lo sea, no permitiria el curso del juego
}

//playerMove2: Esta función se encarga de realizar el movimiento del jugador 2, se pide que el jugador 1 ingrese un número de casilla y se verifica que sea válido
function playerMove2(player2) {
  let move2;
  do {
    move2 = parseInt(prompt("Jugador 2, entre un número de casilla: "));
    move2--;
    if (Number.isInteger(spaces[move2])) {
      spaces[move2] = player2;
      break;
    } else {
      console.log("Movimiento no válido");
    }
  } while (move2 < 0 || move2 > player || isNaN(spaces[move2]));
}

//checkForWin: Esta función se encarga de verificar si hay un ganador, es decir, cuando una de las posibilidades de victoria se cumpla, detiene el juego y le avisa al jugador que ganó
function checkForWin(player) {
  const jugador = player === "X" ? 1 : 2;
  const winConditions = [
    //Contiene las posibles combinaciones de victoria según las posiciones del array
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let condition of winConditions) {
    //verifica si las posiciones de la condición corresponden a las posiciones ocupadas por el jugador
    if (
      spaces[condition[0]] === player &&
      spaces[condition[1]] === player &&
      spaces[condition[2]] === player
    ) {
      console.log(`Ganó el jugador ${jugador}`);
      return true;
    }
  }

  return false;
}

//checkForTie: Esta función se encarga de verificar si hay un empate, es decir, si se verifica el array y no se encuentra un número, significa que no hay ganador
function checkForTie() {
  let counter = 0;
  //Se revisa si hay cadenas (X ó Y)  en el array y se aumenta el contador
  for (let position = 0; position < spaces.length; position++) {
    if (typeof spaces[position] === "string") {
      counter++;
    }
  }
  //Se aumento el contador hasta que sea igual a 9, significando que no hay espacios disponibles
  if (counter === 9) {
    console.log("EMPATE");
    return true;
  }
}
