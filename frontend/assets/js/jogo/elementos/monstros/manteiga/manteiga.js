import Elemento from "../../../moldes/elemento.js";
import ManipuladorArray from "../../../utilitarios/manipulador-array.js";
import ConjuntoBolas from "./conjunto-bolas.js";

class Manteiga extends Elemento {
    #jogo;

    #imagensPorRenderizacao = 4;
    #tempoAtualDeRenderizacao = 0;

    #tempoAtualEmSegundos = 0;
    #tempoParaAtacarEmSegundos = 2;

    #quantidadeDeAtaquesPossiveis = 4;
    #sequenciaDeAtaques = [];

    #posicaoAtualSprites = {};
    #posicaoAnimacaoSprites = [];
    #contagemPosicaoSprites = 0;

    constructor(posicaoX, posicaoY, largura, altura, jogo) {
        super(posicaoX, posicaoY, largura, altura);   
        this.#jogo = jogo;
    }

    #posicaoSprites = {
        atacar: [
            {x: 0, y: 0},
            {x: 269, y: 0},
            {x: 541, y: 0},
            {x: 813, y: 0},
            {x: 1082, y: 0},
            {x: 1354, y: 0},
            {x: 1626, y: 0},
            {x: 1895, y: 0},
            {x: 2154, y: 0},
        ], 
        parado: [
            {x: 10, y: 204},
            {x: 258, y: 204},
            {x: 516, y: 204},
            {x: 773, y: 204},
            {x: 1026, y: 204},
            {x: 1282, y: 204},
        ],
    }

    atualizar(jogador, cenario) {
        this.processarTempoDeAtaque(jogador);
        ConjuntoBolas.atualizarConjuntoBolas(jogador, cenario);
    }

    processarTempoDeAtaque(jogador) {
        if (this.#tempoAtualEmSegundos == this.#posicaoSprites.atacar.length) {
            this.#tempoAtualEmSegundos = 0;
            this.atacarBolasDeManteiga(jogador);
        }
    }

    atacarBolasDeManteiga(jogador) {
        const direcao = this.pegarDirecaoDoAtaqueAleatorio(jogador);
        ConjuntoBolas.gerarBolas(this.centroX, this.centroY, direcao, this.#jogo);
        this.#jogo.audios.ataqueBolas.play();
    }

    pegarDirecaoDoAtaqueAleatorio(jogador) {
        if (this.#sequenciaDeAtaques.length == 0) {
            this.#sequenciaDeAtaques = ManipuladorArray.embaralhar(
                ManipuladorArray.gerar(this.#quantidadeDeAtaquesPossiveis
            ));
        }
        
        return this.processarAtaque(this.#sequenciaDeAtaques.shift(), jogador);
    }

    processarAtaque(ataque, jogador) {
        switch (ataque) {
            case 1:
                return ConjuntoBolas.dirececoesFixas.hexagono;
            case 2:
                return ConjuntoBolas.dirececoesFixas.hexagonoVirado;
            case 3:
                return ConjuntoBolas.pegarDirecoesAleatorias();
            case 4:
                return ConjuntoBolas.pegarDirecaoJogador(jogador, this);
        }
    }

    renderizar(contexto) {
        this.animar();
        this.processarTempoDeRenderizacao();

        ConjuntoBolas.renderizarConjuntoBolas(contexto);

        contexto.drawImage(
            this.#jogo.imagens.manteiga,
            this.#posicaoAtualSprites.x,
            this.#posicaoAtualSprites.y,
            this.largura,
            this.altura,
            this.posicaoX,
            this.posicaoY,
            this.largura,
            this.altura
        );
    }

    processarTempoDeRenderizacao() {
        if (this.#tempoAtualDeRenderizacao == 60) this.#tempoAtualDeRenderizacao = 0;
        this.#tempoAtualDeRenderizacao += this.#imagensPorRenderizacao;
    }

    animar() {
        if (this.#tempoAtualDeRenderizacao == 60) {
            this.#tempoAtualEmSegundos++;
            const posicaoSpriteExiste = this.#contagemPosicaoSprites < this.#posicaoAnimacaoSprites.length - 1;
            this.#contagemPosicaoSprites = posicaoSpriteExiste ? this.#contagemPosicaoSprites + 1 : 0;
            this.#posicaoAtualSprites = this.#posicaoAnimacaoSprites[this.#contagemPosicaoSprites];   
        }

        this.#tempoAtualEmSegundos > this.#tempoParaAtacarEmSegundos
            ? this.animarManteigaAtacar()
            : this.animarManteigaParada();
    }

    animarManteigaAtacar() {
        this.#posicaoAnimacaoSprites = this.#posicaoSprites.atacar;
    }

    animarManteigaParada() {
        this.#posicaoAnimacaoSprites = this.#posicaoSprites.parado;
    }
}

export default Manteiga;