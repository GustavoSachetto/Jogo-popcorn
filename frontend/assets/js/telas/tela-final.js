import IniciarJogo from "../jogo/eventos/iniciar-jogo.js";
import { getTresPrimeirosRanqueamento } from "../jogo/servicos/api/ranqueamento.js";
import { postAdicionarOuBuscarUsuarios } from "../jogo/servicos/api/usuarios.js";
import { postAdicionarHistoricoPartidas } from "../jogo/servicos/api/historico-partidas.js";

class TelaFinal {
    #jogo;
    #tela;
    #modal;
    #navegacao;
    #modalAtivo = false;
    #elementoSelecionado;
    
    static #partidaAtualizada = false;

    constructor(jogo) {
        this.#jogo = jogo;
        this.#tela = document.getElementById('telaFinal'); 
        this.#elementoSelecionado = document.getElementById('botaoRecomecar');
    }

    manipularEventoBotaoClicado() {
        const botoes = document.querySelectorAll('.tela__botao');

        botoes.forEach((botao) => {
            botao.onclick = () => this.processarAcaoBotao(botao.id);
            botao.onmouseenter = () => this.manipularMouseEnterBotao(botoes);
        });
    }

    manipularMouseEnterBotao(botoes) {
        this.iniciarAudioBotaoSelecionado();
        botoes.forEach((botao) => botao.classList.remove('tela__botao--selecionado'));
    }

    processarEventoTeclado(tecla, pressionado) {
        if (this.#jogo.emAndamento) {
            this.#jogo.processarEventoTeclado(tecla, pressionado);
        } else if (pressionado) {
            this.processarCursorNavegacao();
            this.navegarComTeclado(tecla);
        } 
    }

    processarCursorNavegacao() {
        this.#navegacao = this.#modalAtivo 
            ? this.#modal.querySelectorAll('.tela__botao')
            : document.getElementById('navegacaoFinal').querySelectorAll('.tela__botao');
    }

    navegarComTeclado(tecla) {
        this.#elementoSelecionado.classList.remove('tela__botao--selecionado');

        switch (tecla) {
            case 'w':
            case 'ArrowUp':
            case 'ArrowLeft':
                this.iniciarAudioBotaoSelecionado();
                this.selecionarElementoAnterior();
                break;
            case 's':
            case 'ArrowDown':
            case 'ArrowRight':
                this.iniciarAudioBotaoSelecionado();
                this.selecionarElementoPosterior();
                break;
            case 'Enter':
                this.manipularBotaoPressionado();
                break;
        }

        this.verificarElementoSelecionado();
        this.#elementoSelecionado.classList.add('tela__botao--selecionado');
    }

    selecionarElementoAnterior() {
        this.#elementoSelecionado = this.#elementoSelecionado.previousElementSibling;
        if (!this.#elementoSelecionado) this.#elementoSelecionado =  this.#navegacao[this.#navegacao.length - 1];   
    }

    selecionarElementoPosterior() {
        this.#elementoSelecionado = this.#elementoSelecionado.nextElementSibling;
        if (!this.#elementoSelecionado) this.#elementoSelecionado = this.#navegacao[0];
    }

    manipularBotaoPressionado() {
        const botaoPressionado = this.#elementoSelecionado.id;
        this.processarAcaoBotao(botaoPressionado);
    }

    async processarAcaoBotao(botaoId) {
        switch (botaoId) {
            case 'botaoRecomecar':
                await this.atualizarPlacarDoJogador();
                this.#jogo.audios.botaoComecar.play();
                this.#tela.classList.remove('mostrar');
                return new IniciarJogo(this.#jogo);

            case 'botaoPlacarFinal':
                await this.atualizarPlacarDoJogador();
                this.carregarDadosPlacar();
                return this.exibirModal('modalPlacar');
            
            case 'botaoVoltarPlacar':
                return this.fecharModal();
        }
    }

    async atualizarPlacarDoJogador() {
        const telaInput = this.#tela.querySelector('.tela__input');
        const haTextoNoInput = (telaInput.value.trim()).length > 0;

        if (haTextoNoInput && !TelaFinal.#partidaAtualizada) {
            const resultado = await postAdicionarOuBuscarUsuarios(telaInput.value);
            
            await postAdicionarHistoricoPartidas(
                resultado.id_usuario,
                this.#jogo.vitoria,
                this.#jogo.temporizador.tempoEmSegundos,
            );

            TelaFinal.#partidaAtualizada = true;
        }
    }

    async carregarDadosPlacar() {
        const placar = document.querySelector('.tela__placar');
        const resultado = await getTresPrimeirosRanqueamento();
        const ranqueamento = resultado.resultado;

        placar.innerHTML = '';
        ranqueamento.forEach(({ nome, quantidade_vitorias }) => 
            placar.appendChild(
                this.criarComponenteItemPlacar(nome, quantidade_vitorias)
            )
        );
    }

    criarComponenteItemPlacar(nome, quantidade_vitorias) {
        const item = document.createElement('li');

        item.classList.add('tela__placar--item');
        item.innerHTML = `
            <span class="tela__placar--item--nome">${nome}</span>
            <span class="tela__placar--item--vitorias">${quantidade_vitorias}</span>
        `;
        
        return item;
    }
    
    exibirModal(modalId) {
        this.#modalAtivo = true;
        this.iniciarAudioBotaoClique();
        this.#modal = document.getElementById(modalId);
        this.#elementoSelecionado = this.#modal.querySelector('.tela__botao--voltar');
        this.#modal.classList.add('mostrar');
    }

    fecharModal() {
        this.#modalAtivo = false;
        this.iniciarAudioBotaoClique();
        this.#elementoSelecionado = this.#tela.querySelector('.tela__botao');
        this.#modal.classList.remove('mostrar');
    }

    iniciarAudioBotaoClique() {
        this.#jogo.audios.botaoClique.currentTime = 0;
        this.#jogo.audios.botaoClique.play();
    }

    iniciarAudioBotaoSelecionado() {
        this.#jogo.audios.botaoSelecionado.currentTime = 0;
        this.#jogo.audios.botaoSelecionado.play();
    }

    verificarElementoSelecionado() {
        if (!this.#elementoSelecionado.classList.contains('tela__botao')) {
            this.#elementoSelecionado = this.#navegacao[0];
        }
    }

    static mostrar(vitoria) {
        TelaFinal.#partidaAtualizada = false;
        TelaFinal.setarMensagemResultadoDoJogo(vitoria);

        document.getElementById('telaFinal').classList.add('mostrar');
    }

    static setarMensagemResultadoDoJogo(vitoria) {
        document.getElementById('mensagemResultado').innerHTML = vitoria
            ? 'Parabéns você ganhou!' 
            : 'Que tal tentar de novo?';
    }
}

export default TelaFinal;