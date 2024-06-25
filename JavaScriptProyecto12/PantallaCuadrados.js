/* --------------------------------------------------
● Fecha y Hora de publicación: [20/06/2024]
● Versión de su código: [0.1]
● Autores: [Los 39 del bootcamp]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa: 
    Genera una matriz 30x60 con puntos y remplaza ciertos puntos por "o",
    entre los puntos o se busca que conjuntos de 4 puntos se puden generar rectangulos,
    siendo las o los vertices, cada rectangulo se llenará de caracteres "x",
    y finalmente se mostrarán los valores de la base y altura del rectángulo más pequeño
-------------------------------------------------- */

// un puntoCritico Representa las coordenadas de las "o" en la matríz
class PuntoCritico {
    constructor() {
        this.posX; // Posición en X
        this.posY; // Posición en Y
    }
} 

// Rectangulo: Conjunto de 4 puntos críticos en la matriz donde se genera un rectángulo, esta clase
// tambien contiene las medidas del tríangulo
class Rectangulo {
    constructor(puntoCritico1, puntoCritico2, puntoCritico3, puntoCritico4) {
        this.puntoCritico1 = puntoCritico1; // puntoCritico1: Punto superior izquierdo
        this.puntoCritico2 = puntoCritico2; // puntoCritico2: Punto superior derecho
        this.puntoCritico3 = puntoCritico3; // puntoCritico3: Punto inferior izquierdo
        this.puntoCritico4 = puntoCritico4; // puntoCritico4: Punto inferior derecho
        // ----------------------------- //
        this.base = Math.abs(puntoCritico2.posX - puntoCritico1.posX) + 1;
        this.altura = Math.abs(puntoCritico1.posY - puntoCritico3.posY) + 1;
        // Se suma 1 a porque las coordenadas empiezan en 0
        // ----------------------------- //
        this.area = this.base * this.altura;
    }
}

// DISPOSICIÓN DE LOS VERTICES DEL RECTÁNGULO
//       1 ----------- 2
//       |             |
//       |             |
//       3 ----------- 4

// MatrixContext: Objeto que contiene la matriz y sus propiedades
class MatrixContext {
    constructor() {
        this.matriz = this.crearMatriz(30, 60); // se crea matriz que es una matriz 30 x 60
        this.puntosCriticos = []; // Arreglo de puntosCriticos
        this.rectangulosEncontrados = []; // Arreglo de rectangulos
    }

    // Método para crear una matriz con un número especificado de filas y columnas
    crearMatriz(filas, columnas) {
        let matriz = [];
        for (let i = 0; i < filas; i++) {
            // Se recorre la cantidad de filas
            // Para cada fila, crear una nueva fila de 'columnas' puntos
            let fila = new Array(columnas).fill("."); // Para cada fila se crea un arreglo de .
            matriz.push(fila);
        }
        return matriz;
    }

    // Método que imprime la matriz
    imprimirMatriz() {
        for (let i = 0; i < this.matriz.length; i++) {
            // Recorre la matriz por columnas
            console.log(this.matriz[i].join("")); // Imprime los elementos de toda una fila
        }
    }

    // Método para crear puntosCriticos, marcarlos en la matriz y agregarlos a la lista
    crearPuntosCriticos() {
        const CANTIDAD_DE_PUNTOS = 80; // Se definen la cantidad de puntoas que se crerán como máximo

        for (let i = 0; i < CANTIDAD_DE_PUNTOS; i++) {
            let punto = new PuntoCritico(); // Se crea una instancia de PuntoCritico

            punto.posX = Math.floor(Math.random() * 60); // Se genera una coordenada aleatoria en X
            punto.posY = Math.floor(Math.random() * 30); // Se genera una coordenada aleatoria en Y
            this.puntosCriticos.push(punto); // Se agrega el puntoCritico a la lista de puntosCriticos

            this.matriz[punto.posY][punto.posX] = "o"; // Se marca el puntoCritico en la matriz
        }
    }

