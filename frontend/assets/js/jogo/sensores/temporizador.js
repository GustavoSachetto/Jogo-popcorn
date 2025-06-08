import FinalizarJogo from "../eventos/finalizar-jogo.js";

class Temporizador {
    #jogo;
    #tempo = 0;
    #parado = false;
    #tempoEmSegundos = 0;
    #tempoTotalEmSegundos = 60;
    
    #telaTemporizador;
    #telaCaixaTemporizador;

    constructor(jogo) {
        this.#jogo = jogo;
        this.#telaTemporizador = document.getElementById('temporizador');
        this.#telaCaixaTemporizador = this.#telaTemporizador.querySelector('.temporizador__caixa__tempo');
        this.mostrar();
    }

    get tempoEmSegundos() {
        return this.#tempoEmSegundos;
    }

    parar() {
        this.#parado = true;
    }

    mostrar() {
        this.#telaTemporizador.classList.add('mostrar');
        this.#telaCaixaTemporizador.classList.remove('temporizador__caixa__tempo--piscar');
    }

    ocultar() {
        this.#telaTemporizador.classList.remove('mostrar');
    }

    atualizar() {
        if (this.#parado) return;

        this.verificarZerado();

        if (this.#tempo == 60) {
            this.#tempoTotalEmSegundos--;
            this.#tempoEmSegundos++;
            this.#tempo = 0;
        }

        this.#tempo++;
    }

    verificarZerado() {
        if (this.#tempoTotalEmSegundos == 0) {
            this.#jogo.vitoria = true;  
            this.#jogo.audios.ganhou.play();   
            return new FinalizarJogo(this.#jogo);
        }
    }

    renderizar() {
        let tempoEmSegundosFormatado = this.#tempoTotalEmSegundos;

        if (this.#tempoTotalEmSegundos < 10) {
            this.#telaCaixaTemporizador.classList.add('temporizador__caixa__tempo--piscar');
            tempoEmSegundosFormatado = '0' + tempoEmSegundosFormatado.toString();
        }
        
        this.#telaTemporizador.querySelector('#tempoEmMinutos').innerHTML = `0:${tempoEmSegundosFormatado}`;
    }
}

export default Temporizador;