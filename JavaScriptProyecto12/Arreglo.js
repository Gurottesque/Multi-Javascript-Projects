/* --------------------------------------------------
● Fecha y Hora de publicación: [19/06/2024]
● Versión de su código: [0.2]
● Autores: [Los ingenieros del BootCamp (39)]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa: Genera una matriz 8x8 con números aleatorios en el rango de 0.0 a 15.0,
  ordena cada fila de menor a mayor, devuelve la matriz ordenada y muestra el promedio de los
  valores más altos de cada fila y cada columna.
  Utiliza un contador para registrar el número de asignaciones en el proceso.
-------------------------------------------------- */

// Objeto para almacenar datos de resultados
let dataObject = {
  averageRepeats: 0, // Número de promedios repetidos
  averageRow: [],    // Promedios de cada fila
  averageCol: []     // Promedios de cada columna
};

let assignmentCount = 0; // Número total de elementos (64)
let average = 0;         // Promedio general de la matriz

/**
 * Genera un número aleatorio entre 0.0 y el máximo especificado.
 * Math.random() * (max - min) + min ->  ej: si el rango es de 5 - 15
 * @param {number} max - El valor máximo del rango.
 * @returns {number} - Un número aleatorio.
 */
function getRandomFloat(max) {
  return (Math.random() * max).toFixed(1); // toFixed redondear decimales
}

/**
 * Crea una matriz 8x8 con datos aleatorios.
 * @param {number} rows - Número de filas.
 * @param {number} cols - Número de columnas.
 * @param {number} max - Valor máximo para los números aleatorios.
 * @returns {Array} - La matriz generada.
 */
function createRandomMatrix(rows, cols, max) {
  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(parseFloat(getRandomFloat(max))); // añade un numero aleatrorio a la array row
    }
    matrix.push(row); // añade un array a la matriz por paquetes de 8 numeors
  }
  return matrix;
}

/**
 * Ordena una matriz 8x8 aplanándola primero y luego reconstruyéndola.
 * @param {Array} matrix - La matriz original.
 * @returns {Array} - La matriz ordenada.
 */
function sortMatrix(matrix) {
  const flatArray = matrix.flat(); // Aplana la matriz a un solo array -> unidimensional
  flatArray.sort((a, b) => a - b); // Ordena el array de menor a mayor (menor a mayor) => a - b quiere decir ascendente

  const sortedMatrix = [];
  let index = 0;
  for (let i = 0; i < 8; i++) {
    const row = [];
    for (let j = 0; j < 8; j++) {
      row.push(flatArray[index]); // añade el dato en la posicion index del flatArray a row
      average += flatArray[index]; // IMPORTANTE: "NO TIENE QUE VER CON LA CREACION DE LA MATRIZ" -> suma todos los numeros para calcular el promedio
      index++;
      assignmentCount++; 
    }
    sortedMatrix.push(row); // añade un array de tamaño 8 a sortedMatrix
  }
  return sortedMatrix;
}

/**
 * Calcula la suma de los elementos en la parte superior de la matriz.
 * @param {Array} matrix - La matriz a evaluar.
 * @returns {number} - La suma de los elementos en la parte superior.
 */
function calculateUpperSum(matrix) {
  let sumaSuperior = 0;
  let index = 0;
  for (let i = 0; i <= 7; i++) {
    for (let j = index; j <= 7; j++) { // inicia el recorrido desde la posicion 0,0 - 1,1 - ... 7,7 
      sumaSuperior += matrix[i][j]; // hace la suma de las posiciones
    }
    index++;
  }
  return sumaSuperior;
}

/**
 * Calcula la suma de los elementos en la parte inferior de la matriz.
 * @param {Array} matrix - La matriz a evaluar.
 * @returns {number} - La suma de los elementos en la parte inferior.
 */
function calculateLowerSum(matrix) {
  let sumaInferior = 0;
  let index = 0;
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= index; j++) { // tiene que finalizar en la posicion 0,0 - 1,1 - ... 7,7 
      sumaInferior += matrix[i][j]; // hace la suma de las posiciones
    }
    index++;
  }
  return sumaInferior;
}

/**
 * Encuentra la moda y su frecuencia en un array.
 * @param {Array} array - El array a evaluar.
 * @returns {Array} - Un array de objetos con los números de moda y sus frecuencias.
 */
