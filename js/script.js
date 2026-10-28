import { GoogleGenAI } from "https://esm.run";

const API_KEY = "AQ.Ab8RN6KDq6shpYibKVit2Z_4Pk6o0DCRXRJO_B1_E2K3FQKplQ"; 
const ai = new GoogleGenAI({ apiKey: API_KEY });

const btnGenerate = document.getElementById('btn-generate');
const inputIngredients = document.getElementById('ingredients');
const loadingDiv = document.getElementById('loading');
const resultSection = document.getElementById('result');
const responseDiv = document.getElementById('ai-response');

btnGenerate.addEventListener('click', async () => {
    const text = inputIngredients.value.trim();
    if (!text) {
        alert("Por favor, digite o que você deseja comer!");
        return;
    }

    // Exibe o loading e esconde o resultado anterior
    loadingDiv.classList.remove('hidden');
    resultSection.classList.add('hidden');

    try {
        // Engenharia de Prompt: Definindo o papel da IA no contexto do iFood
        const prompt = `Você é o assistente de Inteligência Artificial do iFood. O usuário disse que quer comer ou tem os seguintes ingredientes: "${text}". Crie 3 sugestões de pratos criativos que ele poderia pedir no app do iFood baseados nisso. Seja simpático, use emojis e escreva de forma curta e apetitosa.`;

        // Chama o modelo oficial do Gemini
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        // Mostra o resultado na tela
        responseDiv.innerText = response.text;
        resultSection.classList.remove('hidden');
    } catch (error) {
        console.error(error);
        responseDiv.innerText = "Ops! Ocorreu um erro ao conectar com o servidor da IA. Verifique sua API Key.";
        resultSection.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
