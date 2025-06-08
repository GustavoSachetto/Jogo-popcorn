const client = require("./conexao");

async function pegarTodos() {
    const consulta = `SELECT * FROM usuarios`;
    return (await client.query(consulta)).rows;
}

async function adicionar(nome) {
    const insert = `SELECT * FROM adicionar_usuario('${nome}');`
    return (await (client.query(insert))).rows;
}

module.exports = { pegarTodos, adicionar };