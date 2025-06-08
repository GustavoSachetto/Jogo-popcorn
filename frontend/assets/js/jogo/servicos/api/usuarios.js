import { API_ENDPOINT, MENSAGEM_ERRO } from "../api.js";

export const getTodosUsuarios = () => {
    const resultado = fetch(`${API_ENDPOINT}/usuarios`)
        .then(resposta => resposta.json())
        .catch(MENSAGEM_ERRO);

    return resultado;
}

export const postAdicionarOuBuscarUsuarios = (nome) => {
    const resultado = fetch(`${API_ENDPOINT}/usuarios`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome })
    }).then(resposta => resposta.json())
      .catch(MENSAGEM_ERRO);

    return resultado;
}