import Bola from "./bola.js";
import { VELOCIDADE } from "../../../configuracao.js";

class ConjuntoBolas {
    static #bolas = [];
    static #contagemId = 1;
    static dirececoesFixas = {
        hexagono: [
            { x:  0, y: -2 },
            { x:  1, y: -1 },
            { x:  2, y:  0 },
            { x:  1, y:  1 },
            { x:  0, y:  2 },
            { x: -1, y:  1 },
            { x: -2, y:  0 },
            { x: -1, y: -1 },
        ],
        hexagonoVirado: [
            { x: -0.5, y:  1.5 },
            { x:  0.5, y:  1.5 },
            { x:  1.5, y:  0.5 },
            { x:  1.5, y: -0.5 },
            { x:  0.5, y: -1.5 },
            { x: -0.5, y: -1.5 },
            { x: -1.5, y: -0.5 },
            { x: -1.5, y:  0.5 },
        ],
    };

    static pegarDirecoesAleatorias() {
        const maximo = 2;
        const minimo = 0;
        const gerarQuantidade = 2;
        const gerarValorAleatorio = () => (Math.random() * (maximo - minimo) + minimo).toFixed(2);
        
        let direcoes = []; 

        for (let contador = 0; contador < gerarQuantidade; contador++) {
            const valorAleatorioX = gerarValorAleatorio();
            const valorAleatorioY = gerarValorAleatorio();

            direcoes.push({ x:  valorAleatorioX, y:  valorAleatorioY });
            direcoes.push({ x:  valorAleatorioX, y: -valorAleatorioY });
            direcoes.push({ x: -valorAleatorioX, y:  valorAleatorioY });
            direcoes.push({ x: -valorAleatorioX, y: -valorAleatorioY });
        }

        return direcoes;
    }

    static pegarDirecaoJogador(jogador, manteiga) {
        const centroX = jogador.centroX > manteiga.centroX ? 1 : -1;
        const centroY = jogador.centroY > manteiga.centroY ? 1 : -1;

        return [
            { x: centroX, y: centroY },
            { x: centroX, y: centroY + 0.5 },
            { x: centroX + 0.5, y: centroY },
            { x: centroX + 0.5, y: centroY + 0.5 },
            { x: centroX, y: centroY + 1 },
            { x: centroX + 1, y: centroY },
            { x: centroX + 1, y: centroY + 1},
        ];
    }

    static gerarBolas(posicaoX, posicaoY, direcao, jogo) {        
        const tamanho = 30;

        ConjuntoBolas.#bolas = [];
        ConjuntoBolas.#contagemId = 1;

        direcao.forEach(direcao => {
            ConjuntoBolas.adicionarNovaBola(
                direcao.x * VELOCIDADE, 
                direcao.y * VELOCIDADE, 
                posicaoX, 
                posicaoY, 
                tamanho, 
                jogo
            );
            ConjuntoBolas.#contagemId++;
        });
    }

    static adicionarNovaBola(direcaoX, direcaoY, posicaoX, posicaoY, tamanho, jogo) {
        const bola = new Bola(posicaoX, posicaoY, tamanho, direcaoX, direcaoY, ConjuntoBolas.#contagemId, jogo);
        ConjuntoBolas.#bolas.push(bola);
    }

    static removerBola(bolaComparada) {
        let bolasFiltradas = [];
        
        ConjuntoBolas.#bolas.forEach((bola) => {
            if (bola.id != bolaComparada.id) bolasFiltradas.push(bola); 
        });

        ConjuntoBolas.#bolas = bolasFiltradas;
    }

    static atualizarConjuntoBolas(jogador, cenario) {
        if (ConjuntoBolas.#bolas.length > 0) {
            ConjuntoBolas.#bolas.forEach((bola) => 
                bola.atualizar(jogador, cenario)
            );
        }
    }

    static renderizarConjuntoBolas(contexto) {
        if (ConjuntoBolas.#bolas.length > 0) {
            ConjuntoBolas.#bolas.forEach((bola) => 
                bola.renderizar(contexto)
            );
        }
    }
}

export default ConjuntoBolas;