CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(60) NOT NULL UNIQUE
); 

CREATE TABLE IF NOT EXISTS historico_partidas (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    usuario_venceu BOOLEAN NOT NULL,
    tempo_jogo SMALLINT NOT NULL CHECK (tempo_jogo >= 0 AND tempo_jogo <= 60),
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS ranqueamento (
    id SERIAL PRIMARY KEY,
    id_usuario INTEGER NOT NULL UNIQUE,
    quantidade_vitorias SMALLINT NOT NULL,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Função para adicionar um novo usuário (se ele não existir) e retornar o seu id.  
CREATE OR REPLACE FUNCTION adicionar_usuario(nome VARCHAR(60)) RETURNS INTEGER AS $$
    BEGIN
        PERFORM id FROM usuarios WHERE usuarios.nome = LOWER(adicionar_usuario.nome);
        
        IF NOT FOUND THEN
            INSERT INTO usuarios (nome) VALUES (LOWER(adicionar_usuario.nome));
        END IF;

        RETURN (SELECT id FROM usuarios WHERE usuarios.nome = LOWER(adicionar_usuario.nome));
    END;
$$ LANGUAGE plpgsql; 

-- Função para atualzar ranqueamento do usuário.
CREATE OR REPLACE FUNCTION atualizar_ranqueamento() RETURNS TRIGGER AS $$
    BEGIN
        INSERT INTO ranqueamento (id_usuario, quantidade_vitorias) 
            SELECT id_usuario, COUNT(CASE WHEN usuario_venceu THEN id_usuario END) AS quantidade_vitorias 
                FROM historico_partidas WHERE id_usuario = NEW.id_usuario AND usuario_venceu = true GROUP BY (id_usuario, usuario_venceu)
                    ON CONFLICT (id_usuario) DO UPDATE SET quantidade_vitorias = EXCLUDED.quantidade_vitorias WHERE EXCLUDED.id_usuario = NEW.id_usuario;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

-- Gatilho para atualizar ranqueamento a cada historico de partidas inserido.
CREATE OR REPLACE TRIGGER adicionar_historico_partidas AFTER INSERT OR UPDATE 
    ON historico_partidas FOR EACH ROW EXECUTE FUNCTION atualizar_ranqueamento();