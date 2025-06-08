const client = require("./conexao");

async function pegarTodos() {
    const consulta = `
        SELECT INITCAP(usuarios.nome) as nome, ranqueamento.quantidade_vitorias 
            FROM ranqueamento INNER JOIN usuarios ON ranqueamento.id_usuario = usuarios.id 
            ORDER BY quantidade_vitorias DESC;
    `;

    return (await client.query(consulta)).rows;
}

async function pegarTresPrimeiros() {
    const consulta = `
        SELECT INITCAP(usuarios.nome) as nome, ranqueamento.quantidade_vitorias 
            FROM ranqueamento INNER JOIN usuarios ON ranqueamento.id_usuario = usuarios.id 
            WHERE ranqueamento.quantidade_vitorias > 0 ORDER BY quantidade_vitorias DESC LIMIT 3;
    `;

    return (await client.query(consulta)).rows;
}

module.exports = { pegarTodos, pegarTresPrimeiros };