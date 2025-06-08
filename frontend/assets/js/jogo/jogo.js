class Jogo {
    #canvas;
    #jogador;
    #cenario;
    #monstro;
    #contexto;
    #iniciado;
    
    altura;
    largura;
    vitoria;
    emAndamento;
    temporizador;

    constructor(canvas, contexto, imagens, audios) {
        this.#canvas = canvas;
        this.#contexto = contexto;
        this.imagens = imagens;
        this.audios = audios;
    }

    set jogador(jogador) {
        this.#jogador = jogador;
    }

    set cenario(cenario) {
        this.#cenario = cenario;
    }

    set monstro(monstro) {
        this.#monstro = monstro;
    }

    get iniciado() {
        return this.#iniciado;
    }

    marcarComoIniciado() {
        this.#iniciado = true;
    }

    redimencionar() {
        this.largura = innerWidth > 500 ? 500 : innerWidth;
        this.altura = this.#canvas.getAttribute('height');
        this.#canvas.setAttribute('width', this.largura);
        
        if (this.emAndamento) this.#jogador.centralizar();
    }

    processarEventoTeclado(tecla, pressionado) {
        this.#jogador.movimentar(tecla, pressionado);      
    }

    atualizar() {
        if (this.emAndamento) {
            this.temporizador.atualizar();
            this.#monstro.atualizar(this.#jogador, this.#cenario);
            this.#jogador.atualizar(this.#cenario, this.#monstro);
        }
    }

    renderizar() {
        if (this.emAndamento) {
            this.limparContexto();
            this.temporizador.renderizar();
            this.#cenario.renderizar(this.#contexto);
            this.#monstro.renderizar(this.#contexto);
            this.#jogador.renderizar(this.#contexto);
        }
    }

    limparContexto() {
        const metadeLarguraCenario = this.#cenario.largura / 2;
        const metadeAlturaCenario = this.#cenario.altura / 2;

        this.#contexto.clearRect(
            -metadeLarguraCenario, 
            -metadeAlturaCenario, 
            this.#cenario.largura * 2, 
            this.#cenario.altura * 2
        );
    }

    movimentarContexto(posicaoX, posicaoY) {
        this.#contexto.translate(posicaoX, posicaoY);
    }
}

export default Jogo;