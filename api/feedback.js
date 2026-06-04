export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages, system } = req.body;
  const prompt = system + '\n\n' + messages[0].content;
  
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );
  const data = await response.json();
  console.log('Gemini raw:', JSON.stringify(data));
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{"score":50,"headline":"Reviewed","summary":"Answer received","technical":50,"clarity":50,"depth":50,"strengths":["Answer submitted"],"improvements":["Add more detail"]}';
  
  res.status(200).json({
    content: [{ type: 'text', text: text }]
  });
}
