const MODEL = "gemini-3.8-flash";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const ingredients =
    typeof req.body?.ingredients === "string"
      ? req.body.ingredients.trim()
      : "";

  if (!ingredients) {
    return res.status(400).json({ error: "Informe os ingredientes ou o que deseja comer." });
  }

  if (ingredients.length > 300) {
    return res.status(400).json({ error: "O texto deve ter no máximo 300 caracteres." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY não está configurada.");
    return res.status(500).json({ error: "A configuração do servidor está incompleta." });
  }
  
  const startedAt = Date.now();
  
  try {
    const prompt = [
      "Sugira exatamente 3 pratos criativos para pedir no iFood.",
      "Responda em português, de forma curta e apetitosa.",
      `Pedido ou ingredientes da pessoa: ${ingredients}`,
    ].join("\n");

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
        signal: AbortSignal.timeout(90000),
      }
    );

    const result = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      console.error("Erro do Gemini:", {
        status: upstream.status,
        message: result?.error?.message,
        details: result?.error?.details,
        durationMs: Date.now() - startedAt,
      });
      return res.status(502).json({ error: "Não foi possível gerar sugestões agora." });
    }

    console.info("Gemini concluído", {
      status: upstream.status,
      durationMs: Date.now() - startedAt,
    });

    const suggestion = result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("\n")
      .trim();

    if (!suggestion) {
      return res.status(502).json({ error: "O Gemini não retornou sugestões." });
    }
    
    return res.status(200).json({ suggestion });
  } catch (error) {
    const timedOut = error?.name === "TimeoutError" || error?.name === "AbortError";
  
    console.error("Falha na chamada ao Gemini:", {
      name: error?.name,
      durationMs: Date.now() - startedAt,
    });
  
    return res.status(timedOut ? 504 : 502).json({
      error: timedOut
        ? "O Gemini demorou mais que o esperado. Clique em Gerar novamente para tentar."
        : "Não foi possível gerar sugestões agora. Tente novamente.",
    });
  }
};
