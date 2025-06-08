import TelaFinal from "../../telas/tela-final.js";

class FinalizarJogo {
    #jogo;
    #delayMostrarTela = 1000;

    constructor(jogo) {
        this.#jogo = jogo;
        this.#jogo.temporizador.parar();
        this.#jogo.audios.cenario.pause();

        setTimeout(() => this.mostrarTelaFinal(), this.#delayMostrarTela);
    }
    
    mostrarTelaFinal() {
        this.#jogo.emAndamento = false;
        this.#jogo.temporizador.ocultar();
        
        TelaFinal.mostrar(this.#jogo.vitoria);
    }
}

export default FinalizarJogo;