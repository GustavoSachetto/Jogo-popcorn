import Colisao from "../sensores/colisao.js";
import Elemento from "../moldes/elemento.js";
import FinalizarJogo from "../eventos/finalizar-jogo.js";
import { VELOCIDADE } from "../configuracao.js";

class Jogador extends Elemento {
    #jogo;
    #colisoes = {};

    #vidasAtual = 2;
    #totalDeVidas = 2;
    #imagensPorRenderizacao = 10;
    #tempoAtualDeRenderizacao = 0;

    #posicaoAtualSprites = {};
    #posicaoAnimacaoSprites = [];
    #contagemPosicaoSprites = 0;

    #posicaoSprites = {
        cima: [
            {x: 0, y: 88},
            {x: 57, y: 85},
            {x: 120, y: 86},
            {x: 183, y: 95},
            {x: 246, y: 94},
            {x: 309, y: 93},
            {x: 366, y: 93},
            {x: 429, y: 95},
            {x: 492, y: 94},
            {x: 555, y: 95},
        ],
        baixo: [
            {x: 1, y: 0},
            {x: 64, y: 0},
            {x: 122, y: 0},
            {x: 185, y: 0},
            {x: 246, y: 0},
            {x: 309, y: 1},
            {x: 372, y: 3},
            {x: 435, y: 2},
            {x: 498, y: 4},
            {x: 561, y: 4},
        ],
        direita: [
            {x: 1, y: 169},
            {x: 64, y: 169},
            {x: 119, y: 169},
            {x: 177, y: 169},
            {x: 240, y: 172},
            {x: 302, y: 171},
            {x: 365, y: 170},
            {x: 428, y: 171},
            {x: 491, y: 171},
            {x: 554, y: 171},
        ],
        esquerda: [
            {x: 5, y: 248},
            {x: 59, y: 248},
            {x: 122, y: 248},
            {x: 185, y: 248},
            {x: 248, y: 248},
            {x: 312, y: 246},
            {x: 375, y: 248},
            {x: 437, y: 248},
            {x: 500, y: 246},
            {x: 563, y: 246},
        ],
        parado: [
            {x: 1, y: 333},
            {x: 64, y: 333},
            {x: 127, y: 333},
            {x: 190, y: 333},     
        ],
        perdeu: [
            {x: 360, y: 323, largura: 69, altura: 56},
        ],
    };

    #posicaoSpritesVida = {
        com: {x: 295, y: 350}, 
        sem: {x: 256, y: 350}, 
    }

    #movimentando = {
        cima: false,
        baixo: false,
        direita: false,
        esquerda: false,
    };

    #permiteMovimentacao = true;

    constructor(posicaoX, posicaoY, jogo) {
        const largura = 40;
        const altura = 58;

        super(posicaoX, posicaoY, largura, altura);
        this.#jogo = jogo;
        this.centralizar();
        
        this.#colisoes = {
            cenario: new Colisao(this.#jogo),
            monstro: new Colisao(this.#jogo),
        };
    }

    centralizar() {
        this.posicaoX = this.#jogo.largura / 2 - this.largura / 2;
        this.posicaoY = this.#jogo.altura / 2 - this.altura / 2;
    }

    movimentar(tecla, movimento) {
        switch (tecla) {
            case 'w':
            case 'ArrowUp':
                this.#movimentando.cima = movimento;
                break;
            case 's':
            case 'ArrowDown':
                this.#movimentando.baixo = movimento;
                break;
            case 'd':
            case 'ArrowRight':
                this.#movimentando.direita = movimento;
                break;
            case 'a':
            case 'ArrowLeft':
                this.#movimentando.esquerda = movimento;
                break;
        }
    }

    perderVida() {
        if (this.#vidasAtual > 0) this.#vidasAtual--;
        
        if (this.#vidasAtual == 0) {
            this.perderJogo();
            return new FinalizarJogo(this.#jogo);
        }
    }

    perderJogo() {
        this.#jogo.audios.perdeu.play();
        this.#permiteMovimentacao = false;
        this.#posicaoAnimacaoSprites = this.#posicaoSprites.perdeu;
        this.#posicaoAtualSprites = this.#posicaoAnimacaoSprites[0];
        this.largura = this.#posicaoSprites.perdeu[0].largura;
        this.altura = this.#posicaoSprites.perdeu[0].altura;
    }

    atualizar(cenario, monstro) {
        if (this.#permiteMovimentacao) {
            this.verificarMovimentoCima();
            this.verificarMovimentoBaixo();
            this.verificarMovimentoDireita();
            this.verificarMovimentoEsquerda();
        }

        this.verificarColisaoComElementos(cenario, monstro);
    }

    verificarMovimentoCima() {
        if (this.#movimentando.cima && !this.#movimentando.baixo) {
            this.posicaoY -= VELOCIDADE;
            this.#jogo.movimentarContexto(0, VELOCIDADE);
            this.#posicaoAnimacaoSprites = this.#posicaoSprites.cima;
        } 
    }

    verificarMovimentoBaixo() {
        if (this.#movimentando.baixo && !this.#movimentando.cima) {
            this.posicaoY += VELOCIDADE;
            this.#jogo.movimentarContexto(0, -VELOCIDADE);
            this.#posicaoAnimacaoSprites = this.#posicaoSprites.baixo;
        }
    }
    
    verificarMovimentoDireita() {
        if (this.#movimentando.direita && !this.#movimentando.esquerda) {
            this.posicaoX += VELOCIDADE;
            this.#jogo.movimentarContexto(-VELOCIDADE, 0);
            this.#posicaoAnimacaoSprites = this.#posicaoSprites.direita;
        }
    }
    
    verificarMovimentoEsquerda() {
        if (this.#movimentando.esquerda && !this.#movimentando.direita) {
            this.posicaoX -= VELOCIDADE;
            this.#jogo.movimentarContexto(VELOCIDADE, 0);
            this.#posicaoAnimacaoSprites = this.#posicaoSprites.esquerda;
        }
    }

    verificarColisaoComElementos(cenario, monstro) {
        this.#colisoes.cenario.bloquearInterna(this, cenario);
        this.#colisoes.monstro.bloquearExterna(this, monstro);
    }

    renderizar(contexto) {
        this.animar();
        this.processarTempoDeRenderizacao();
        this.renderizarTodasVidas(contexto);

        contexto.drawImage(
            this.#jogo.imagens.jogador,
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

    renderizarTodasVidas(contexto) {
        const largura = 32;
        const altura = 25;
        const cantoTelaX = this.centroX - this.#jogo.largura / 2;
        const cantoTelaY = this.centroY - this.#jogo.altura / 2;

        let espacoEntre = 0;
        let sprite = this.#posicaoSpritesVida.com;

        for (let contador = 0; contador < this.#totalDeVidas; contador++) {
            const semVidas = contador - this.#vidasAtual >= 0;
            const posicaoX = cantoTelaX + largura * contador + espacoEntre;

            if (semVidas) sprite = this.#posicaoSpritesVida.sem;
            
            this.renderizarUnicaVida(posicaoX, cantoTelaY, largura, altura, sprite, contexto);
            espacoEntre += 2;
        }
    }

    renderizarUnicaVida(posicaoX, cantoTelaY, largura, altura, sprite, contexto) {
        const margemSobreTela = 20;

        contexto.drawImage(
            this.#jogo.imagens.jogador,
            sprite.x,
            sprite.y,
            largura,
            altura,
            posicaoX + margemSobreTela,
            cantoTelaY + margemSobreTela,
            largura,
            altura
        );
    }

    processarTempoDeRenderizacao() {
        if (this.#tempoAtualDeRenderizacao == 60) this.#tempoAtualDeRenderizacao = 0;
        this.#tempoAtualDeRenderizacao += this.#imagensPorRenderizacao;
    }

    animar() {
        this.animarJogadorParado();

        if (this.#tempoAtualDeRenderizacao == 60) {
            const posicaoSpriteExiste = this.#contagemPosicaoSprites < this.#posicaoAnimacaoSprites.length - 1;
            this.#contagemPosicaoSprites = posicaoSpriteExiste ? this.#contagemPosicaoSprites + 1 : 0;
            this.#posicaoAtualSprites = this.#posicaoAnimacaoSprites[this.#contagemPosicaoSprites];   
        }
    }

    animarJogadorParado() {
        const jogadorNaoEstaEmMovimento = 
            !this.#movimentando.cima && 
            !this.#movimentando.baixo &&
            !this.#movimentando.direita && 
            !this.#movimentando.esquerda;
        
        if (jogadorNaoEstaEmMovimento && this.#vidasAtual > 0) {
            this.#posicaoAnimacaoSprites = this.#posicaoSprites.parado;
        }
    }
}

export default Jogador;