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
● Descripción del programa: 
Aplicativo para gestionar codigos QR de 30x30 pixeles, el cual debe cumplir con ciertas condiciones.
*/

// Arreglo 30x30 que se va a llenar con los datos
let QRArray = new Array(30);

// Funcion para llenar el array bidimensional, los bordes ([0], [29]) deben estar en 0
// fillArray no debe devolver nada, solo llenar el QRArray para posterior analisis
function fillArray() {
  // Llenamos el array de 30 arrays vacios
  for (let i = 0; i < 30; i++) {
    QRArray[i] = new Array(30).fill(0);
  }

  // Iteramos en el array desde 1..28 para llenarlo de datos aleatorios entre 1 y 0
  for (let i = 1; i < 29; i++) {
    for (let j = 1; j < 29; j++) {
      QRArray[i][j] = Math.floor(Math.random() * 2);
    }
  }
}

// Llamamos la funcion para llenar el array
fillArray();

// Condicion A: Los pixeles de la periferia son siempre blancos (0)
// Evaluar las posiciones de la periferia y devolver 'False' si se
// encuentran pixeles negros (1), de otra forma, devolver True
function checkConditionA() {
  for (let pixel = 0; pixel < 30; pixel++) {
    if (QRArray[0][pixel] == 1) return false; // Evalua la periferia superior
    if (QRArray[pixel][0] == 1) return false; // Evalua la periferia izquierda
    if (QRArray[pixel][29] == 1) return false; // Evalua la periferia derecha
    if (QRArray[29][pixel] == 1) return false; // Evalua la periferia inferior
  }
  return true;
}

// Condicion B:
// El código tiene reservados un cuadrado de 7x7 píxeles encajado en la parte más externa superior
// derecha(sin incluir la periferia, esto es no incluir fila 0 ni la columna 29), que debe estar formado por al menos 25
// píxeles negros, con cualquier disposición.
// la funcion retorna un array con dos elementos [(bool:true si hay mas de 25PixelesNegros),numeroPixelesNegros]
function checkConditionB() {
  let numPixelesNegros = 0;
  // Evaluar el cuadrado de 7x7 píxeles en la esquina superior derecha
  for (let fila = 1; fila <= 7; fila++) {
    for (let columna = 22; columna <= 28; columna++) {
      if (QRArray[fila][columna] === 1) {
        numPixelesNegros++;
      }
    }
  }
  // Devolver un array con el booleano y el número de píxeles negros encontrados
  return [numPixelesNegros >= 25, numPixelesNegros];
}

// Condicion C: Evaluar los pixeles en la septima fila (array en la posicion 6) en exactamente las posiciones  2, 4 y 25 de ese arreglo
// Esta función debe decir True si todos los pixeles evaluados son negros (1), de otra forma de volver False
// y un Entero, contando la cantidad de errores (pixeles blancos) en esas posiciones
// Retorna un array de dos elementos[bool:true si cumple con la condicion,numeroDeErrores]
function checkConditionC() {
  let errores = 0;

  const isBlackPixel = (fila, columna) => {
    return QRArray[fila][columna] == 1;
  };

  if (!isBlackPixel(6, 2)) errores++;
  if (!isBlackPixel(6, 4)) errores++;
  if (!isBlackPixel(6, 25)) errores++;

  return [
    isBlackPixel(6, 2) && isBlackPixel(6, 4) && isBlackPixel(6, 25),
    errores,
  ]; // Devuele [True: Todos los pixeles son negros, cantidad de errores (pixeles blancos)]
}

// Funcion para imprimir el array como dice la primera imagen imagen del contrato
function printArray1(matriz) {
  let filas = 30;
  let columnas = 30;
  arregloColumnas = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4,
    5, 6, 7, 8, 9,
  ]; // Arreglo que tiene los numeros de la cabecera
  arregloFilas = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
  ]; //arreglo que tiene los numeros de las filas (laterales)

  let cadenaEspacios = " ".repeat(8); // cadena de espacios por defecto para la primera linea(lineaColumnas)

  let lineaColumnas = cadenaEspacios + "  "; //se concatena un espacio extra

  //Se reccore los elementos del arregloColumnas
  for (let columna of arregloColumnas) {
    lineaColumnas = lineaColumnas + String(columna); //Se agrega a la cada elemento del arregloColumnas
  }

  console.log(lineaColumnas); // Se imprime la primera linea
  console.log(cadenaEspacios + "+--------------------------------+"); //Se imprime separador

  let linea = ""; //Se declara la cadena linea, que se usará para imprimir las filas de la matriz

  //Inicia el ciclo para recorrer la matriz
  for (let i = 0; i < filas; i++) {
    //Se recorre las filas de la matriz
    if (i < 10) {
      linea = `${i}` + "       " + "| "; //Si el numero de la fila es menor a 10, se agrega el numero de fila 8 espacios y la barra lateral
    } else {
      linea = `${i}` + "      " + "| "; //Si el numero de la fila es mayor o igual a 10, se agrega el numero de fila 7 espacios y la barra lateral
    }
    //Se recorre las columnas de la matriz
    for (let j = 0; j < columnas; j++) {
      linea = linea + (matriz[i][j] === 1 ? "█" : " "); //Si el valor de la matriz en la posicion i,j es 1, se agrega un cuadrado(ASSCI), de lo contrario un espacio
    }
    console.log(linea + " |" + `${i}`); //Se imprime la fila la barra y el numero de la fila
  } //cierre del ciclo
  console.log(cadenaEspacios + "+--------------------------------+"); //se imprime separador
  console.log(lineaColumnas); //por ultimo se imprime la lineaColumnas
}

