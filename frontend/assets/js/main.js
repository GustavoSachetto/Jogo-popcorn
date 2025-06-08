import Jogo from "./jogo/jogo.js";
import TelaFinal from "./telas/tela-final.js";
import TelaInicio from "./telas/tela-inicio.js";
import PreparaRecurso from "./jogo/utilitarios/prepara-recurso.js";
import { imagens, audios } from "./jogo/recursos.js";

PreparaRecurso.verificarTodosRecursosCarregados(carregarJogo());

function carregarJogo() {
    const canvas = document.getElementById('jogo');
    const contexto = canvas.getContext('2d');
    const jogo = new Jogo(canvas, contexto, imagens, audios);
    
    const telaInicio = new TelaInicio(jogo);
    const telaFinal = new TelaFinal(jogo);
    
    window.onresize = () => jogo.redimencionar();
    document.onkeyup = (event) => manipularEventoTeclado(event.key, false);
    document.onkeydown = (event) => manipularEventoTeclado(event.key, true);

    function manipularEventoTeclado(tecla, pressionado) {
        if (!jogo.iniciado) {
            telaInicio.processarEventoTeclado(tecla, pressionado)
        } else {
            telaFinal.manipularEventoBotaoClicado();
            telaFinal.processarEventoTeclado(tecla, pressionado);
        }
    }
    
    function loop() {
        jogo.atualizar();
        jogo.renderizar();
    
        requestAnimationFrame(loop, canvas);
    }
    
    requestAnimationFrame(loop, canvas);    
}