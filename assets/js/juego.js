const blackJackModule = (() => {
    'use strict';

    let deck = [];
    let tipos = ['C', 'D', 'H', 'S'];
    let especiales = ['A', 'J', 'K', 'Q'];

    //Referencias de HTML
    const buttonNuevo = document.querySelector('#buttonNuevo');
    const buttonPedir = document.querySelector('#buttonPedir');
    const buttonDetener = document.querySelector('#buttonDetener');

    //Retorna una lista de nodos con todos los elementso que encajen con el parametro enviado
    const puntajes = document.querySelectorAll('small');

    const cartasJugadores = document.querySelectorAll('#jugadorCartas');;

    // const tagImg = document.createElement('img');

    let puntosJugadores = [];

    buttonDetener.disabled = true;
    buttonPedir.disabled = true;

    // let puntosJugador = 0, puntosComputadora = 0;

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        //Inicializar arreglo con el numero de juagdores que se tienen.
        puntosJugadores = [];
        for (let index = 0; index < numJugadores; index++) {
            puntosJugadores[index] = 0;
            puntajes[index].innerHTML = 0;
            cartasJugadores[index].innerHTML = '';
        }
        buttonDetener.disabled = false;
        buttonPedir.disabled = false;

        // jugadorCartas.innerHTML = '';
        // computadoraCartas.innerHTML = '';
    }

    const crearDeck = () => {
        // deck = [];
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
        return _.shuffle(deck);;
    }

    //Pedir una carta de la baraja
    const pedirCartar = () => {

        if (deck.length === 0) {
            throw 'Baraja sin cartas';
        }
        return deck.pop();
    }

    //Determinar el valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
    }

    //Turno: 0 primer jugador y el ultimo la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        //Dibuja en el HTML los puntos acumulados en el primer elemento con el tag 'small'
        puntajes[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const cartaAgregada = document.createElement('img');
        cartaAgregada.classList = 'carta';
        cartaAgregada.src = `assets/cartas/${carta}.png`;
        cartasJugadores[turno].append(cartaAgregada);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        //Determinar el ganador
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('No hay ganador');
            } else if (puntosMinimos > 21) {
                alert(`Gana la computadora con ${puntosComputadora} VS ${puntosMinimos}`);
            } else if (puntosComputadora > 21) {
                alert(`GANASTE con ${puntosMinimos} VS ${puntosComputadora}`);
            } else {
                alert('Computadora gana');
            }
        }, 100);
    }

    //Para la logica de la computadora se tomara en cuenta que unicamente debe
    // - Superar el valor del jugador sin pasar de 21 (Si el jugador tiene menos que 21)
    // - Obtener cualquier valor menos a 21 (Si el jugador pierde)
    // - Alcanzar 21 puntos
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        //Necesario ejecutar por lo menos una vez
        do {
            const carta = pedirCartar();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1)
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    //Eventos
    buttonPedir.addEventListener('click', () => {
        const carta = pedirCartar();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0)

        //Logica del juego
        if (puntosJugador > 21) {
            //disabled: Deshabilitar elemento. 
            buttonPedir.disabled = true;
            buttonDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            buttonPedir.disabled = true;
            buttonDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })

    buttonDetener.addEventListener('click', () => {
        buttonPedir.disabled = true;
        buttonDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    buttonNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        inicializarJuego
    }

})();