import Cenario from "../elementos/cenario.js";
import Jogador from "../elementos/jogador.js";
import Manteiga from "../elementos/monstros/manteiga/manteiga.js";
import Temporizador from "../sensores/temporizador.js";

class IniciarJogo {
    #jogo;
    #tamanhoCenario = 1200;
    
    constructor(jogo) {
        this.#jogo = jogo;
        this.#jogo.redimencionar();
        this.#jogo.marcarComoIniciado();

        this.iniciarJogador();
        this.iniciarCenario();
        this.iniciarMonstro();
        this.iniciarTemporizador();

        this.iniciarJogo();
    }

    iniciarMonstro() {
        const largura = 227;
        const altura = 192;
        const posicaoX = this.#tamanhoCenario / 2 - largura / 2;
        const posicaoY = this.#tamanhoCenario / 2 - altura / 2;

        this.#jogo.monstro = new Manteiga(posicaoX, posicaoY, largura, altura, this.#jogo); 
    }

    iniciarJogador() {
        const posicaoX = 0;
        const posicaoY = 0;

        this.#jogo.jogador = new Jogador(posicaoX, posicaoY, this.#jogo);
    }

    iniciarCenario() {
        this.#jogo.cenario = new Cenario(this.#tamanhoCenario, this.#jogo);   
    }

    iniciarTemporizador() {
        this.#jogo.temporizador = new Temporizador(this.#jogo);
    }

    iniciarJogo() {
        this.#jogo.vitoria = false;
        this.#jogo.emAndamento = true;
        this.#jogo.audios.cenario.currentTime = 0;
        this.#jogo.audios.cenario.play();
    }
}

export default IniciarJogo;