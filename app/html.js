// Variables y constantes //
let membresiaBasica = 50;
let membresiaPremium = 100;
const costoClase = 10;
let clasesCompradas = [];
let saldo = 0;

// Función para comprar clases //
function comprarClases() {
  let cantidad = parseInt(
    prompt("Ingrese la cantidad de clases que desea comprar:")
  );

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor ingrese una cantidad válida.");
    return;
  }

  let totalAPagar = cantidad * costoClase;
  let pagoUsuario = parseFloat(
    prompt(
      "El total a pagar por " +
        cantidad +
        " clase(s) es: $" +
        totalAPagar.toFixed(2) +
        ".\nIngrese la cantidad que desea pagar:"
    )
  );

  if (isNaN(pagoUsuario) || pagoUsuario < totalAPagar) {
    alert("El pago ingresado no es suficiente.");
    return;
  }

  let confirmacion = confirm(
    "¿Está seguro de que desea comprar " +
      cantidad +
      " clase(s) por $" +
      totalAPagar.toFixed(2) +
      "?"
  );

  if (confirmacion) {
    let fechaCompra = new Date();
    for (let i = 0; i < cantidad; i++) {
      clasesCompradas.push(fechaCompra);
    }
    saldo -= totalAPagar;
    actualizarEstado();
    guardarEnLocalStorage();

    // Mostrar mensaje de compra de clases
    alert(
      "Se han comprado " +
        cantidad +
        " clase(s) el " +
        fechaCompra.toLocaleString()
    );
  } else {
    alert("Compra cancelada.");
  }
}

// Función para comprar membresía premium //
function comprarPremium() {
  let confirmacion = confirm(
    "¿Está seguro de que desea comprar la membresía Premium por $" +
      (membresiaPremium - membresiaBasica) +
      "?"
  );

  if (confirmacion) {
    let pagoUsuario = parseFloat(
      prompt("Ingrese el monto a pagar por la membresía Premium:")
    );

    if (
      isNaN(pagoUsuario) ||
      pagoUsuario < membresiaPremium - membresiaBasica
    ) {
      alert("El pago ingresado no es suficiente.");
      return;
    }

    saldo -= pagoUsuario;
    actualizarEstado();
    alert("¡La membresía se ha actualizado a Premium!");
    guardarEnLocalStorage();
  } else {
    alert("Compra cancelada.");
  }
}

// Función para actualizar el estado en el HTML //
function actualizarEstado() {
  // Verificar si los elementos existen antes de intentar acceder a ellos //
  let clasesCompradasElement = document.getElementById("clasesCompradas");
  let saldoElement = document.getElementById("saldo");

  if (clasesCompradasElement && saldoElement) {
    clasesCompradasElement.textContent =
      "Clases compradas: " + clasesCompradas.length;
    saldoElement.textContent = "Saldo restante: $" + saldo;
  } else {
    console.error(
      "No se encontraron elementos con los IDs 'clasesCompradas' o 'saldo'."
    );
  }
}

// Función para guardar en el local storage //
function guardarEnLocalStorage() {
  localStorage.setItem("clasesCompradas", JSON.stringify(clasesCompradas));
  localStorage.setItem("saldo", saldo);
}

// Al cargar la página, se asignan eventos y se verifica si hay datos en el local storage //
window.addEventListener("load", function () {
  // Asignar evento al botón para comprar clases //
  document
    .getElementById("comprarBtn")
    .addEventListener("click", comprarClases);

  // Asignar evento al botón para comprar membresía premium //
  document
    .getElementById("comprarPremiumBtn")
    .addEventListener("click", comprarPremium);

  // Verificar si hay datos en el local storage y actualizar el estado //
  if (localStorage.getItem("clasesCompradas")) {
    clasesCompradas = JSON.parse(localStorage.getItem("clasesCompradas"));
  }
  if (localStorage.getItem("saldo")) {
    saldo = parseInt(localStorage.getItem("saldo"));
  }
  actualizarEstado();
});
