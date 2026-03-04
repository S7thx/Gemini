const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const uri = "mongodb+srv://Sethzx:28082006@cluster0.seuxz.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri)
  .then(() => console.log("Mongoose conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar Mongoose:", err));

const tabela = mongoose.model(
  "user_actions",
  new mongoose.Schema({
    mensagem: String,
    timestamp: { type: Date, default: Date.now }
  })
);

const ips = mongoose.model(
  "acessos",
  new mongoose.Schema({
    ip: String,
    timestamp: { type: Date, default: Date.now }
  })
);

async function conectarMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Conexão MongoClient OK!");
  } catch (err) {
    console.error("Erro ao conectar MongoClient:", err);
  }
}
conectarMongo();

app.post("/mensagem", async (req, res) => {
  try {
    const mensagem = req.body.mensagem;

    if (!mensagem) {
      return res.status(400).json({ erro: "Campo 'mensagem' obrigatório." });
    }

    const doc = await new tabela({ mensagem }).save();
    console.log("Mensagem salva:", doc);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao salvar mensagem:", err);
    res.status(500).json({ erro: "Erro interno ao salvar mensagem." });
  }
});

app.post("/acesso", async (req, res) => {
  try {
    const ip = req.body.ip;

    if (!ip) {
      return res.status(400).json({ erro: "Campo 'ip' obrigatório." });
    }

    const doc = await new ips({ ip }).save();
    console.log("Acesso registrado:", doc);
    res.sendStatus(200);
  } catch (err) {
    console.error("Erro ao salvar acesso:", err);
    res.status(500).json({ erro: "Erro interno ao salvar acesso." });
  }
});

// BUG CORRIGIDO: porta fixa 3000 quebra no Render.com.
// O Render define a variável PORT automaticamente — sem isso o servidor
// sobe na porta errada e não recebe nenhuma requisição externa.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});