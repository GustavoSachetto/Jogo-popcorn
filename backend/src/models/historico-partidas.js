const client = require("./conexao");

async function pegarTodos() {
    const consulta = `
        SELECT historico_partidas.id, 
               historico_partidas.id_usuario, 
               historico_partidas.usuario_venceu, 
               historico_partidas.tempo_jogo, 
               usuarios.nome 
        FROM historico_partidas INNER JOIN usuarios ON historico_partidas.id_usuario = usuarios.id;
    `;
    return (await client.query(consulta)).rows;
}

async function adicionar(id_usuario, usuario_venceu, tempo_jogo) {
    const insert = `
        INSERT INTO historico_partidas (id_usuario, usuario_venceu, tempo_jogo) 
            VALUES (${id_usuario}, ${usuario_venceu}, ${tempo_jogo});
    `;

    return (await (client.query(insert))).rows;
}

module.exports = { pegarTodos, adicionar };