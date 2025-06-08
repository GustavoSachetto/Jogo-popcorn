const { pegarTodos, pegarTresPrimeiros } = require("../../models/ranqueamento");

const get = async (request, response) => {
    const resultado = await pegarTodos();

    response.status(200).send({
        mensagem: 'Ranqueamento buscado',
        resultado: resultado,
    });
};

const getThree = async (request, response) => {
    const resultado = await pegarTresPrimeiros();

    response.status(200).send({
        mensagem: 'Ranqueamento buscado',
        resultado: resultado,
    });
};

module.exports = { get, getThree };
