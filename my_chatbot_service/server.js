// Importar as bibliotecas necessárias
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Inicializar o app Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar o body-parser para interpretar JSON
app.use(bodyParser.json());

// Conectar ao MongoDB (substitua <username>, <password>, e <cluster-url> pelos detalhes do seu cluster)
mongoose.connect('mongodb+srv://Sethzx:28082006@cluster0.seuxz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Definir o modelo de dados para o histórico de usuários
const historySchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

// Endpoint para registrar ações do usuário
app.post('/api/history', async (req, res) => {
  const { userId, action } = req.body;

  if (!userId || !action) {
    return res.status(400).send('userId and action are required');
  }

  try {
    const newHistory = new History({ userId, action });
    await newHistory.save();
    res.status(201).send(newHistory);
  } catch (error) {
    res.status(500).send('Error saving history');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});