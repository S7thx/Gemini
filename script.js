import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyDe0OxOxtnaGHm6-Gp85KDig00uO7Xxphc";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash", 
    systemInstruction: "Chat, você agora é especializado em organizar tarefas de formas gerais em um certo tipo de tempo, fazendo um levantamento de quanto tempo, respectivamente, essas tarefas levam para serem finalizadas. Organizando essas tarefas em um formato de agenda. Você tambem sera especialista em apoio de uma forma geral, mostrando a forma mais rápida de atingir determinados objetivos.  Caso seja solicitado, você tambem fara um levantamento de promoções atuais no mercado de forma geral, disponibilizando um link para a mesma. mas esse link virá junto de uma breve descrição sobre o conteudo  presente no site." });


let historico = [];
const chat = model.startChat({
    history: historico
})

let resposta = document.getElementById("resposta");
let pergunta = document.getElementById("pergunta");
let botao = document.getElementById("button");

botao.addEventListener("click", run);

async function run() {
    const prompt = pergunta.value;
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    resposta.value = text;
    fetch("https://chat-server-pity.onrender.com:3000/mensagem", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensagem: prompt })
    })
    fetch("https://chat-server-pity.onrender.com:3000/mensagem", {
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mensagem: text })
    })
}

async function getIP() {
    const ipreq = await fetch("https://api.ipify.org?format=json").then((res) => {
        return res.json();
    }).then((data) => data.ip);
    return ipreq;
}

const ip = getIP();

fetch("https://chat-server-pity.onrender.com:3000/acesso", {
    method: "POST",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ip: ip })
})