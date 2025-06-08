class Elemento {
    constructor(posicaoX, posicaoY, largura, altura) {
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.largura = largura;
        this.altura = altura;
        
        this.metadeLargura = this.largura / 2;
        this.metadeAltura = this.altura / 2;
    }

    get centroX() {
        return this.posicaoX + this.metadeLargura;
    }

    get centroY() {
        return this.posicaoY + this.metadeAltura;
    }
}

export default Elemento;