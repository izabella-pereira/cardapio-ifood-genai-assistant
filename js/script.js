const API_KEY = "AQ.Ab8RN6KDq6shpYibKVit2Z_4Pk6o0DCRXRJO_B1_E2K3FQKplQ"; 

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
        const promptText = `Você é o assistente de Inteligência Artificial do iFood. O usuário disse que quer comer ou tem os seguintes ingredientes: "${text}". Crie 3 sugestões de pratos criativos que ele poderia pedir no app do iFood baseados nisso. Seja simpático, use emojis e escreva de forma curta e apetitosa.`;

        // URL Oficial e Direta corrigida passo a passo (sem misturar com chaves soltas)
        const url = `https://googleapis.com/${API_KEY}`;

        // Fazendo a chamada HTTP POST diretamente para o endpoint correto do Google
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
            throw new Error(errorData.error?.message || `Erro HTTP ${response.status}`);
        }

        const data = await response.json();
        
        // Mapeamento preciso do objeto JSON retornado pelo Gemini 2.5
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            const generatedText = data.candidates[0].content.parts[0].text;
            responseDiv.innerText = generatedText;
            resultSection.classList.remove('hidden');
        } else {
            throw new Error("A estrutura da resposta da IA veio em um formato inesperado.");
        }

    } catch (error) {
        console.error("Erro capturado no sistema:", error);
        responseDiv.innerText = `Ops! Ocorreu um erro ao conectar com a IA.\n\nDetalhes: ${error.message}\n\nVerifique se o código do script.js salvou corretamente.`;
        resultSection.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
