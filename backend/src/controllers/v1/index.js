const get = async (request, response) => {
    response.status(200).send({
        versao: '1.0',
        titulo: 'Jogo Popcorn API',
        autor: 'Gustavo Sachetto da Cruz',
    });
};

module.exports = { get };