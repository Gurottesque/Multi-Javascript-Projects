/* --------------------------------------------------
● Fecha y Hora de publicación: [21/06/2024]
● Versión de su código: [3.5]
● Autores: [Todos los ingenieros ]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa: Este programa permite analizar la presencia de tumores ( puntos ,lineas sospechosas )con la representacion del cerebro en 1 millon de caracteres
-------------------------------------------------- */

// Importamos la dependencia prompt-sync para el manejo de la consola
// const prompt = require("prompt-sync")();

const prompt = require("prompt-sync")(); // Importamos la dependencia prompt-sync para el manejo de la consola y pedir datos al usuario

// Funcion que retorna un numero aleatorio entre min y max
const randomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Retorna un numero aleatorio entre min y max
};

// Funcion que crea un arrayd aleatorio de tamaño 10000
const makeRandomArray = () => {
  let randomArray = [];
  for (let i = 0; i < 10000; i++) {
    randomArray.push(randomValue(20, 45)); // Agregamos un numero aleatorio entre un rango determinado
  }

  return randomArray; // Retornamos el array
};

// CEREBRO SIMULADO Function brainArray Funcion que junta 100 arrayds aleatorios
const makeBrainArray = () => {
  let brainArray = [];
  for (let i = 0; i < 100; i++) {
    brainArray.push(makeRandomArray()); // Agregamos un array aleatorio al array
  }
  return brainArray; // devuelve el cerebro
};

// Array 3d  [ [10000] [10000] [10000]...ETC ]
let brainArray = makeBrainArray(); // definicion array

// comNum, funcion que evalua si el valor esta entre 20 y 40
const comNum = (x) => {
  if (x >= 20 && x <= 40) {
    return true;
  } else return false;
};
// analizePoint, funcion que evalua si el punto es sospechoso con respecto a sus "vecinos"
const analyzePoint = (x, y, z) => {
  if ( (x > 0 && x < 99) && (y > 0 && y < 99) ) {
    if (
      // verif
      comNum(brainArray[z][x - 1 + y * 100]) && // Verifica el punto a la izquierda (x-1, y)
      comNum(brainArray[z][x + 1 + y * 100]) && // Verifica el punto a la derecha (x+1, y)
      comNum(brainArray[z][x - 1 + (y - 1) * 100]) && // Verifica el punto a la izquierda y arriba (x-1, y-1)
      comNum(brainArray[z][x + 1 + (y - 1) * 100]) && // Verifica el punto a la derecha y arriba (x+1, y-1)
      comNum(brainArray[z][x + (y - 1) * 100]) && // Verifica el punto directamente arriba (x, y-1)
      comNum(brainArray[z][x - 1 + (y + 1) * 100]) && // Verifica el punto a la izquierda y abajo (x-1, y+1)
      comNum(brainArray[z][x + 1 + (y + 1) * 100]) && // Verifica el punto a la derecha y abajo (x+1, y+1)
      comNum(brainArray[z][x + (y + 1) * 100]) && // Verifica el punto directamente abajo (x, y+1)
      // Verifica si los vecinos en el plano superior (z+1) cumplen con comNum
      comNum(brainArray[z + 1][x - 1 + y * 100]) && // Verifica el punto a la izquierda (x-1, y) en el plano superior
      comNum(brainArray[z + 1][x + 1 + y * 100]) && // Verifica el punto a la derecha (x+1, y) en el plano superior
      comNum(brainArray[z + 1][x - 1 + (y - 1) * 100]) && // Verifica el punto a la izquierda y arriba (x-1, y-1) en el plano superior
      comNum(brainArray[z + 1][x + 1 + (y - 1) * 100]) && // Verifica el punto a la derecha y arriba (x+1, y-1) en el plano superior
      comNum(brainArray[z + 1][x + (y - 1) * 100]) && // Verifica el punto directamente arriba (x, y-1) en el plano superior
      comNum(brainArray[z + 1][x - 1 + (y + 1) * 100]) && // Verifica el punto a la izquierda y abajo (x-1, y+1) en el plano superior
      comNum(brainArray[z + 1][x + 1 + (y + 1) * 100]) && // Verifica el punto a la derecha y abajo (x+1, y+1) en el plano superior
      comNum(brainArray[z + 1][x + (y + 1) * 100]) && // Verifica el punto directamente abajo (x, y+1) en el plano superior
      comNum(brainArray[z + 1][x + y * 100]) && // Verifica el punto directamente en el centro (x, y) en el plano superior
      // Verifica si los vecinos en el plano inferior (z-1) cumplen con comNum
      comNum(brainArray[z - 1][x - 1 + y * 100]) && // Verifica el punto a la izquierda (x-1, y) en el plano inferior
      comNum(brainArray[z - 1][x + 1 + y * 100]) && // Verifica el punto a la derecha (x+1, y) en el plano inferior
      comNum(brainArray[z - 1][x - 1 + (y - 1) * 100]) && // Verifica el punto a la izquierda y arriba (x-1, y-1) en el plano inferior
      comNum(brainArray[z - 1][x + 1 + (y - 1) * 100]) && // Verifica el punto a la derecha y arriba (x+1, y-1) en el plano inferior
      comNum(brainArray[z - 1][x + (y - 1) * 100]) && // Verifica el punto directamente arriba (x, y-1) en el plano inferior
      comNum(brainArray[z - 1][x - 1 + (y + 1) * 100]) && // Verifica el punto a la izquierda y abajo (x-1, y+1) en el plano inferior
      comNum(brainArray[z - 1][x + 1 + (y + 1) * 100]) && // Verifica el punto a la derecha y abajo (x+1, y+1) en el plano inferior
      comNum(brainArray[z - 1][x + (y + 1) * 100]) && // Verifica el punto directamente abajo (x, y+1) en el plano inferior
      comNum(brainArray[z - 1][x + y * 100]) // Verifica el punto directamente en el centro (x, y) en el plano inferior
      // Plano Inferior
    ) {
      return true;
    } else return false;
  } else return false;
};

