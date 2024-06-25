/* --------------------------------------------------
● Fecha y Hora de publicación: [21/06/2024]
● Versión de su código: [0.1]
● Autores: [Los 39]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
-------------------------------------------------- */
/* --------------------------------------------------
● Descripción del programa: el programa le permite a un jugador adivinar una palabra secreta de un número de letras desconocido.
● salveda: si se ingresa una letra repetida o un numero se le restara una vida al usuario, si el usuario ingresa un espacio se le resta vida por igual.
-------------------------------------------------- */
// Importar la biblioteca de prompt-sync
let prompt = require("prompt-sync")(); //se requiere la libreria para el input

function hanged() {
  //se define la funcion principal
  let played = ""; //se define played que contiene las letras jugadas
  let wordTrue = randomWord(); //se define wordTrue que contiene la palabra a adivinar
  let word = "_".repeat(wordTrue.length); //se define el string de los guiones que se ira actualizando
  let success = 0; // se define el numero de aciertos
  let lives = 7; // se define el numero de vidas que tiene el jugador
  let board = modify(lives, word, played); //se define el tablero que se ira actualizando
  while (lives >= 0) {
    //El bucle principal se ejecuta hasta que las vidas lleguen a 0
    if (lives == 0) {
      console.log("¡¡PERDISTE!!\nLa palabra a adivinar era: " + wordTrue);
      //Si las vidas llegan a 0 se imprime el mensaje de perdiste y mostramos el board
      console.log(board);
      break;
    } else {
      if (success < word.length) {
        //si las letras adivinadas son menos que las letras totales
        console.log(board); //se muestra el board para ver el estado
        let char = prompt("Digite una letra: "); //se pide una letra
        if (findLetter(wordTrue, char) && findLetter(word, char) !== true) {
          //si la letra esta en la palabra y no esta en el string de las letras jugadas
          played += char; //se suma el caracter jugado a played
          console.log("\nAdivinaste una letra");
          word = addLetter(word, wordTrue, char); //se le añade la letra al string de guiones
          success += repetitionLetter(word, char); //se le suma al numero de aciertos el numero de veces que este la letra en la palabra
        } else {
          played += char; //se añade la letra a la lista de letras jugadas
          lives--; //se le resta una vida
          console.log("\nPerdiste una vida"); //se muestra que perdio una vida
        }
        board = modify(lives, word, played); //se actualiza el board
      } else {
        console.log("¡¡ GANASTE !! Fin del juego."); //se muestra el anuncio de que perdio
        break; //se para el ciclo
      }
    }
  }
}


function modify(lives, word, played) {
  switch (lives) {
    case 7:
      return `JUEGO AHORCADO\n\n\n+----+\n|         ${word}\n|         Letras jugadas:\n|         ${played}\n|\n---`;
    case 6:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|         Letras jugadas:\n|         ${played}\n|\n---`;
    case 5:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|    |    Letras jugadas:\n|         ${played}\n|\n---`;
    case 4:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|   /|    Letras jugadas:\n|         ${played}\n|\n---`;
    case 3:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|   /|l   Letras jugadas:\n|         ${played}\n|\n---`;
    case 2:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|   /|l   Letras jugadas:\n|    |    ${played}\n|     \n---`;
    case 1:
      return `JUEGO AHORCADO\n\n\n+----+\n|    0    ${word}\n|   /|l   Letras jugadas:\n|    |    ${played}\n|   / \n---`;
    case 0:
      return `MALAS NOTICIAS\n\n\n+----+\n|    x    \n|   /|l   \n|    |\n|   / l \n---`;
  }
}


function findLetter(str1, char) {
  //toma un str y un char
  for (let i = 0; i < str1.length; i++) {
    //itera sobre el stri lenght
    if (str1[i] == char) {
      //si es igual el caracter del stirng y el char retorna true
      return true;
    }
  }
  return false; //si el ciclo no retorna true, no se econtró y por ende retorna false
}


function repetitionLetter(str1, char) {
  //Nos dice cuantás veces está un caracter en el str
  let count = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] == char) {
      count++; //se suma el cont en 1 en caso de cumplir la condición
    }
  }
  return count; //la usamos para sumar a succes la cantidad de aciertos
}


function addLetter(word, wordTrue, char) {
  let newWord = "";
  for (let i = 0; i < wordTrue.length; i++) {
    if (wordTrue[i] === char) {
      newWord += char;  // Agregar el carácter coincidente a la nueva cadena
    } else {
      newWord += word[i];  // Mantener el carácter original en la nueva cadena
    }
  }
  return newWord;
}


//console.log(addLetter("_______", "javascript", "a")); // Ejemplo de uso
// Salida esperada: "_a_a_____"

// Lista de 40 palabras relacionadas con la programación
function randomWord() {
  let num = Math.floor(Math.random() * 40) + 1;
  switch (num) {
    case 1:
      return "javascript";
    case 2:
      return "typescript";
    case 3:
      return "python";
    case 4:
      return "chrome";
    case 5:
      return "nodejs";
    case 6:
      return "server";
    case 7:
      return "arrays";
    case 8:
      return "strings";
    case 9:
      return "classname";
    case 10:
      return "objects";
    case 11:
      return "function";
    case 12:
      return "variable";
    case 13:
      return "constant";
    case 14:
      return "scope";
    case 15:
      return "closure";
    case 16:
      return "callback";
    case 17:
      return "promise";
    case 18:
      return "async";
    case 19:
      return "await";
    case 20:
      return "json";
    case 21:
      return "html";
    case 22:
      return "css";
    case 23:
      return "react";
    case 24:
      return "angular";
    case 25:
      return "vue";
    case 26:
      return "svelte";
    case 27:
      return "webpack";
    case 28:
      return "babel";
    case 29:
      return "eslint";
    case 30:
      return "prettier";
    case 31:
      return "mongodb";
    case 32:
      return "sql";
    case 33:
      return "http";
    case 34:
      return "api";
    case 35:
      return "rest";
    case 36:
      return "graphql";
    case 37:
      return "docker";
    case 38:
      return "kubernetes";
    case 39:
      return "linux";
    case 40:
      return "git";
    default:
      return "javascript"; // Valor por defecto
  }
}
hanged();
