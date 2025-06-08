require("dotenv").config();

const fs = require('fs');
const express = require('express');
const app = express();
const client = require('./src/models/conexao');

const index = require('./src/routes/v1/index');
const usuarios = require('./src/routes/v1/usuarios');
const ranqueamento = require('./src/routes/v1/ranqueamento');
const historicoPartidas = require('./src/routes/v1/historico-partidas');

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.use(express.json());

app.use(index);
app.use(usuarios);
app.use(ranqueamento);
app.use(historicoPartidas);

app.listen(process.env.API_PORT, () => {
    conectarBancoDeDados();
    
    console.log(`Executando a aplicação na porta: ${process.env.API_PORT}`);
});

async function conectarBancoDeDados() {
    try {
        await client.connect();
        console.log('Conectado com banco de dados PostgreSQL!'); 
        definirBaseDeDados();
    } catch (error) {
        console.error('Erro ao conectar com banco de dados:', error); 
    }
}

function definirBaseDeDados() {
    try {
        fs.readFile('/src/database/ddl.sql', 'utf8', async (error, scripts) => {
            if (error) throw error;
            await client.query(scripts);
        });
        console.log('Sucesso na definição de tabelas e funções no banco de dados!');
    } catch (error) {
        console.log('Error ao definir tabelas e funções no banco de dados:', error);
    }
}