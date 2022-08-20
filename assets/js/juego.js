let deck = [];
let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'K', 'Q'];

//Referencias de HTML
const buttonNuevo = document.querySelector('#buttonNuevo');
const buttonPedir = document.querySelector('#buttonPedir');
const buttonDetener = document.querySelector('#buttonDetener');

//Retorna una lista de nodos con todos los elementso que encajen con el parametro enviado
const puntajes = document.querySelectorAll('small');

const jugadorCartas = document.querySelector('#jugadorCartas');
const computadoraCartas = document.querySelector('#computadoraCartas');

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

//Para la logica de la computadora se tomara en cuenta que unicamente debe
// - Superar el valor del jugador sin pasar de 21 (Si el jugador tiene menos que 21)
// - Obtener cualquier valor menos a 21 (Si el jugador pierde)
// - Alcanzar 21 puntos
const turnoComputadora = (puntosMinimos) => {
    //Necesario ejecutar por lo menos una vez
    do {
        const carta = pedirCartar();
        const cartaAgregada = document.createElement('img');
        puntosComputadora = puntosComputadora + valorCarta(carta);

        //Dibuja en el HTML los puntos acumulados en el primer elemento con el tag 'small'
        puntajes[1].innerText = puntosComputadora;
        cartaAgregada.classList = 'carta';
        cartaAgregada.src = `assets/cartas/${carta}.png`;
        computadoraCartas.append(cartaAgregada);
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    //Determinar el ganador
    setTimeout(() => {
        if (puntosComputadora === puntosJugador) {
            alert('No hay ganador');
        } else if (puntosJugador > 21) {
            alert(`Gana la computadora con ${puntosComputadora} VS ${puntosJugador}`);
        } else if (puntosComputadora > 21) {
            alert(`GANASTE con ${puntosJugador} VS ${puntosComputadora}`);
        } else {
            alert('Computadora gana');
        }
    }, 20);

}

//Eventos
buttonPedir.addEventListener('click', () => {
    const carta = pedirCartar();
    const cartaAgregada = document.createElement('img');
    puntosJugador = puntosJugador + valorCarta(carta);

    //Dibuja en el HTML los puntos acumulados en el primer elemento con el tag 'small'
    puntajes[0].innerText = puntosJugador;
    cartaAgregada.classList = 'carta';
    cartaAgregada.src = `assets/cartas/${carta}.png`;
    jugadorCartas.append(cartaAgregada);

    //Logica del juego
    if (puntosJugador > 21) {
        //disabled: Deshabilitar elemento. 
        buttonPedir.disabled = true;
        console.warn('PASASTE DE 21! PERDISTE!');
        buttonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('GANASTE!');
        buttonPedir.disabled = true;
        buttonDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
})

buttonDetener.addEventListener('click', () => {
    buttonPedir.disabled = true;
    buttonDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

buttonNuevo.addEventListener('click', () => {
    buttonDetener.disabled = false;
    buttonPedir.disabled = false;

    puntosComputadora = 0;
    puntosJugador = 0;
    puntajes[0].innerText = puntosJugador;
    puntajes[1].innerText = puntosComputadora;

    jugadorCartas.innerHTML = '';
    computadoraCartas.innerHTML = '';

    crearDeck();
});