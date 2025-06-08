const { pegarTodos, adicionar } = require("../../models/historico-partidas");

const get = async (request, response) => {
    const resultado = await pegarTodos();

    response.status(200).send({
        mensagem: 'Historico de partidas buscados',
        resultado: resultado,
    });
};

const post = async (request, response) => {
    await adicionar(request.body.id_usuario, request.body.usuario_venceu, request.body.tempo_jogo);

    response.status(201).send({
        mensagem: 'Historico de partida criada',
    });
};

module.exports = { get, post };
