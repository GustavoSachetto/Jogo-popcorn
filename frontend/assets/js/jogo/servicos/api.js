export const API_ENDPOINT = 'http://localhost:3000/v1';
export const MENSAGEM_ERRO = 'Infelizmente, ocorreu um erro em nossa API, estamos corrigindo e em breve o serviço estará disponível!';

export const getDetalhes = () => {
    const resultado = fetch(`${API_ENDPOINT}/`)
        .then(resposta => resposta.json())
        .catch(MENSAGEM_ERRO);

    return resultado;
}