function findMode(array) {
  const frecuencias = {}; // objeto clave valor
  array.forEach(numero => {
    frecuencias[numero] = (frecuencias[numero] || 0) + 1; // hace la suma de los numeros iguales, IMPORTANTE || 0 quiere decir que si no tiene valor devuelve 0 y se suma 1. entonces la segunda que que este el mismo numero ya devolvera el valor de frecuencias[numero] y se suma 1
  });

  const maxFrecuencia = Math.max(...Object.values(frecuencias)); // devuelve el numero que este mas repetido

  return Object.entries(frecuencias) // convierte a un array  por pares [clave, valor] 
    .filter(([numero, freq]) => freq === maxFrecuencia) // filtra todos los numeros que tengan la misma cantidad de numeros repetidos
    .map(([numero, freq]) => ({ numero: Number(numero), frecuencia: freq })); // convierte a un objeto con clave"el numero": valor "cantidad repetidos"
}

/**
 * Imprime una matriz en la consola.
 * @param {Array} matrix - La matriz a imprimir.
 */
function printMatrix(matrix, title) {
  console.log(title);
  matrix.forEach(row => console.log(row.map(val => val.toFixed(1)).join(' '))); // itera la variable row en cada fila de la matriz, map devuelve un array en formato de string concatenados gracias a join por un espacio
}

/**
 * Calcula el factorial de un número.
 * @param {number} n - El número del cual se quiere calcular el factorial.
 * @returns {number} - El factorial del número dado.
 */
function factorial(n) {
  // Validar que el número sea un entero no negativo
  if (n < 0) {
    console.log('El número debe ser un entero no negativo.');
  }

  // Si el número es 0 o 1, el factorial es 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Calcular el factorial iterativamente
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Crear y ordenar la matriz
const randomMatrix = createRandomMatrix(8, 8, 15.0);
printMatrix(randomMatrix, 'Random Matrix:');

const sortedMatrix = sortMatrix(randomMatrix);
printMatrix(sortedMatrix, 'Sorted Matrix:');

// Calcular el promedio general
average = (average / 64).toFixed(1);
console.log('Numero de elementos:', assignmentCount);

// Contar promedios repetidos
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    if (sortedMatrix[i][j] == average) { // si el promedio esta en la matriz incrementa en 1 ej: el promedio es 12 y en la matriz hay un 12
      dataObject.averageRepeats++;
    }
  }
}

// Calcular promedios por fila y columna
dataObject.averageRow = sortedMatrix.map(row => (row.reduce((a, b) => a + b) / 8).toFixed(1)); // itera sobre la matriz, reduce suma todos los datos de las fila (a valor actual y b el que itera)
dataObject.averageCol = sortedMatrix.reduce((acc, row) => { // utilizamos el metodo reduce para sumar todas los datos de las columnas (a valor actual y b el que itera)
  row.forEach((val, i) => { //se utiliza para acumular la suma de cada columna
    acc[i] = (acc[i] || 0) + val;
  });
  return acc;
}, []).map(val => (val / 8).toFixed(1)); //se divide la suma de las columas 

console.log('Promedio de cada fila:', dataObject.averageRow);
console.log('Promedio de cada columna:', dataObject.averageCol);
console.log('Promedio más alto de cada fila:', dataObject.averageRow[7]);
console.log('Promedio más alto de la columna:', dataObject.averageCol[7]);
console.log('Número de promedios repetidos:', dataObject.averageRepeats);

// Encontrar la moda y sus frecuencias
const list = sortedMatrix.flat();
const modas = findMode(list);
modas.forEach(moda => {
  console.log(`El número ${moda.numero} se repite ${moda.frecuencia} veces.`);
});

// Calcular suma de la parte superior e inferior
const sumaSuperior = (calculateUpperSum(sortedMatrix)).toFixed(1);
const sumaInferior = (calculateLowerSum(sortedMatrix).toFixed(1));

// Realizar la operación (sumaSuperior - sumaInferior) / promedio
const resultado = ((sumaSuperior - sumaInferior) / average).toFixed(1);
console.log('Suma Superior:', sumaSuperior);
console.log('Suma Inferior:', sumaInferior);
console.log('Promedio:', average);
console.log('Resultado:', resultado);

// Obtener la parte entera de los números y calcular su factorial
sortedMatrix.forEach(row => {
  row.forEach(value => {
    const intValue = Math.floor(value); // Obtener la parte entera
    console.log(`El factorial de ${intValue} es ${factorial(intValue)}`);
  });
});
