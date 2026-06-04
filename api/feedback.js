export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages, system } = req.body;
  const prompt = system + '\n\n' + messages[0].content;
  
  const response = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'You must respond with valid JSON only. No markdown, no code blocks, no extra text.' },
          { role: 'user', content: prompt }
        ]
      })
    }
  );
  const data = await response.json();
  console.log('Groq raw:', JSON.stringify(data));
  let text = data.choices?.[0]?.message?.content ?? '';
  text = text.replace(/```json|```/g, '').trim();
  if (!text) text = '{"score":50,"headline":"Reviewed","summary":"Answer received","technical":50,"clarity":50,"depth":50,"strengths":["Answer submitted"],"improvements":["Add more detail"]}';
  
  res.status(200).json({
    content: [{ type: 'text', text: text }]
  });
}
