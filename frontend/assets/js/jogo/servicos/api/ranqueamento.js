import { API_ENDPOINT, MENSAGEM_ERRO } from "../api.js";

export const getTresPrimeirosRanqueamento = () => {
    const resultado = fetch(`${API_ENDPOINT}/ranqueamento/tres-melhores`)
        .then(resposta => resposta.json())
        .catch(MENSAGEM_ERRO);

    return resultado;
}