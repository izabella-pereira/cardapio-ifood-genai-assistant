const API_KEY = "AQ.Ab8RN6IXyT7BrmuxZcIB0aYtSIdbV4HP2XWzysxB1C5o5d0AZg"; 

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
        const promptText = "Você é o assistente de Inteligência Artificial do iFood. O usuário disse que quer comer ou tem os seguintes ingredientes: '" + text + "'. Crie 3 sugestões de pratos criativos que ele poderia pedir no app do iFood baseados nisso. Seja simpático, use emojis e escreva de forma curta e apetitosa.";

        // URL montada por concatenação simples para evitar qualquer erro de digitação com template strings
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

        // Fazendo a chamada HTTP POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptText }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || "Erro HTTP " + response.status);
        }

        const data = await response.json();
        
        // Mapeamento preciso do JSON oficial do Gemini 2.5
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const generatedText = data.candidates[0].content.parts[0].text;
            responseDiv.innerText = generatedText;
            resultSection.classList.remove('hidden');
        } else {
            throw new Error("A IA respondeu, mas a estrutura veio vazia ou diferente.");
        }

    } catch (error) {
        console.error("Erro capturado no sistema:", error);
        responseDiv.innerText = "Ops! Ocorreu um erro ao conectar com a IA.\n\nDetalhes: " + error.message;
        resultSection.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
