class Colisao {
    #jogo;
    #seno;
    #cosseno;
    #catetoX;
    #catetoY;

    #hipotenusa;
    
    #invasaoCatetoX;
    #invasaoCatetoY;
    #invasaoHipotenusa;

    #elementoOrigem;
    #elementoDestino;

    constructor(jogo) {
        this.#jogo = jogo;
    }

    bloquearInterna(elementoOrigem, elementoDestino) {
        this.setarElementos(elementoOrigem, elementoDestino);
        
        if (this.verificarColisaoInterna()) this.bloquearElementoOrigem();
    }

    bloquearExterna(elementoOrigem, elementoDestino) {
        this.setarElementos(elementoOrigem, elementoDestino);
        
        if (this.verificarColisaoExterna()) this.bloquearElementoOrigem();
    }

    setarElementos(elementoOrigem, elementoDestino) {
        this.#elementoOrigem = elementoOrigem;
        this.#elementoDestino = elementoDestino;
    }

    verificarInterna(elementoOrigem, elementoDestino) {
        this.setarElementos(elementoOrigem, elementoDestino);
        return this.verificarColisaoInterna();
    }

    verificarExterna(elementoOrigem, elementoDestino) {
        this.setarElementos(elementoOrigem, elementoDestino);
        return this.verificarColisaoExterna();
    }

    verificarColisaoInterna() {
        this.processarCalculosColisao();

        const distanciaAtual = this.#hipotenusa + this.#elementoOrigem.metadeLargura;
        this.#invasaoHipotenusa = distanciaAtual - this.#elementoDestino.metadeLargura;
        const houveColisao = this.#invasaoHipotenusa >= 0;

        return houveColisao;
    }

    verificarColisaoExterna() {
        this.processarCalculosColisao();
        
        const somaRaio = this.#elementoOrigem.metadeLargura + this.#elementoDestino.metadeLargura;
        this.#invasaoHipotenusa = this.#hipotenusa - somaRaio; 
        const houveColisao = this.#invasaoHipotenusa < 0;

        return houveColisao;
    }

    processarCalculosColisao() {
        this.#catetoX = Math.abs(this.#elementoOrigem.centroX - this.#elementoDestino.centroX);
        this.#catetoY = Math.abs(this.#elementoOrigem.centroY - this.#elementoDestino.centroY);
        this.#hipotenusa = Math.hypot(this.#catetoX, this.#catetoY);

        this.#seno = this.#catetoX / this.#hipotenusa;
        this.#cosseno = this.#catetoY / this.#hipotenusa;
    }

    bloquearElementoOrigem() {
        this.processarCalculosBloqueio();   
        this.realizarBloqueioPosicaoX();
        this.realizarBloqueioPosicaoY();
    }

    processarCalculosBloqueio() {
        this.#invasaoCatetoX = this.#invasaoHipotenusa * this.#seno;
        this.#invasaoCatetoY = this.#invasaoHipotenusa * this.#cosseno;
    }

    realizarBloqueioPosicaoX() {
        const colisaoPelaEsquerda = this.#elementoOrigem.centroX < this.#elementoDestino.centroX;

        if (colisaoPelaEsquerda) {
            this.#elementoOrigem.posicaoX += this.#invasaoCatetoX;
            this.#jogo.movimentarContexto(-this.#invasaoCatetoX, 0);
        } else {
            this.#elementoOrigem.posicaoX -= this.#invasaoCatetoX;
            this.#jogo.movimentarContexto(this.#invasaoCatetoX, 0);
        }
    }

    realizarBloqueioPosicaoY() {
        const colisaoPorCima = this.#elementoOrigem.centroY < this.#elementoDestino.centroY;

        if (colisaoPorCima) {
            this.#elementoOrigem.posicaoY += this.#invasaoCatetoY;
            this.#jogo.movimentarContexto(0, -this.#invasaoCatetoY);
        } else {
            this.#elementoOrigem.posicaoY -= this.#invasaoCatetoY;
            this.#jogo.movimentarContexto(0, this.#invasaoCatetoY);
        }
    }
}

export default Colisao;