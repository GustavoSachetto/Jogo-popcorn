import Elemento from "../moldes/elemento.js";

class Cenario extends Elemento {
    #jogo;
    #pulsacaoDoCalor = 6;
    #tamanhoAtualDoCalor = 1800;
    #tempoAtualDeRenderizacao = 0;
    #tempoDeRedenrizacaoCalor = 1;
    #espacoExtraParaColisaoInterna = 80;

    constructor(tamanho, jogo) {
        const posicaoX = 0;
        const posicaoY = 0;

        super(posicaoX, posicaoY, tamanho, tamanho);
        this.#jogo = jogo;
    }

    renderizar(contexto) {    
        this.animarCalor();
        this.renderizarCalor(contexto);
        this.processarTempoDeRenderizacao();

        contexto.drawImage(
            this.#jogo.imagens.cenario, 
            this.posicaoX - this.#espacoExtraParaColisaoInterna, 
            this.posicaoY - this.#espacoExtraParaColisaoInterna, 
            this.largura + this.#espacoExtraParaColisaoInterna * 2, 
            this.altura + this.#espacoExtraParaColisaoInterna * 2
        );
    }

    animarCalor() {
        if (this.#tempoAtualDeRenderizacao == 60) this.#pulsacaoDoCalor *= -1;
        this.#tamanhoAtualDoCalor += this.#pulsacaoDoCalor;
    }

    renderizarCalor(contexto) {
        const metadeDiferencaTamanho = (this.#tamanhoAtualDoCalor - this.largura) / 2;

        contexto.drawImage(
            this.#jogo.imagens.calor, 
            this.posicaoX - metadeDiferencaTamanho, 
            this.posicaoY - metadeDiferencaTamanho, 
            this.#tamanhoAtualDoCalor,
            this.#tamanhoAtualDoCalor,
        );
    }

    processarTempoDeRenderizacao() {
        if (this.#tempoAtualDeRenderizacao == 60) this.#tempoAtualDeRenderizacao = 0;
        this.#tempoAtualDeRenderizacao += this.#tempoDeRedenrizacaoCalor;
    }
}

export default Cenario;