// Funcion para contar la cantidad de puntos que se encuentran en una pagina
const pointCounter = (z) => {
  let point = 0; // Variable para contar los puntos
  for (let y = 1; y < 100; y++) {
    // Recorremos el array de la pagina en y
    for (let x = 1; x < 100; x++) {
      // Recorremos el array de la pagina en x
      if (analyzePoint(x, y, z) === true) {
        // Condicion para verificar si el punto esta en la pagina
        point++; // Si el punto esta en la pagina se suma 1 a la variable point
      }
    }
  }
  return point; // Retorna la cantidad de puntos que hay en la pagina
};

// Funcion para contar las lineas
function linesCount(z) {
  let lines = 0; // Variable para contar las lineas
  let counter = 0; // Variable para contar los puntos
  for (let y = 1; y < 100; y++) {
    // Recorremos la pagina en y
    for (let x = 1; x < 100; x++) {
      // Recorremos la pagina en x
      if (analyzePoint(x, y, z) === true && counter !== 2) {
        // Verificamos si el punto es sospechoso y no ha pasado de 2 puntos
        counter++; // Si el punto es sospechoso se suma 1 a la variable counter
      } else if (analyzePoint(x, y, z) === true && counter === 2) {
        // Si el punto es sospechoso y ya había 2 puntos entonces significa que es una linea
        counter++; // Se suma 1 a la variable counter que es la que nos indica cuantos puntos seguidos que se han encontrado
        lines++; // Se suma 1 a la variable lines que es la que nos indica cuantas lineas hay en la pagina
      } else {
        // Si el punto no es sospechoso
        counter = 0; // Se reinicia el valor
      }
    }
  }
  return lines; // Retorna la cantidad de lineas que hay en la pagina
}

