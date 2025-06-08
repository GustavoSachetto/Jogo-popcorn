SELECT * FROM usuarios;

SELECT * FROM historico_partidas;

SELECT * FROM ranqueamento;

-- Consulta os dados da partida com o nome dos usuários.
SELECT historico_partidas.id, historico_partidas.id_usuario, historico_partidas.usuario_venceu, historico_partidas.tempo_jogo, usuarios.nome 
    FROM historico_partidas INNER JOIN usuarios ON historico_partidas.id_usuario = usuarios.id;

-- Consulta a quantidade de vitórias acumuladas dos jogadores com base em seu historico de partidas.
SELECT id_usuario, usuario_venceu, COUNT(CASE WHEN usuario_venceu THEN id_usuario END) AS quantidade_vitorias 
    FROM historico_partidas GROUP BY (id_usuario, usuario_venceu) ORDER BY id_usuario;

-- Consulta a quantidade de vitórias acumuladas do jogador com base no seu historico de partidas.
SELECT id_usuario, COUNT(CASE WHEN usuario_venceu THEN id_usuario END) AS quantidade_vitorias 
    FROM historico_partidas WHERE id_usuario = 1 GROUP BY (id_usuario, usuario_venceu);

-- Consulta o nome e quantidade de vitorias dos 3 primeiros jogadores no ranqueamento que venceram o jogo.
SELECT INITCAP(usuarios.nome) as nome, ranqueamento.quantidade_vitorias 
    FROM ranqueamento INNER JOIN usuarios ON ranqueamento.id_usuario = usuarios.id 
    WHERE ranqueamento.quantidade_vitorias > 0 ORDER BY quantidade_vitorias DESC LIMIT 3;