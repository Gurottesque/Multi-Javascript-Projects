/* --------------------------------------------------
● Fecha y Hora de publicación: [19/06/2024]
● Versión de su código: [0.1]
● Autores: []
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa: El programa es un juego de memorama
con una fila de 8 targetas las cuales estan identificadas con un numero, 
la cadena se desordena aleatoreamente y el juego termia cuando el jugador
encuentre las 4 parejas de targetas, O en su defecto el jugador pida salir del 
aplicativo
-------------------------------------------------- */

// Importa la libreria prompt-sync
const prompt = require('prompt-sync')();

//------------------------------------------------------------------
//Funciones para revolver los caracteres del stringStart

// Función para validar cuando un caracter está repetido
/* Funcion repeatedCharacterString recive el string al que se le están poniendo los caracteres desordenados
   y el caracter que se quiere ingresar al string.

   Hace un ciclo que recorre todas las posiciones del string y compara si el caracter que evaluamos es igual al de la posición que iteramos
   Cada que encuentre un caracter del que buscamos count sube en 1*/
function repeatedCharacterString(string, character) {
  let count = 0; // almacenará el número de repeticiones
  for (let i = 0; i < string.length; i++) {
    if (character === string[i]) {
      count++;
    }
  }
  //Devuelve el booleano false si el contador no es 2, que significa que el caracter que evaluamos se encuentra en la cadena menos de dos veces
  return count === 2;
};

// Función para desordenar la cadena aleatoriamente
function unorderString(string) {
  let stringAux = ""; // El string almacenará la cadena desordenada
  while (stringAux.length < string.length) {
    //Generamos un número random entere 0 y 7 para poner los caracteres en el string
    let charAux = string[Math.floor(Math.random() * 8 )];
    //Preguntamos si el caracter NO está dos veces en el string, de ser así se le adiciona al stringAux
    if (!repeatedCharacterString(stringAux, charAux)) {
      stringAux += charAux; //Se va concatenando desordenado
    }
  }
  //Devolvemos el string desordenado
  return stringAux;
};

const string = unorderString("&&++@@**");

//------------------------------------------------------------------
//Inicialización de las variables globales

let table = "12345678";//Tabla inicial con las 8 "casillas"
let score = 0;//Puntaje inicial de parejas encontradas en 0
let game = true;
//La variable game nos dice el estado en el que está el juego, mientras esté en true seguirá repitiendose el ciclo del juego

//------------------------------------------------------------------
//Funciones para el funcionamiento del juego

// Función para cambiar la tabla dependiendo de la selección del jugador
function changeCharacter(string, table, option) {
  let newTable = "";
  /* Preguntamos si en la posicicion seleccionada hay un numero entero 
  Si es asi hacemos el ciclo for para el cambio*/
  if (Number.isInteger(parseInt(table[option]))) {
    for (let i = 0; i < string.length; i++) {
      /* Si i llega a la posición de la seleccion se concatena el dato del string en dicha posición sino se siguen concatenando
        los caracteres del string ya como venian, esto para hacer el cambio solo en la posición seleccionada */
      if (option === i) {
        newTable += string[option];
      } else {
        newTable += table[i];
      }
    }
    //Si no es un entero lo que hay en la posicion se pregunta si es un dato invalido, menor a 0 o mayor a 7 o un dato que no sea numero
  } else if (option < 0 || option >= 8 || isNaN(option)) {
    //Imprimimos que es un dato invalido y retornamos la tabla
    console.log("El dato ingresado no es válido.");
    return table;
  } else {
    //Si no se cumplen las demás condiciones es porque es una casilla ya jugada 
    //Imprimimos que es una casilla ya jugada y retornamos la tabla
    console.log(`${option + 1} Casilla ya jugada`);
    return table;
  }
  //Al finalizar el for se devuelve la tabla
  return newTable;
};

