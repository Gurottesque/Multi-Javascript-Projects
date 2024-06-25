/* --------------------------------------------------
● Fecha y Hora de publicación: [21/06/2024]
● Versión de su código: [2.0]
● Autores: [Todos los ingenieros del grupo (39)]
● Nombre del lenguaje utilizado: [JavaScript]
● Versión del lenguaje utilizado: [ECMAScript 6]
● Universidad Tecnológica de Pereira
● Programa de Ingeniería de Sistemas y Computación
● Cuarta (IV) cohorte Coding BootCamp FullStack
-------------------------------------------------- */

/* --------------------------------------------------
● Descripción del programa:
Este programa en JavaScript permite analizar y graficar polinomios de forma textual en la consola. Está estructurado en varios pasos:
1.parseo de la cadena de polinomio.
2. lectura de rangos.
3. construcciones de tablas de valores.
4. finalmente la graficación del polinomio con la inclusión de los ejes X y Y.

● Salvedades:
1. Solo se asegura el funcionamiento del programa con exponentes y coeficientes enteros.
2. Si el eje X se encuentra en la parte de abajo de la grafica los numeros del eje X no aparecerán
3. Se deben ingresar valores correctos en los inputs
-------------------------------------------------- */

// Importa la librería para pedir información al usuario
const prompt = require('prompt-sync')();

// Paso 1: Parseo de la cadena
function parsePolynomial(polynomial) {
    let terms = [];
    // Expresión regular mejorada para coincidir con los términos del polinomio
    let termRegex = /([+-]?\d*\.?\d*)X(?:\((-?\d+)\)|(\d+))?|([+-]?\d+)/g;
    /*
    Esta expresión regular está diseñada para coincidir con los diferentes términos de un polinomio.

    ([+-]?\d*\.?\d*)X: Esta parte coincide con el coeficiente y la variable X.
    
    [+-]?: Coincide opcionalmente con un signo más o menos.
    \d*: Coincide con cero o más dígitos.
    \.?: Coincide opcionalmente con un punto decimal.
    \d*: Coincide nuevamente con cero o más dígitos después del punto decimal.
    X: Coincide literalmente con la letra X (la variable).
    * = 0 más veces
    + = 1 o más veces
    
    (?:\((-?\d+)\)|(\d+))?: Esta parte es opcional y coincide con el exponente.
    (?:...): Un grupo no capturante.
    \((-?\d+)\): Coincide con un exponente entre paréntesis, permitiendo números negativos.
    |: O bien...
    (\d+): Coincide con un exponente sin paréntesis (solo números positivos).
    El ? al final hace que todo este grupo sea opcional.

    |: Este operador OR separa la expresión anterior de la siguiente alternativa.
    ([+-]?\d+): Esta parte coincide con términos constantes (sin X).

    [+-]?: Coincide opcionalmente con un signo más o menos.
    \d+: Coincide con uno o más dígitos.


    /g: Esta bandera al final indica que la búsqueda debe ser global, es decir, encontrar todas las coincidencias en la cadena, no solo la primera.

    En resumen, esta expresión regular puede coincidir con:

    Términos con X y coeficiente (ej: 2X, -3.5X)
    Términos con X, coeficiente y exponente (ej: 2X^2, -3X^(-1), 4X(3))
    Términos constantes (ej: 5, -7)

    Esta expresión es bastante robusta y puede manejar una amplia variedad de formatos de términos polinómicos, lo que la hace muy útil para parsear polinomios ingresados por el usuario.
    */

    let matches = polynomial.match(termRegex);

    if (!matches) {
        console.error("El polinomio proporcionado no es válido.");
        return [];
    }
    for (let match of matches) { 
        if (match.includes('X')) {                              
            let [_, coefficient, power1, power2] = match.match(/([+-]?\d*\.?\d*)X(?:\((-?\d+)\)|(\d+))?/);
            
            coefficient = coefficient === '' || coefficient === '+' ? 1 : coefficient === '-' ? -1 : parseFloat(coefficient);
            // Si no se especifica la potencia, asumir que es 1

            let power = power1 !== undefined ? parseInt(power1) : power2 !== undefined ? parseInt(power2) : 1;

            terms.push([coefficient, power]);
        } else { 
            terms.push([parseInt(match), 0]);
        }   
    }

    return terms;
}

function readRange() {
    // Bucle infinito que se ejecuta hasta que el usuario ingrese valores válidos
    while (true) {
        // Solicitar al usuario que ingrese el rango de inicio
        const start = parseInt(prompt('Ingrese el rango de inicio: '));
        // Solicitar al usuario que ingrese el rango de fin
        const end = parseInt(prompt('Ingrese el rango de fin: '));
        // Solicitar al usuario que ingrese el incremento
        const increment = parseFloat(prompt('Ingrese el incremento: '));

        // Validar que las entradas sean números válidos y que el incremento no sea cero
        if (!isNaN(start) && !isNaN(end) && !isNaN(increment) && increment > 0) {
            // Si todas las entradas son válidas, devolver un objeto con los valores convertidos
            return { start: start, end: end, increment: increment };
        } else {
            // Si alguna entrada no es válida, mostrar un mensaje de error
            console.error("Por favor ingrese valores válidos. El incremento no puede ser cero.");
        }
    }
}

function evaluatePolynomial(terms, x) {
    // Evaluar el polinomio en un punto x dado
    // Utilizando la fórmula sum(coefficient * x^power)
    return terms.reduce((sum, [coefficient, power]) => sum + coefficient * Math.pow(x, power), 0);
}

