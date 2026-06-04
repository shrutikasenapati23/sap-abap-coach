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
            content: 'You are an SAP ABAP interview coach. Respond ONLY with valid JSON, no markdown, no newlines inside string values. Format: {"score":85,"headline":"title","summary":"one line","technical":80,"clarity":75,"depth":70,"strengths":["s1","s2"],"improvements":["i1","i2"],"interviewerTip":"tip","modelAnswer":"answer"}'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3
      })
    }
  );
  const data = await response.json();
  let text = data.choices?.[0]?.message?.content ?? '';
  text = text.replace(/```json|```/g, '').trim();
  text = text.replace(/[\x00-\x1F\x7F]/g, ' ');
  text = text.replace(/\n/g, ' ');
  if (!text) text = '{"score":50,"headline":"Reviewed","summary":"Answer received","technical":50,"clarity":50,"depth":50,"strengths":["Answer submitted"],"improvements":["Add more detail"]}';
  
  res.status(200).json({
    content: [{ type: 'text', text: text }]
  });
}
