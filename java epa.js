// Clase abstracta: Define el comportamiento general de un jugador
class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.puntos = 0; // Encapsulación: Atributo privado simulado
    }

    // Método para incrementar puntos
    sumarPunto() {
        this.puntos++;
    }

    // Método para obtener los puntos
    obtenerPuntos() {
        return this.puntos;
    }

    // Método abstracto para realizar una elección (será implementado por subclases)
    elegir() {
        throw new Error("El método 'elegir' debe ser implementado");
    }
}

// Clase concreta para el usuario
class Usuario extends Jugador {
    constructor(nombre) {
        super(nombre);
        this.eleccion = null;
    }

    // El usuario elige su arma (implementación del método abstracto)
    elegir(arma) {
        this.eleccion = arma;
    }

    obtenerEleccion() {
        return this.eleccion;
    }
}

// Clase concreta para la PC
class Computadora extends Jugador {
    constructor(nombre) {
        super(nombre);
    }

    // La computadora elige al azar
    elegir() {
        const opciones = ["piedra ✊", "papel ✋", "tijera ✌️"];
        return opciones[Math.floor(Math.random() * opciones.length)];
    }
}

// Clase principal para gestionar el juego
class Juego {
    constructor(usuario, computadora) {
        this.usuario = usuario;
        this.computadora = computadora;
    }

    // Método para determinar el ganador de un turno
    jugarTurno(eleccionUsuario) {
        const eleccionPC = this.computadora.elegir();
        this.usuario.elegir(eleccionUsuario);

        let resultado = "";
        if (
            (eleccionUsuario === "piedra ✊" && eleccionPC === "tijera ✌️") ||
            (eleccionUsuario === "tijera ✌️" && eleccionPC === "papel ✋") ||
            (eleccionUsuario === "papel ✋" && eleccionPC === "piedra ✊")
        ) {
            this.usuario.sumarPunto();
            resultado = "usuario";
        } else if (
            (eleccionPC === "piedra ✊" && eleccionUsuario === "tijera ✌️") ||
            (eleccionPC === "tijera ✌️" && eleccionUsuario === "papel ✋") ||
            (eleccionPC === "papel ✋" && eleccionUsuario === "piedra ✊")
        ) {
            this.computadora.sumarPunto();
            resultado = "computadora";
        } else {
            resultado = "empate";
        }

        return {
            eleccionUsuario,
            eleccionPC,
            resultado,
            puntosUsuario: this.usuario.obtenerPuntos(),
            puntosPC: this.computadora.obtenerPuntos(),
        };
    }
}

// Configuración de los elementos del DOM
const instrucciones = document.querySelector("#instrucciones");
const marcadorpuntosusuario = document.querySelector("#puntos-usuario");
const marcadorpuntosPC = document.querySelector("#puntos-robotsin");
const mensaje = document.querySelector("#mensaje");
const marcadorganapunto = document.querySelector("#gana-punto");
const elegirarma = document.querySelector("#elige-tu-mejor-arma");
const marcadoreleccionusuario = document.querySelector("#eleccion-usuario");
const marcadoreleccionpc = document.querySelector("#eleccion-robotsin");

// Instancias de jugadores y el juego
const usuario = new Usuario("Jugador");
const computadora = new Computadora("PC");
const juego = new Juego(usuario, computadora);

// Vincular eventos a los botones
const botonesarmas = document.querySelectorAll(".arma");
botonesarmas.forEach((boton) => {
    boton.addEventListener("click", (e) => {
        const eleccionUsuario = e.currentTarget.id;
        const resultado = juego.jugarTurno(eleccionUsuario);

        // Actualización del DOM
        marcadoreleccionusuario.innerText = resultado.eleccionUsuario;
        marcadoreleccionpc.innerText = resultado.eleccionPC;
        marcadorpuntosusuario.innerText = resultado.puntosUsuario;
        marcadorpuntosPC.innerText = resultado.puntosPC;

        if (resultado.resultado === "usuario") {
            marcadorganapunto.innerText = "¡Ganaste este turno! 🎉";
        } else if (resultado.resultado === "computadora") {
            marcadorganapunto.innerText = "Te ganó la PC... 😢";
        } else {
            marcadorganapunto.innerText = "Es un empate. 🤔";
        }
    });
});
