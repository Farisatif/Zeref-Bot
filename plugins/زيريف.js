import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  // إرسال تفاعل روبوت
  await conn.sendMessage(m.chat, { react: { text: '🤖', key: m.key } });

  // التحقق من وجود السؤال
  if (!text) return m.reply("🧠 أرسل سؤالك بعد الأمر.\nمثال:\n.زيريف ما هو الذكاء الاصطناعي؟");

  try {
    let result = await askOpenRouter(text);
    await m.reply(result);
  } catch (e) {
    console.error(e);
    await m.reply("❌ حدث خطأ أثناء الاتصال:\n" + (e.message || e));
  }
}

handler.help = ["زيريف"];
handler.tags = ["ai"];
handler.command = /^زيريف$/i;

export default handler;

// ============ وظيفة OpenRouter ============

async function askOpenRouter(prompt) {
const apiKey = process.env.OPENROUTER_API_KEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo", // يمكنك تغييره مثلاً إلى gpt-4 أو anthropic/claude
      messages: [
        { role: "system", content: "أجب على الأسئلة باللغة العربية فقط، وبأسلوب واضح ومختصر." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || "فشل الاتصال بخدمة OpenRouter.");
  }

  return data.choices?.[0]?.message?.content?.trim() || "❓ لم أتمكن من توليد رد.";
}