// Carregando as variáveis de ambiente do arquivo .env
require("dotenv").config();

// Importando o framework Express e a função do app configurado
const express = require("express");
// Importando o Mongoose para trabalhar com o banco de dados MongoDB
const mongoose = require("mongoose");
// Importando o middleware CORS para permitir requisições de diferentes origens
const cors = require("cors");

// Criando uma instância do servidor Express
const app = require("./src/app");

// Definindo a porta do servidor, podendo ser configurada no ambiente
const PORT = process.env.PORT || 3000;

// Conectando ao banco de dados MongoDB usando a URI armazenada na variável de ambiente
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado ao banco de dados!");  // Log de sucesso na conexão
    // Iniciando o servidor na porta configurada
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro ao conectar ao banco de dados:", err));  // Log de erro se a conexão falhar
