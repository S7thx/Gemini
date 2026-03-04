import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyAkmy7EMM10Z-hoV44IOl7iZijTLuk-n-0";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Chat, você agora é especializado em organizar tarefas de formas gerais em um certo tipo de tempo, fazendo um levantamento de quanto tempo, respectivamente, essas tarefas levam para serem finalizadas. Organizando essas tarefas em um formato de agenda. Você tambem sera especialista em apoio de uma forma geral, mostrando a forma mais rápida de atingir determinados objetivos. Caso seja solicitado, você tambem fara um levantamento de promoções atuais no mercado de forma geral, disponibilizando um link para a mesma. mas esse link virá junto de uma breve descrição sobre o conteudo presente no site."
});

// BUG CORRIGIDO: URL sem :3000 — no Render.com HTTPS usa porta 443 (padrão).
// Usar :3000 com https:// faz a requisição falhar silenciosamente.
const SERVER_URL = "https://chat-server-pity.onrender.com";

let historico = [];
const chat = model.startChat({ history: historico });

const resposta = document.getElementById("resposta");
const pergunta = document.getElementById("pergunta");
const botao = document.getElementById("button");

botao.addEventListener("click", run);

async function run() {
    const prompt = pergunta.value.trim();

    if (!prompt) return;

    // UX: Desabilita botão e mostra loading enquanto aguarda resposta
    botao.disabled = true;
    botao.textContent = "Aguardando...";
    resposta.value = "Processando...";

    try {
        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();

        resposta.value = text;

        // Limpa o campo de pergunta após envio
        pergunta.value = "";

        // Salva a pergunta do usuário no banco
        await salvarMensagem(prompt);

        // Salva a resposta da IA no banco
        await salvarMensagem(text);

    } catch (err) {
        console.error("Erro ao consultar a IA:", err);
        resposta.value = "Erro ao obter resposta. Verifique sua conexão e tente novamente.";
    } finally {
        botao.disabled = false;
        botao.textContent = "Enviar";
    }
}

async function salvarMensagem(mensagem) {
    try {
        await fetch(`${SERVER_URL}/mensagem`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensagem })
        });
    } catch (err) {
        // Erro de rede ao salvar não deve travar a interface
        console.warn("Aviso: não foi possível salvar mensagem no servidor:", err);
    }
}

// BUG CORRIGIDO: getIP() é assíncrona — antes, o código fazia:
//   const ip = getIP()  →  ip era uma Promise, não o valor real
//   JSON.stringify({ ip: Promise }) → salvava "[object Promise]" no banco
// Solução: aguardar a Promise antes de enviar ao servidor.
async function getIP() {
    try {
        const data = await fetch("https://api.ipify.org?format=json").then(res => res.json());
        return data.ip;
    } catch {
        return "IP desconhecido";
    }
}

async function registrarAcesso() {
    const ip = await getIP(); // agora aguarda o valor real
    try {
        await fetch(`${SERVER_URL}/acesso`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ip })
        });
    } catch (err) {
        console.warn("Aviso: não foi possível registrar acesso:", err);
    }
}

// Registra o acesso ao carregar a página
registrarAcesso();