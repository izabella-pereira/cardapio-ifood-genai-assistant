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
        // Engenharia de Prompt: Definindo o papel da IA no contexto do iFood
        const promptText = `Você é o assistente de Inteligência Artificial do iFood. O usuário disse que quer comer ou tem os seguintes ingredientes: "${text}". Crie 3 sugestões de pratos criativos que ele poderia pedir no app do iFood baseados nisso. Seja simpático, use emojis e escreva de forma curta e apetitosa.`;

        // URL Oficial da API do Gemini para requisições Web puras
        const url = `https://googleapis.com{API_KEY}`;

        // Fazendo a chamada HTTP POST direta para o Google
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

        const data = await response.json();

        // Verifica se a API retornou um erro estruturado
        if (data.error) {
            throw new Error(data.error.message);
        }

        // Captura o texto gerado de dentro do objeto do Gemini
        const generatedText = data.candidates[0].content.parts[0].text;

        // Mostra o resultado na tela
        responseDiv.innerText = generatedText;
        resultSection.classList.remove('hidden');

    } catch (error) {
        console.error("Erro na requisição:", error);
        responseDiv.innerText = `Ops! Ocorreu um erro ao conectar com a IA.\nDetalhes: ${error.message}\n\nVerifique se sua API Key está colada corretamente.`;
        resultSection.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
