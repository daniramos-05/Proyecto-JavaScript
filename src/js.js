// Declaración de variables y constantes //
let membresiaBasica = 50;
let membresiaPremium = 100;
const costoClase = 10;
let clasesCompradas = 0;
let saldo = 0;

// Función para comprar clases //
function comprarClases() {
    let cantidad = parseInt(prompt("Ingrese la cantidad de clases que desea comprar:"));
    
    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor ingrese una cantidad válida.");
        return;
    }

    let totalAPagar = cantidad * costoClase;
    let pagoUsuario = parseFloat(prompt("El total a pagar por " + cantidad + " clase(s) es: $" + totalAPagar.toFixed(2) + ".\nIngrese la cantidad que desea pagar:"));

    if (isNaN(pagoUsuario) || pagoUsuario < totalAPagar) {
        alert("El pago ingresado no es suficiente.");
        return;
    }

    let confirmacion = confirm("¿Está seguro de que desea comprar " + cantidad + " clase(s) por $" + totalAPagar.toFixed(2) + "?");

    if (confirmacion) {
        clasesCompradas += cantidad;
        saldo -= totalAPagar;
        alert("Ha comprado " + cantidad + " clase(s).");
    } else {
        alert("Compra cancelada.");
    }
}

// Función para actualizar saldo y membresía //
function actualizarMembresia() {
    let saldoActual = parseFloat(prompt("Ingrese su saldo actual:"));
    
    if (isNaN(saldoActual)) {
        alert("Por favor ingrese un saldo válido.");
        return;
    }

    if (saldoActual >= membresiaPremium - membresiaBasica) {
        let tipoMembresia = confirm("¿Desea actualizar su membresía a Premium?");
        if (tipoMembresia) {
            saldo -= membresiaPremium - membresiaBasica;
            alert("¡Su membresía ha sido actualizada a Premium!");
        }
    } else {
        alert("No tiene suficiente saldo para actualizar su membresía.");
    }
}

// Función principal //
function main() {
    console.log("Bienvenido a la compra de clases GNO (GYM NEW OPPORT).");
    console.log("Membresía Básica: $" + membresiaBasica);
    console.log("Membresía Premium: $" + membresiaPremium);
    console.log("Costo por clase adicional: $" + costoClase);

    // Ejecutar la simulación //
    comprarClases();
    actualizarMembresia();
    console.log("Clases compradas: " + clasesCompradas);
    console.log("Saldo restante: $" + saldo);
}

// Ejecutar la función principal cuando se cargue la página //
main();