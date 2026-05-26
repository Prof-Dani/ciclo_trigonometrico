const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o celular acesse o backend através da internet
app.use(cors());
app.use(express.json());

// Configura o banco de dados SQLite no arquivo banco.db
const dbPath = path.resolve(__dirname, 'banco.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado com sucesso ao banco de dados SQLite local.');
    // Garante que a tabela exista com os mesmos nomes que o App.js envia
    db.run(`
      CREATE TABLE IF NOT EXISTS historico (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        angulo INTEGER,
        seno REAL,
        cosseno REAL,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }
});

// Rota POST: O celular envia os dados para cá
app.post('/api/historico', (req, res) => {
  const { angulo, seno, cosseno } = req.body;

  // Validação simples para ter certeza de que os dados chegaram
  if (angulo === undefined || seno === undefined || cosseno === undefined) {
    return res.status(400).json({ error: 'Dados incompletos enviados pelo aplicativo.' });
  }

  const query = `INSERT INTO historico (angulo, seno, cosseno) VALUES (?, ?, ?)`;
  
  db.run(query, [angulo, seno, cosseno], function (err) {
    if (err) {
      console.error('Erro ao inserir no banco de dados:', err.message);
      return res.status(500).json({ error: 'Erro interno ao salvar no banco de dados.' });
    }
    res.status(201).json({ message: 'Dados gravados com sucesso!', id: this.lastID });
  });
});

// Rota GET: O navegador lê os dados salvos para exibir na tela
app.get('/api/historico', (req, res) => {
  db.all(`SELECT * FROM historico ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});