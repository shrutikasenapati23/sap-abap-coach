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
        model: 'llama-3.3-70b-versatile',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert SAP ABAP interview coach. Evaluate the answer and respond ONLY with this exact JSON format, no extra text: {"score":85,"headline":"Good Understanding","summary":"One line summary","technical":80,"clarity":75,"depth":70,"strengths":["strength 1","strength 2"],"improvements":["improvement 1","improvement 2"]}'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      })
    }
  );
  const data = await response.json();
  let text = data.choices?.[0]?.message?.content ?? '';
  text = text.replace(/```json|```/g, '').replace(/[\x00-\x1F\x7F]/g, ' ').trim();
  if (!text) text = '{"score":50,"headline":"Reviewed","summary":"Answer received","technical":50,"clarity":50,"depth":50,"strengths":["Answer submitted"],"improvements":["Add more detail"]}';
  
  res.status(200).json({
    content: [{ type: 'text', text: text }]
  });
}
