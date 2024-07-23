class Matriz {
    constructor(matriz) {
        this.matriz = matriz;
        this.filas = matriz.length;
        this.columnas = matriz[0].length;
    }

    // Suma de matrices
    static suma(matriz1, matriz2) {
        if (matriz1.filas !== matriz2.filas || matriz1.columnas !== matriz2.columnas) {
            throw new Error("Las matrices deben tener el mismo tamaño para sumarse.");
        }
        return matriz1.matriz.map((fila, i) =>
            fila.map((valor, j) => valor + matriz2.matriz[i][j])
        );
    }

    // Resta de matrices
    static resta(matriz1, matriz2) {
        if (matriz1.filas !== matriz2.filas || matriz1.columnas !== matriz2.columnas) {
            throw new Error("Las matrices deben tener el mismo tamaño para restarse.");
        }
        return matriz1.matriz.map((fila, i) =>
            fila.map((valor, j) => valor - matriz2.matriz[i][j])
        );
    }

    // Multiplicación de matrices
    static multiplicacion(matriz1, matriz2) {
        if (matriz1.columnas !== matriz2.filas) {
            throw new Error("El número de columnas de la primera matriz debe ser igual al número de filas de la segunda matriz.");
        }
        let resultado = Array(matriz1.filas).fill().map(() => Array(matriz2.columnas).fill(0));
        for (let i = 0; i < matriz1.filas; i++) {
            for (let j = 0; j < matriz2.columnas; j++) {
            // K es la fila de la matriz 1 y la columna de la matriz2
                for (let k = 0; k < matriz1.columnas; k++) {
                    resultado[i][j] += matriz1.matriz[i][k] * matriz2.matriz[k][j];
                }
            }
        }
        return resultado;
    }

    // Multiplicación escalar
    static escalar(matriz, escalar) {
        return matriz.matriz.map(fila =>
            fila.map(valor => valor * escalar)
        );
    }

    // Transpuesta de la matriz
    static traspuesta(matriz) {
        let resultado = Array(matriz.columnas).fill().map(() => Array(matriz.filas).fill(0));
        for (let i = 0; i < matriz.filas; i++) {
            for (let j = 0; j < matriz.columnas; j++) {
                resultado[j][i] = matriz.matriz[i][j];
            }
        }
        return resultado;
    }
}

// Ejemplo
let matriz1 = new Matriz([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

let matriz2 = new Matriz([
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1]
]);

console.log("Suma:");
console.log(Matriz.suma(matriz1, matriz2));

console.log("Resta:");
console.log(Matriz.resta(matriz1, matriz2));

console.log("Multiplicación:");
console.log(Matriz.multiplicacion(matriz1, matriz2));

console.log("Multiplicación Escalar:");
console.log(Matriz.escalar(matriz1, 2));

console.log("Traspuesta:");
console.log(Matriz.traspuesta(matriz1));
