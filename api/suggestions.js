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
        signal: AbortSignal.timeout(120000),
      }
    );

    const result = await upstream.json().catch(() => null);

    if (!upstream.ok) {
      console.error("Erro do Gemini:", {
        status: upstream.status,
        message: result?.error?.message,
        details: result?.error?.details,
      });
      return res.status(502).json({ error: "Não foi possível gerar sugestões agora." });
    }

    const suggestion = result?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("\n")
      .trim();

    if (!suggestion) {
      return res.status(502).json({ error: "O Gemini não retornou sugestões." });
    }

    return res.status(200).json({ suggestion });
  } catch (error) {
    console.error("Falha na chamada ao Gemini:", error.name);
    const status = error.name === "TimeoutError" ? 504 : 502;
    return res.status(status).json({ error: "O serviço de sugestões está indisponível." });
  }
};
