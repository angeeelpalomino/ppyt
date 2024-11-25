let puntosusuario = 0;
let puntosPC = 0;

const instrucciones = document.querySelector("#instrucciones");
const marcadorpuntosusuario = document.querySelector("#puntos-usuario");
const marcadorpuntosPC = document.querySelector("#puntos-robotsin");
const mensaje = document.querySelector("#mensaje");
const marcadorganapunto = document.querySelector("#gana-punto");
const elegirarma = document.querySelector("#elige-tu-mejor-arma");

const marcadoreleccionusuario = document.querySelector("#eleccion-usuario");
const marcadoreleccionpc = document.querySelector("#eleccion-robotsin");

const botonesarmas = document.querySelectorAll(".arma");
botonesarmas.forEach(boton => {
    boton.addEventListener("click", iniciarturno);
});

function iniciarturno(e) {
    let eleccionpc = Math.floor(Math.random() * 3);
    let eleccionusuario = e.currentTarget.id;

    // Piedra 0, Papel 1, Tijera 2
    if (eleccionpc === 0) {
        eleccionpc = "piedra ✊";
    } else if (eleccionpc === 1) {
        eleccionpc = "papel ✋";
    } else if (eleccionpc === 2) {
        eleccionpc = "tijera ✌️";
    }

    if (
        (eleccionusuario === "piedra ✊" && eleccionpc === "tijera ✌️") ||
        (eleccionusuario === "tijera ✌️" && eleccionpc === "papel ✋") ||
        (eleccionusuario === "papel ✋" && eleccionpc === "piedra ✊")
    ) {
        ganausuario();
    } else if (
        (eleccionpc === "piedra ✊" && eleccionusuario === "tijera ✌️") ||
        (eleccionpc === "tijera ✌️" && eleccionusuario === "papel ✋") ||
        (eleccionpc === "papel ✋" && eleccionusuario === "piedra ✊")
    ) {
        ganapc();
    } else {
        empate();
    }

    mensaje.classList.remove("disabled");
    marcadoreleccionusuario.innerText = eleccionusuario;
    marcadoreleccionpc.innerText = eleccionpc;
}

function ganausuario() {
    puntosusuario++;
    marcadorpuntosusuario.innerText = puntosusuario;
    marcadorganapunto.innerText = ""; // Borra el contenido para forzar actualización
    marcadorganapunto.innerText = "Ganaste un puntillo nomas 😂";
    console.log("Usuario ganó");
}

function ganapc() {
    puntosPC++;
    marcadorpuntosPC.innerText = puntosPC;
    marcadorganapunto.innerText = ""; // Borra el contenido para forzar actualización
    marcadorganapunto.innerText = "Te ganó una computadora 🤣🫵";
    console.log("PC ganó");
}

function empate() {
    marcadorganapunto.innerText = ""; // Borra el contenido para forzar actualización
    marcadorganapunto.innerText = "Ay no, échale cabeza, fue empate 😒";
    console.log("Empate");
}