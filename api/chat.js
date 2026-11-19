export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 1024,
      system: "Sen NEXO AI — qaraqalpaq tilinde juwap beretuǵın aqıllı járdemshisen.",
      messages
    })
  });

  const data = await r.json();
  res.json({ reply: data.content?.[0]?.text || "Qátelik boldı" });
}
