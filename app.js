// app.js
const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');  // Importa o módulo `path`
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
