let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'K', 'Q'];

//Referencias de HTML
const buttonNuevo = document.querySelector('#buttonNuevo');
const buttonPedir = document.querySelector('#buttonPedir');
const buttonDetener = document.querySelector('#buttonDetener');

const puntajes = document.querySelectorAll('small');

const jugadorCartas = document.querySelector('#jugadorCartas');

// const tagImg = document.createElement('img');

let puntosJugador = 0, puntosComputadora = 0;

const crearDeck = () => {

    // Se deben crear todas las cartas
    //Sabemos que las cartas de numeros empiezan en 2 a 10, ciclo for que maneje el numero
    //Teniendo cartas trebol, corazon, espada y diamante pueden agregarse en un ciclo tambien
    for (let index = 2; index <= 10; index++) {
        //Sin ciclo for:

        // deck.push(index+'C.png');
        // deck.push(index+'D.png');
        // deck.push(index+'H.png');
        // deck.push(index+'S.png');

        //Con ciclo for
        for (let tipo of tipos) {
            deck.push(index + tipo);
        }
    }

    for (let especial of especiales) {
        for (let tipo of tipos) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

//Pedir una carta de la baraja
const pedirCartar = () => {

    if (deck.length === 0) {
        throw 'Baraja sin cartas';
    }
    let carta = deck.pop();
    return carta;
}

let carta = pedirCartar();
console.log(deck);

//Determinar el valor de la carta
const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

//Eventos
buttonPedir.addEventListener('click', () => {
    const carta = pedirCartar();
    const cartaAgregada = document.createElement('img');
    puntosJugador = puntosJugador + valorCarta(carta);

    puntajes[0].innerText = puntosJugador;
    cartaAgregada.classList = 'carta';
    cartaAgregada.src = `assets/cartas/${carta}.png`;
    jugadorCartas.append(cartaAgregada);

    //Logica del juego
    if (puntosJugador > 21) {
        buttonPedir.disabled = true;
        console.warn('PASASTE DE 21! PERDISTE!');
    } else if (puntosJugador === 21) {
        console.warn('GANASTE!');
        buttonPedir.disabled = true;
    } else {

    }
})