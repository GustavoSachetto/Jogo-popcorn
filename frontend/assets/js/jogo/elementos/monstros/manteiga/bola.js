import Elemento from "../../../moldes/elemento.js";
import Colisao from "../../../sensores/colisao.js";
import ConjuntoBolas from "./conjunto-bolas.js";

class Bola extends Elemento {
    #jogo;
    #direcaoX;
    #direcaoY;
    #colisoes = {};

    constructor(posicaoX, posicaoY, tamanho, direcaoX, direcaoY, id, jogo) {
        super(posicaoX, posicaoY, tamanho, tamanho);
        this.#jogo = jogo;
        this.#direcaoX = direcaoX;
        this.#direcaoY = direcaoY;
        this.#colisoes = {
            jogador: new Colisao(this.#jogo),
            cenario: new Colisao(this.#jogo),
        };

        this.id = id;
    }

    atualizar(jogador, cenario) {
        this.movimentar();
        this.verificarColisaoComJogador(jogador);
        this.verificarColisaoComCenario(cenario);
    }

    verificarColisaoComCenario(cenario) {
        const houveColisao = this.#colisoes.cenario.verificarInterna(this, cenario);
        if (houveColisao) ConjuntoBolas.removerBola(this);
    }

    verificarColisaoComJogador(jogador) {
        const houveColisao = this.#colisoes.jogador.verificarExterna(this, jogador);
        if (houveColisao) this.manipularColisaoComJogador(jogador);
    }

    manipularColisaoComJogador(jogador) {
        ConjuntoBolas.removerBola(this);
        jogador.perderVida();
    }

    movimentar() {
        this.posicaoX += this.#direcaoX;
        this.posicaoY += this.#direcaoY;
    }

    renderizar(contexto) {
        contexto.drawImage(this.#jogo.imagens.bolaManteiga, this.posicaoX, this.posicaoY, this.largura, this.altura);
    }
}

export default Bola;