function graficBots(x, y, z, showCenter = true) {
  // Inicializa una matriz 3x3 con ceros
  const matriz = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  // Asigna los valores de brainArray a la matriz
  matriz[0][0] = brainArray[z][x - 1 + y * 100]; // Vecino a la izquierda
  matriz[0][1] = brainArray[z][x + 1 + y * 100]; // Vecino a la derecha
  matriz[0][2] = brainArray[z][x - 1 + (y - 1) * 100]; // Vecino arriba-izquierda
  matriz[1][0] = brainArray[z][x + 1 + (y - 1) * 100]; // Vecino arriba-derecha
  if (showCenter) {
    matriz[1][1] = brainArray[z][x + y * 100]; // Punto central
  } else {
    matriz[1][1] = "  "; // Si showCenter es false, deja el punto central vacío
  }
  matriz[1][2] = brainArray[z][x + (y - 1) * 100]; // Vecino arriba
  matriz[2][0] = brainArray[z][x - 1 + (y + 1) * 100]; // Vecino abajo-izquierda
  matriz[2][1] = brainArray[z][x + 1 + (y + 1) * 100]; // Vecino abajo-derecha
  matriz[2][2] = brainArray[z][x + (y + 1) * 100]; // Vecino abajo

  // Imprime la matriz en formato de tabla
  for (let i = 0; i < 3; i++) {
    if (i == 0) {
      console.log("---------------"); // Línea superior de la tabla
    }
    console.log("|", matriz[i].join(" | "), "|"); // Imprime la fila de la matriz con separadores
    console.log("---------------"); // Línea entre filas de la tabla
  }
}

/**
 * manageGraphicBots: Función que grafica los valores alrededor de un punto (x, y, z) en el plano actual,
 *                    en el plano superior y en el plano inferior.
 */
function manageGraphicBots(x, y, z) {
  console.log("Plano Centro");
  graficBots(x, y, z, false); // Grafica el plano actual sin mostrar el valor central
  console.log("Plano Superior");
  graficBots(x, y, z + 1); // Grafica el plano superior
  console.log("Plano Inferior");
  graficBots(x, y, z - 1); // Grafica el plano inferior
}

//funcion imprime un punto en consola segun parte de una linea sospechosa o no
function printPoint(x, y, z) {
  if (
    //condicional que verifica si el punto actual y  los 2 puntos anteriores son sospechosos
    analyzePoint(x, y, z) && //verificacion del punto actual
    analyzePoint(x - 1, y, z) && //verificacion del punto directamente anterior
    analyzePoint(x - 2, y, z) //verificacion del punto anterior del anterior
  ) {
    process.stdout.write(String.fromCharCode(0x2b22)); //imprime un octagono en consola,sin hacer salto de linea
  } else if (
    //condicional que compara si el punto actual, el punto siguiente y el punto anterior son sospechosos
    analyzePoint(x, y, z) && //verificacion del punto actual
    analyzePoint(x - 1, y, z) && //verificacion del punto directamente anterior
    analyzePoint(x + 1, y, z) //verificacion del punto siguiente
  ) {
    process.stdout.write(String.fromCharCode(0x2b22)); //imprime un octagono en consola,sin hacer salto de linea
  } else if (
    //condicional que compara si el punto actual y los dos puntos siguientes son sospechosos
    analyzePoint(x, y, z) && //verificacion del punto actual
    analyzePoint(x + 2, y, z) && //verificacion del punto siguiente del siguiente
    analyzePoint(x + 1, y, z) //verificacion del punto siguiente
  ) {
    process.stdout.write(String.fromCharCode(0x2b22)); //imprime un octagono en consola,sin hacer salto de linea
  } else {
    process.stdout.write(String.fromCharCode(0x2014)); //imprime una guion en consola,sin hacer salto de linea
  }
}
//funcion que imprime en consola la pagina entera
function printPage(z) {
  //la primera parte de la funciona me grafica el conteo del eje X
  //el metodo process.stdout.write() permite imprimir en consola sin realizar el salto de linea, console.log() hace el salto de linea
  process.stdout.write(String.fromCharCode(0x2014).repeat(3));//imprime 3 guiones en consola, para espaciar correctamente
  for (x = 1; x < 100; x++) {//ciclo for para imprimir al eje x
    if (x % 10 === 0) {//comprueba si el numero es divisible por 10
      process.stdout.write(String.fromCharCode(0x2014).repeat(9) + x / 10);//si es divisible imprime 9 guiones y lo divide por diez (imprime la decena del numero)
    }
  }
  process.stdout.write(String.fromCharCode(0x2014).repeat(9));//imprime 9 guiones para espaciar correctamente las unidades
  console.log("");//se llama la funcion console.log sin nada, para realiza un salto de linea
  process.stdout.write("  ");//se imprimen 3 espacios en linea, para espaciar correctamente las unidades
  for (x = 0; x < 100; x++) {//bucle for que va de 0 a 100
    if (x > 9) {//si el numero es mayor a 9, se imprime el resto de la division por 10 del numero, osea, la unidad
      process.stdout.write(`${x % 10}`);
    } else {//si es menor a 10, se imprime el numero como tal
      process.stdout.write(`${x}`);
    }
  }

  // en la segunda parte de la funcion se imprimen los elementos de la pagina segun sea parte de una linea sospechoso o no 
  for (x = 1; x <= 100; x++) {//se realiza un ciclo for que va de 1 a 100
    for (y = 0; y <= 99; y++) {//se realiza un ciclo for que va de 0 a 99, este se realiza cada iteracion del ciclo anterior
      if (y < 10) {//si Y es menor a 10, se imprime el valor, un espacio en consola para espaciar correctamente y un salto de linea
        process.stdout.write("\n" + y + " ");//se imprime el numero de la linea y un salto de linea
      } else {//si no, se imprime el salto de linea y el valor y
        process.stdout.write("\n" + y);
      }
      for (x = 0; x <= 99; x++) {//se realiza un ciclo for que va de 0 a 99, este se realiza cada iteracion del ciclo 
        printPoint(x, y, z);//funcion que imprime el elemento segun sea parte de una linea sospechoso o no
      }
    }
  }
}

