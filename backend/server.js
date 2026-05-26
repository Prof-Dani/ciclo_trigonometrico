const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// 1. Conexão com o Banco de Dados SQLite
// Isso criará um arquivo chamado 'banco.db' automaticamente na pasta backend
const dbPath = path.resolve(__dirname, 'banco.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao SQLite:", err.message);
    } else {
        console.log("Conectado com sucesso ao banco de dados SQLite local.");
        criarTabelas();
    }
});

// 2. Criação da Tabela de Histórico
function criarTabelas() {
    db.run(`
        CREATE TABLE IF NOT EXISTS historico (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            angulo INTEGER NOT NULL,
            seno REAL NOT NULL,
            cosseno REAL NOT NULL,
            data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela:", err.message);
    });
}

// 3. ROTA POST: Salvar um novo ângulo no banco
app.post('/api/historico', (req, res) => {
    const { angulo, seno, cosseno } = req.body;

    if (angulo === undefined || seno === undefined || cosseno === undefined) {
        return res.status(400).json({ erro: "Campos obrigatórios ausentes (angulo, seno, cosseno)." });
    }

    const query = `INSERT INTO historico (angulo, seno, cosseno) VALUES (?, ?, ?)`;
    
    db.run(query, [angulo, seno, cosseno], function(err) {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        // 'this.lastID' retorna o ID do registro que acabou de ser inserido
        res.status(201).json({ 
            status: "Sucesso", 
            id: this.lastID,
            angulo,
            seno,
            cosseno
        });
    });
});

// 4. ROTA GET: Buscar todos os históricos salvos
app.get('/api/historico', (req, res) => {
    const query = `SELECT * FROM historico ORDER BY data_criacao DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ erro: err.message });
        }
        res.json(rows);
    });
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});