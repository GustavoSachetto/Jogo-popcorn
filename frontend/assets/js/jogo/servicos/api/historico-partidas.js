import { API_ENDPOINT, MENSAGEM_ERRO } from "../api.js";

export const postAdicionarHistoricoPartidas = (id_usuario, usuario_venceu, tempo_jogo) => {
    const resultado = fetch(`${API_ENDPOINT}/historico-partidas`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id_usuario, usuario_venceu, tempo_jogo })
    }).then(resposta => resposta.json())
      .catch(MENSAGEM_ERRO);

    return resultado;
}