// Funcion para imprimir la informacion de las paginas 
function dropInformationPages(z) {
  console.log(`PAGINA ${z}:`); // Imprime el numero de la pagina
  process.stdout.write(`Cantidad de puntos: ${pointCounter(z)}`); // Imprime la cantidad de puntos que hay en la pagina
  process.stdout.write("        "); // Espacio para separar la cantidad de puntos de la cantidad de lineas
  process.stdout.write(`Cantidad de lineas: ${linesCount(z)} \n`); // Imprime la cantidad de lineas que hay en la pagina
}

// Funcion para validar datos 
function readData() {
  let data = parseInt(prompt("")); // Pide al usuario que ingrese el numero de la pagina que desea analizar
  if (data > 98 || data < 1 || isNaN(data)) {
    // Verifica si el numero de la pagina es valido
    console.log("Ingrese un numero valido: ");
    return readData(); // Si el numero de la pagina no es valido, vuelve a pedir el numero de la pagina
  } else {
    return data; // Retorna el numero de la pagina que el usuario ingreso
  }
}

// Funcion para preguntar los datos y estructura del codigo
function ask() {
  // Funcion para imprimir la informacion de las paginas
  for (let k = 1; k <= 98; k++) {
    dropInformationPages(k); // Imprime la informacion de la pagina
  }

  findMaxLine(); // Encuentra la pagina con la mayor cantidad de lineas
  
  console.log("Ingrese el numero de la pagina que desea ver(1-98): ");
  let page = readData(); //verifiva que sea un numero valido entre  1-98
  printPage(page); //imprime la pagina que se eligio
  //pide las coordenadas para analisar los puntos sospechosos en ese punto
  console.log("\n\ningrese la posicion X en el punto: ");
  let x = readData();
  console.log("ingrese la posicion Y en el punto: ");
  let y = readData();
  console.log("ingrese la posicion Z en el punto: ");
  let z = readData();

  manageGraphicBots(x, y, z); // imprime la informacion en consola del punto
  if (analyzePoint(x, y, z)) { // confirma si un punto es sospechoso o no 
    console.log("El punto es sospechoso");
  } else console.log("El punto no es sospechoso");
}


// Función para encontrar la página con el mayor número de líneas sospechosas
function findMaxLine() {
  let p = 0; // Inicializamos p con 0 para representar la página con más líneas sospechosas
  let maxLines = 0; // Variable para almacenar el número máximo de líneas encontradas

  for (let i = 1; i < 99; i++) { // Iteramos a través de las páginas
    let currentLines = linesCount(i); // Obtenemos el número de líneas sospechosas en la página actual
    if (currentLines > maxLines) { // Comparamos con el máximo actual
      maxLines = currentLines; // Actualizamos el máximo de líneas
      p = i; // Actualizamos la página con el mayor número de líneas sospechosas
    }
  }

  if (p === 0) {//si no se encuentra ninguna pagina con lineas sospechosas
    console.log("\nNo se encontraron líneas sospechosas o hubo mas de 1 pagina con un mismo maximo\n");
  } else {
    console.log(`\nLa página con el mayor número de líneas sospechosas es: ${p} con ${maxLines} líneas\n`);
  }
}

ask();