function buildValueTable(start, end, increment, terms) {
    let table = [];

    // Construir una tabla de valores para el rango especificado
    for (let x = start; x <= end; x += increment) {
        // Evaluar el polinomio en x y agregar el par {x, y} a la tabla
        let y = evaluatePolynomial(terms, x);
        table.push({ x, y });
    }
    return table;
}

function buildEvaluationTable(valueTable, terms) {
    let evaluationTable = [];
    for (let point of valueTable) {
        let evaluationString = terms.map(([coefficient, power]) =>
            `${coefficient} * (${point.x}^${power})`
        ).join(' + ');
        let evaluation = evaluatePolynomial(terms, point.x);
        evaluationTable.push({
            x: point.x,
            Evaluacion: evaluationString,
            y: evaluation
        });
    }
    return evaluationTable;
}




function Range(min, max, inc) {
    let result = [];
    for (let i = min; i <= max; i = i + inc) {
        result.push(i);
    }
    return result;
}

const width = 80;
const height = 24;
function Plot(xMin, xMax, inc, fx, valueTable) {

    let inputs = Range(xMin, xMax, inc);
    let xRange = Math.abs(xMin - xMax) + 1;
    let inputscale = (width - 1) / xRange;
    let outputs = inputs.map(fx);
    if (fx(0) === Infinity) {
        inputs = inputs.filter(x => x !== 0);
    }
    outputs = outputs.filter(y => y !== Infinity);

    let yMin = Math.min(...outputs);
    let yMax = Math.max(...outputs);
    let yRange = Math.abs(yMin - yMax) + 1;
    let outputscale = (height - 1) / yRange;
    let xAxis = Math.round(-yMin * outputscale);
    let yAxis = Math.round(-xMin * inputscale);

    let drawXAxis = (yMin <= 0 <= yMax) ? height - 1 - xAxis : height - 1;
    let drawYAxis = (xMin <= 0 <= xMax) ? yAxis : 0;
    let graphString = axisString(drawYAxis + 1, drawXAxis);

    // Dibujar numeros en el eje Y
    for (let i = 0; i < outputs.length; i++) {
        let valueY = outputs[i];
        valueY = valueY.toFixed(1); //Un solo decimal
        let StrvalueY = valueY.toString();
        let posY = Math.round(outputs[i] * outputscale + xAxis);
        let index = ((height - posY - 1) * 81 + drawYAxis) + 1;
        graphString = replaceSubStr(graphString, index, StrvalueY.length, StrvalueY);
    }

    //Dibujar numeros en el eje X
    for (let i = 0; i < (inputs.length); i++) {
        let valueY = inputs[i];
        valueY = valueY.toFixed(1); //Un solo decimal
        let StrvalueY = valueY.toString();
        let posX = Math.round(inputs[i] * inputscale + yAxis + (drawXAxis + 1) * 81);
        graphString = replaceSubStr(graphString, posX, StrvalueY.length, StrvalueY);
    }

    // Dibujar los puntos
    for (let i = 0; i < inputs.length; i++) {
        let posX = Math.round(inputs[i] * inputscale + yAxis);
        let posY = Math.round((height - 1) - (outputs[i] * outputscale + xAxis));
        strIndex = posX + posY * 81;
        graphString = replaceChar(graphString, strIndex, "x");
    }
    console.log(graphString);

}

function stringOnlyChar(numSpaces, char) {
    if (numSpaces > 0) {
        return char + stringOnlyChar(numSpaces - 1, char);
    }
    else {
        return "";
    }
}

function axisString(yDrawOrigin, xDrawOrigin) {
    let stringAxis = "";
    for (let row = 0; row < height; row++) {
        if (row !== Math.round(xDrawOrigin)) {
            stringAxis += stringOnlyChar(Math.round(yDrawOrigin - 1), " ") + "|" + stringOnlyChar(width - yDrawOrigin, " ") + "\n";

        }
        else {
            stringAxis += stringOnlyChar(width, "-") + "\n";
        }
    }
    return stringAxis;
}

//Toma una string y reemplaza una de sus posiciones destro de la gráfica (80*24)

function replaceChar(str, index, char) {
    if ((index + 1 > 1944) || (index < 0)) {
        return str;
    } else {
        return str.substring(0, index) + char + str.substring(index + 1);
    }
}


function replaceSubStr(str, index, length, subStr) {
    if ((index + length > 1944) || (index < 0)) {
        return str;
    } else {
        return str.substring(0, index) + subStr + str.substring(index + length);
    }
}

const func = function func(x) {
    return x ** 2;
}

let polynomial = prompt("Ingrese el polinomio: ").toUpperCase();
let terms = parsePolynomial(polynomial);
if (terms.length === 0) {
    console.error("No se pudo obtener el polinomio. Terminando el programa.");
    return;
}

let { start, end, increment } = readRange();

let valueTable = buildValueTable(start, end, increment, terms);

let transformedTerms = terms.map(([Coefficiente, Potencia]) => ({
    Coefficiente,
    Potencia
}));

console.table(transformedTerms);

console.log("Tabla de valores:");

let evaluationTable = buildEvaluationTable(valueTable, terms);

console.table(evaluationTable);


function fx(x) {
    let out = 0; // Initialize the output variable
    for (let i = 0; i < terms.length; i++) {
        out += x ** terms[i][1] * terms[i][0];
    }
    return out;
}


Plot(start, end, increment, fx);

