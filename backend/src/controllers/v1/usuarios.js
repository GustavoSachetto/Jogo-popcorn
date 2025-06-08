const { pegarTodos, adicionar } = require("../../models/usuarios");

const get = async (request, response) => {
    const resultado = await pegarTodos();

    response.status(200).send({
        mensagem: 'Usuários buscados',
        resultado: resultado,
    });
};

const post = async (request, response) => {
    const resultado = await adicionar(request.body.nome);

    response.status(201).send({
        mensagem: 'Usuário criado',
        id_usuario: resultado[0].adicionar_usuario,
    });
};

module.exports = { get, post };
