export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: "Sen NEXO AI — qaraqalpaq tilinde juwap beretuǵın aqıllı járdemshisen." }]
        },
        contents
      })
    }
  );

  const data = await r.json();
  res.json({
    reply: data.candidates?.[0]?.content?.parts?.[0]?.text || "Qátelik boldı"
  });
}
