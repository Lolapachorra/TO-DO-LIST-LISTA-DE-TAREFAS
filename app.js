const express = require('express');
const path = require('path');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors');

app.use(cors({
  origin: 'https://lista-de-tarefas-ufce.onrender.com' // Substitua pela URL do seu frontend no Render
}));

// Middleware para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a API
app.use('/api', taskRoutes);

app.use(express.json());

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para servir o "index.html" para qualquer rota não especificada (SPA)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
