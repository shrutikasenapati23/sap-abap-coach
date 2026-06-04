export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { topic } = req.body;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${process.env.GROQ_API_KEY}` },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: 'You are an SAP ABAP interview expert. Return ONLY JSON: {"question":"...","level":"Beginner/Intermediate/Advanced"}' },
        { role: 'user', content: `Generate a unique SAP ABAP interview question about: ${topic}` }
      ],
      temperature: 0.9
    })
  });
  const data = await response.json();
  let text = data.choices?.[0]?.message?.content ?? '';
  text = text.replace(/```json|```/g, '').trim();
  res.status(200).json(JSON.parse(text));
}
