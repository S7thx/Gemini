
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json())
app.use(cors());
const uri = "mongodb+srv://Sethzx:28082006@cluster0.seuxz.mongodb.net/chatbot?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoose.connect(uri);

const tabela = mongoose.model(
  "user_actions",
  {
    mensagem: String
  }
)
const ips = mongoose.model(
  "acessos",
  {
    ip: String
  }
)

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

  }
}
run();

app.post("/mensagem", (req, res) => {
  console.log(req.body)
  const mensagem = req.body.mensagem;
  new tabela({ mensagem: mensagem }).save().then((msg) => console.log(msg))
  res.sendStatus(200) 
})


app.post("/acesso", (req, res) => {
  const acesso = req.body.ip;
  new ips({ ip: acesso }).save().then((msg) => console.log(msg))
  res.sendStatus(200) 
})

app.listen(3000, () => {
  console.log("LIGADO PORRAAA")
})
