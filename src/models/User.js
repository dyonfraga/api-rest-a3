// Importando o Mongoose para criar o modelo de dados
const mongoose = require("mongoose");
// Importando o bcryptjs para criptografar as senhas dos usuários
const bcrypt = require("bcryptjs");

// Definindo o esquema de dados para o modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Nome de usuário único
  email: { type: String, required: true, unique: true },     // Email único
  password: { type: String, required: true },                // Senha do usuário
});

// Antes de salvar um novo usuário, vamos criptografar a senha usando bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();  // Só criptografa se a senha foi modificada
  this.password = await bcrypt.hash(this.password, 10);  // Criptografando a senha
  next();  // Chamando a próxima função no processo
});

// Exportando o modelo para ser utilizado em outras partes do código
module.exports = mongoose.model("User", UserSchema);