// Funcion para imprimir el array como dice la segunda imagen del contrato
function printArray2(matriz) {
  let filas = 30;
  let columnas = 30;

  arregloColumnas = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4,
    5, 6, 7, 8, 9,
  ]; // Arreglo que tiene los numeros de la primera linea y de la ultima
  arregloFilas = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
  ]; //arreglo que tiene los numeros de las filas (laterales)

  let cadenaEspacios = " ".repeat(8); // cadena de espacios por defecto para la primera linea(lineaColumnas) y la lineaIntermedia

  let lineaColumnas = cadenaEspacios + "|"; //Primera linea que se muestra, se agrega el espacio por defecto y la barra
  for (let columna of arregloColumnas) {
    //Recorre los elementos del arregloColumnas
    lineaColumnas = lineaColumnas + String(columna) + "|"; //Se agrega a la cada elemento del arregloColumnas y seguido de una barra
  }

  console.log(lineaColumnas); // Se imprime la primera linea

  let lineaIntermedia = cadenaEspacios + "+"; //Se declara la linea intermedia con el espacio por defecto y el signo de suma
  for (let i = 0; i < 30; i++) {
    //Se recorre 30 veces
    lineaIntermedia = lineaIntermedia + "-+"; //Se agrega a la lineaIntermedia un guion y un +
  }

  console.log(lineaIntermedia); //Se imprime la linea intermedia

  let linea = ""; //Se declara la cadena linea, que se usará para imprimir las filas de la matriz

  //Inicia el ciclo para recorrer la matriz
  for (let i = 0; i < filas; i++) {
    //Se recorre las filas de la matriz
    if (i < 10) {
      linea = `${i}` + "       " + "|"; //Si el numero de la fila es menor a 10, se agrega 7 espacios y una barra
    } else {
      linea = `${i}` + "      " + "|"; //Si el numero de la fila es mayor o igual a 10, se agrega 6 espacios y una barra
    }
    for (let j = 0; j < columnas; j++) {
      //Se recorre las columnas de la matriz
      linea = linea + (matriz[i][j] === 1 ? "█" : " ") + "|"; //Si el valor de la matriz en la posicion i,j es 1, se agrega un cuadrado(ASSCI), de lo contrario un espacio
    }
    console.log(linea + `${i}`); //Se imprime la fila y el numero de la fila
    console.log(lineaIntermedia); //Se imprime la linea intermedia
  } //cierre del ciclo
  console.log(lineaColumnas); //por ultimo se imprime la lineaColumnas
}

//Imprimiendo el QR
printArray1(QRArray);
console.log(" ");
console.log(" ");
console.log(" ");
printArray2(QRArray);

//Declaracion de variables

//condA obtiene si la condicionA es verdadera o falsa
let condA = checkConditionA();

//Por desestructuración se extrae condB(booleano true o false si cumple condicion B) y, numeroPixeles extrae el numero de pixeles negros del cuadrado 7x7
let [condB, numeroPixelesNegros] = checkConditionB();

//Por desestructuración se extrae condC(booleano true o false si cumple condicion B) y, errores extrae el numero de errores
let [condC, errores] = checkConditionC();

//Cualquier producto que no cumpla los tres requisitos anteriores se considera falsificado. El número de errores se
// calculará teniendo en cuenta solo el último requisito (c), asignando un punto por cada píxel de los citados que no
// sea negro.
//mostrar en pantalla
console.log("Condición a: ", condA ? "Se cumple" : "NO se cumple");
console.log(
  "Condición b: ",
  condB ? "Se cumple" : "NO se cumple",
  "Número de pixeles negros:",
  numeroPixelesNegros
);
console.log("Condicion c: ", condC ? "Se cumple" : "NO se cumple");

console.log(
  `Errores: ${errores}`,
  condA && condB && condC ? "Si es original" : "No es original"
);
