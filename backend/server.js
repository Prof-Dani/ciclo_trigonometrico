const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Permite receber dados em formato JSON

// Rotas de Exemplo (focadas no Ciclo Trigonométrico)
app.get('/api/saudacao', (req, res) => {
    res.json({ mensagem: "Bem-vindo ao Backend do Ciclo Trigonométrico!" });
});

// Exemplo: Rota para salvar um histórico de ângulos consultados ou favoritos
app.post('/api/historico', (req, res) => {
    const { angulo, data } = req.body;
    
    if (!angulo) {
        return res.status(400).json({ erro: "O ângulo é obrigatório." });
    }

    console.log(`Ângulo ${angulo}° salvo no histórico em ${data}`);
    
    // Aqui futuramente você conectará um Banco de Dados (ex: MongoDB, PostgreSQL, SQLite)
    res.status(201).json({ status: "Sucesso", anguloSalvo: angulo });
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});