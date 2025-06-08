import PreparaRecurso from "../jogo/utilitarios/prepara-recurso.js";

const caminhosImagens = {
    calor: '/assets/img/calor.png',
    cenario: '/assets/img/cenario.png',
    jogador: '/assets/img/jogador.png',
    manteiga: '/assets/img/monstros/manteiga.png',
    bolaManteiga: '/assets/img/monstros/bola-manteiga.png',
}

const caminhosAudios = {
    ganhou:'/assets/audio/jogador/ganhou.mp3',
    perdeu:'/assets/audio/jogador/perdeu.mp3',
    cenario: '/assets/audio/cenario.mp3',
    ataqueBolas: '/assets/audio/ataque-bolas.mp3',
    botaoClique: '/assets/audio/tela/botao-clique.mp3',
    botaoComecar: '/assets/audio/tela/botao-comecar.mp3',
    botaoSelecionado: '/assets/audio/tela/botao-selecionado.mp3',
}

const prepararImagens = new PreparaRecurso(caminhosImagens);
prepararImagens.carregarTodos(Image);

const prepararAudios = new PreparaRecurso(caminhosAudios);
prepararAudios.carregarTodos(Audio);

export const imagens = prepararImagens.recursos;
export const audios = prepararAudios.recursos;