//funcion para encontar parejar y que retorna la tabla a mostrar sin los acaracteres que no son parejas
function revertTable(table,input1,input2){
  let tableAux = "";// El string almacenará la cadena nueva con la tabla revertida
  for (let i = 0; i < table.length; i++){
    //El ciclo for va a recorrer la tabla actual y cuando llegue al input 1 o 2 va a cambiarlo por el número correspondiente a la casilla
    if(i == input1 || i == input2){
      tableAux += `${i+1}`;
    }else{
      tableAux += table[i];
    }
  }
  //Devuelve finalmente el string cambiado a su estado anterior de los 2 input
    return tableAux;
};

// Función para imprimir la tabla dependiendo si acertó en la pareja o no
function evaluationGame(table, input1, input2) {
  if (table[input1] == table[input2]) {
    //Evalua si las opciones seleccionadas son iguales
    //Si son iguales se dice que acertó y el score acciende en 1
    console.log("Acertó");
    score += 1;
    return table;//Devolvemos la tabla normal
  } else {
    console.log("Falló");
    return revertTable(table,input1,input2); //Devolvemos la tabla revertida 
  }
};


//Funcion para imprimir la tablas
function printTable(table) {
  //Se imprime la parte de arriba del memorama, con el score actual
  console.log(`\nJUEGO CONCÉNTRESE (MEMORAMA) Número de parejas: ${score}
---------------------------------`);
  tableAux = "";// El string almacenará la cadena con el cambio hecho
  for(let i = 0; i < table.length; i++){
    //El for recorre uno a uno los caracteres del string para reescribirlos de la forma | 1 |
    tableAux += `| ${table[i]} `;
  }
  //Se imprime el último "|" y la linea horizonal de abajo
  console.log(tableAux + "|");
  console.log("---------------------------------\n ");
};


//------------------------------------------------------------------
// Ciclo prinipal del juego
  do {
// --------------------------------------------------------------------------------
    printTable(table);//Imprimimos la tabla 
    //pedimos el primer dato y le restamos 1 para que corresponda con las posiciones del string
    let input1 = parseInt(prompt("Entre primera opción: ")) - 1;
    let tableAux = table;
    //Hacemos el cambio de tabla
    table = changeCharacter(string, table, input1);
    //Preguntamos si el dato ingresado es valido, sino usamos el ciclo para pedir repetidamente el dato hasta que sea válido
    while(table === tableAux || input1 < 0 || input1 >= 8 || isNaN(input1)){
      input1 = parseInt(prompt("Entre la primera opción de nuevo: ")) - 1;
      table = changeCharacter(string, table, input1);
    }
    printTable(table);//Imprimimos la tabla con el cambio

    //pedimos el segundo dato y le restamos 1 para que corresponda con las posiciones del string
    let input2 = parseInt(prompt("Entre segunda opción: ")) - 1;
    let tableAux2 = table;
    table = changeCharacter(string, table, input2);
    //Preguntamos si el dato ingresado es valido, sino usamos el ciclo para pedir repetidamente el dato hasta que sea válido
    while(tableAux2 === table || input1 === input2 || input2 < 0 || input2 >= 8 || isNaN(input2)){
      input2 = parseInt(prompt("Entre la segunda opción de nuevo: ")) - 1;
      table = changeCharacter(string, table, input2);
    };
    printTable(table);//Imprimimos la tabla con el cambio

// --------------------------------------------------------------------------------
  //Logica del juego
    table = evaluationGame(table, input1, input2);
    if(score == 4){
      //Cuando el contador de parejas llegue a 4 se dice que es final del jjuego y se cambia el estado del game a false
      console.log("Final del juego");
      game = false;
    }else{
        let decision;//Inicializamos decision
        do{
          //Se pregunta por cada iteración si se desea continuar
          decision = prompt("¿Desea continuar (s/n)?: ");
          //Se pregunt si la desicion es n, de ser asi, se pone el game en false para terminar la partida 
          if (decision.toLowerCase() === "n") {
            game = false;
            //Se pregunta si la desicion es s, de ser asi, el juego continúa haciendo una iteraión más del do-while principal
          }else if(decision.toLowerCase() !== "s"){
            console.log("La opcion no es valida ");
            decision = false;
          }
        }while(decision === false);
    }
    //Se pregunta repetidamente si el estado de game está en false, de ser asi se sale del juego y da fin 
  } while (game);