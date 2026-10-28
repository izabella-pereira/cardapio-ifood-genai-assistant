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

        const response = await fetch("/api/suggestions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: text }),
        });
        
        const data = await response.json().catch(() => ({}));
        
        if (!response.ok) {
            throw new Error(data.error || `Erro HTTP ${response.status}`);
        }
        
        responseDiv.textContent = data.suggestion;
        resultSection.classList.remove("hidden");
        
        // Mapeamento preciso do JSON oficial do Gemini 3.8
        if (typeof data.suggestion !== "string" || !data.suggestion.trim()) {
          throw new Error("O servidor não retornou sugestões.");
        }
        
        responseDiv.textContent = data.suggestion.trim();
        resultSection.classList.remove("hidden");

    } catch (error) {
        console.error("Erro capturado no sistema:", error);
        responseDiv.innerText = "Ops! Ocorreu um erro ao conectar com a IA.\n\nDetalhes: " + error.message;
        resultSection.classList.remove('hidden');
    } finally {
        loadingDiv.classList.add('hidden');
    }
});
