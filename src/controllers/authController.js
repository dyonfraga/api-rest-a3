// Importando o modelo de User e o pacote JWT
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Criando um novo usuário no banco de dados
    const user = await User.create({ username, email, password });
    // Respondendo com sucesso e os dados do novo usuário
    res.status(201).json({ message: "Usuário registrado!", user });
  } catch (error) {
    // Respondendo com erro caso algo falhe
    res.status(400).json({ error: error.message });
  }
};

// Função para realizar o login de um usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verificando se o usuário existe no banco de dados
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Caso o usuário não exista ou a senha esteja errada, retorna erro
      return res.status(401).json({ message: "Credenciais inválidas!" });
    }
    // Gerando um token JWT para autenticação do usuário
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    // Retornando a resposta com o token gerado
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    // Retornando erro em caso de falha
    res.status(400).json({ error: error.message });
  }
};
