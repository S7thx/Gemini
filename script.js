import { GoogleGenerativeAI } from "@google/generative-ai";

// Fetch your API_KEY
const API_KEY = "AIzaSyBuEtwnk0hndPmQXthNp0jOKiAHpVm7qxc";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let resposta = document.getElementById("resposta");
let pergunta= document.getElementById("pergunta");
let botao = document.getElementById("button");

botao.addEventListener("click", run);

async function run() {
    const prompt = pergunta.value;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    resposta.value = text;
}