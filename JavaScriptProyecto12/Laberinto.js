// Crear una matriz 30x30 en JavaScript
const rows = 30;

const columns = 30;
const matriz = [];

const muro = String.fromCharCode(219); // Valor ASCII 219 convertido a carácter para representar un muro
const sp = String.fromCharCode(32); // Valor ASCII 32 convertido a carácter para representar un espacio
const pathC = String.fromCharCode(169); // Valor ASCII 169 convertido a carácter para representar el camino

let randomRow;
function createTable() {
    // Inicializar la matriz con valores (todos los valores iniciales son ' ')
    for (let i = 0; i < rows; i++) {
        const fila = [];
        for (let j = 0; j < columns; j++) {
            fila.push(sp); // Inicializando con un espacio en blanco
        }
        matriz.push(fila);
    }

    // Generar muros aleatorios en el laberinto, excluyendo la entrada y salida
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            // Probabilidad de que haya un muro en una celda aleatoria
            
            //Condicional que evita que se genere un muro en la entrada y sus alrededores
            if (
                (i == 0 && j == 0) ||
                (i == 0 && j == 1) ||
                (i == 1 && j == 0) ||
                (i == 1 && j == 1)
            ) {
                continue;
            }

            if (Math.random() < 0.15) {
                matriz[i][j] = muro;
            }
        }
    }

    // Asignar el valor ASCII 219 a las posiciones especificadas
    // (0,2) hasta (0,29)
    for (let j = 2; j <= 29; j++) {
        matriz[0][j] = muro;
    }

    // (0,29) hasta (29,29)
    for (let i = 0; i <= 29; i++) {
        matriz[i][29] = muro;
    }

    // (29,29) hasta (29,0)
    for (let j = 29; j >= 0; j--) {
        matriz[29][j] = muro;
    }

    // (29,0) hasta (2,0)
    for (let i = 29; i >= 2; i--) {
        matriz[i][0] = muro;
    }

    randomRow = Math.floor(Math.random() * (rows - 2)) + 1; // Evitar 0 y 29
    matriz[randomRow][29] = sp;

    // Asegurar que haya un espacio para la entrada
    matriz[0][0] = sp; // Puedes ajustar esta posición según tu necesidad

    // Imprimir la matriz en la consola
    for (let i = 0; i < rows; i++) {
        console.log(matriz[i].join("")); // Usar join('') para unir elementos sin comas
    }
}

//Dibuja el camino encontrado
function paintPath(path) {
    //console.log(path);
    //Recorre el camino encontrado y asigna el caracter ASCII 169 a las posiciones
    path.forEach(([row, col]) => {
        matriz[row][col] = pathC;
    });
    matriz[0][0] = pathC;
    // Imprimir la matriz en la consola
    for (let i = 0; i < rows; i++) {
        console.log(matriz[i].join("")); // Usar join('') para unir elementos sin comas
    }
}

let foundPath = false; //Camino no encontrado, hasta el momento

const explorePaths = (maze, row, col, visited, path) => {
    if (row === randomRow && col === 29) {
        foundPath = true; // Marca que se encontro el camino
        paintPath(path); // Llama la función para pintar el camino
        return; // Termina la exploracion
    }

    const allowedMoves = [
        // Define los movimientos permitidos

        [0, 1],
        // Mover hacia la derecha
        [1, 0],
        // Mover hacia abajo
        [-1, 0],
        // Mover hacia arriba
        [0, -1],
    ];

    // Si no encontró un camino entra al if
    if (!foundPath) {
        //Movimiento de fila y columna
        allowedMoves.forEach(([rowMove, colMove]) => {
            //movimiento atual + el nuevo
            const newRow = row + rowMove;
            const newCol = col + colMove;

            // Si la nueva posición está dentro de los límites del laberinto
            const isInBounds =
                newRow >= 0 &&
                newRow < maze.length &&
                newCol >= 0 &&
                newCol < maze[0].length;
            //compruebaa si avanza si esta dentro del limite y la posicion en la labarinto es diferente de muro
            const isPassable = isInBounds && maze[newRow][newCol] !== muro;
            //Comprueba si a visitado la posicion
            const isVisited = visited.some(
                (visitedPosition) =>
                    visitedPosition[0] === newRow &&
                    visitedPosition[1] === newCol,
            );

            if (isPassable && !isVisited) {
                // Si la nueva posición es transitable y no ha sido visitada, la explora
                visited.push([newRow, newCol]); // Marca la nueva posición como visitada
                path.push([newRow, newCol]);
                explorePaths(maze, newRow, newCol, visited, path); // Llama recursivamente a la función para explorar desde la nueva posición
                path.pop(); // Retrocede eliminando la última celda
            }
        });
    }
};

const visited = []; //Lista donde guarda todos los indices de las posiciones visitadas
const path = [];

createTable(); // Crea la tabla del laberinto
if (matriz[randomRow][28] === muro) {
    
    console.log("No hay camino"); // Muestra por pantalla no hay camino
} else {
    explorePaths(matriz, 0, 0, visited, path); //Inicia la exploración del laberinto desde la posición inicial

    if (!foundPath) {
        // Si despues de la exploración no se ha encontrado un camino
        console.log("No hay camino"); // Muestra por no hay camino
    }
}