    // Esta función llena el arreglo rectangulosEncontrados con todos los rectángulos
    // posibles formados por los puntosCriticos. Cada rectángulo recibe cuatro puntos críticos que sean
    // los vértices del rectángulo
    crearRectangulos() {
        // Iterar sobre todos los pares de puntos críticos
        for (let i = 0; i < this.puntosCriticos.length; i++) {
            for (let j = 0; j < this.puntosCriticos.length; j++) {
                if (i === j) continue; // Evitar comparar el mismo punto consigo mismo

                let puntoCritico1 = this.puntosCriticos[i]; // Vertice 1
                let puntoCritico4 = this.puntosCriticos[j]; // Vertice 4

                // DISPOSICIÓN DE LOS VERTICES DEL RECTÁNGULO
                //       1 ----------- 2    
                //       |             |    
                //       |             |    
                //       3 ----------- 4    

                // Comprobar que los puntos críticos no estén en la misma línea horizontal o vertical
                // Si fuese así, el rectángulo sería una linea y solo existirían dos vertices
                if (
                    puntoCritico1.posX !== puntoCritico4.posX &&
                    puntoCritico1.posY !== puntoCritico4.posY
                ) {
                    // punto crítico 3: Cumple que su coordenada en "x" es la misma que la del 1 
                    // y su coordenada en "y" es la misma que la del 4
                    let puntoCritico3 = this.puntosCriticos.find(
                        // El método find devuelve el primer elemento que cumple la condición
                        (punto) =>
                            punto.posX === puntoCritico1.posX &&
                            punto.posY === puntoCritico4.posY
                    );
                    // punto crítico 2: Cumple que su coordenada en "x" es la misma que la del 4 
                    // y su coordenada en "y" es la misma que la del 1
                    let puntoCritico2 = this.puntosCriticos.find(
                        (punto) =>
                            punto.posX === puntoCritico4.posX &&
                            punto.posY === puntoCritico1.posY
                    );

                    // Si se encuentran los dos puntos críticos adicionales (no son undefined), crear el rectángulo
                    if (puntoCritico3 && puntoCritico2) {
                        let rectangulo = new Rectangulo(
                            puntoCritico1,
                            puntoCritico2,
                            puntoCritico3,
                            puntoCritico4
                        );
                        this.rectangulosEncontrados.push(rectangulo); // Añadir el rectángulo al arreglo
                    }
                }
            }
        }
    }

    // Método para dibujar los rectángulos en la matriz y llenarlos con "x"
    marcarRectangulosEnMatriz() {
        // Iterar sobre todos los rectángulos encontrados
        for (const rectangulo of this.rectangulosEncontrados) {

            // DISPOSICIÓN DE LOS VERTICES DEL RECTÁNGULO
                //       1 ----------- 2    
                //       |             |    
                //       |             |    
                //       3 ----------- 4    


            // Marcar el área del rectángulo en la matriz por medio de dos ciclos for, el primero recorre las filas
            // (movimiento vertical) y el segundo las columnas (movimiento horizontal)
            for (
                let i = rectangulo.puntoCritico1.posY;
                i <= rectangulo.puntoCritico3.posY;
                i++
            ) {
                for (
                    let j = rectangulo.puntoCritico1.posX;
                    j <= rectangulo.puntoCritico2.posX;
                    j++
                ) {
                    if (this.matriz[i][j] !== "o") this.matriz[i][j] = "x"; // para cada punto dentro del rectángulo, se marca con "x" a menos que se encuentre un punto crítico, en ese caso se deja el punto crítico
                }
            }
        }
    }

    // Función que imprime la base y altura del rectángulo más pequeño
    valoresRectanguloMasPequeno() {
        this.rectangulosEncontrados.sort((a, b) => a.area - b.area); // Se ordena el arreglo de rectángulos

        let rectanguloMasPequeno = this.rectangulosEncontrados[0]; // El primer elemento del arreglo ordenado es el más pequeño

        // Si existe un rectángulo se imprime su base y altura
        if (rectanguloMasPequeno !== undefined) {
            console.log(
                "El área del réctangulo más pequeño es: " +
                    rectanguloMasPequeno.base +
                    " X " +
                    rectanguloMasPequeno.altura
            );
        } else {
            console.log("No hay rectangulos");
        }
    }
}

// ------------------------------------------------------------------------------------------------------------

const main = () => {

    // Se crea el objeto de contexto de la matriz
    let mainMatrix = new MatrixContext();

    // Se generan los puntos criticos
    mainMatrix.crearPuntosCriticos();

    // Se imprime la matriz con sus puntos criticos
    mainMatrix.imprimirMatriz();

    console.log(
        "\n-----------------------------------------------------------------------\n"
    );

    // Se crea el arreglo de rectángulos en la matriz a partir de los puntos criticos
    mainMatrix.crearRectangulos();

    // Se marcan los rectangulos antes encontrados
    mainMatrix.marcarRectangulosEnMatriz();

    // Se imprime la matriz ahora con los rectangulos
    mainMatrix.imprimirMatriz();

    // Se muestran los valores de base x altura del rectángulo más pequeño
    mainMatrix.valoresRectanguloMasPequeno();
};

main();
