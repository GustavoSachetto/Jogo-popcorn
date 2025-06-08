INSERT INTO usuarios (nome) VALUES
('eduardo josé da cruz'),
('gustavo sachetto da cruz'),
('fernanda sachetto da cruz');

INSERT INTO historico_partidas (id_usuario, usuario_venceu, tempo_jogo) VALUES
(1, true, 60),
(2, true, 60),
(2, true, 60),
(3, false, 34);

-- Insere usuário (se não existir) e retorna o id.
SELECT * FROM adicionar_usuario('Gustavo Sachetto da Cruz');