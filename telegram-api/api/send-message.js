export default async function handler(req, res) {
  // Aktifkan CORS
  res.setHeader("Access-Control-Allow-Origin", "https://davanikoo.me"); // bisa diganti dengan "https://davanikoo.me" untuk keamanan
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // untuk menangani preflight
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  const token = process.env.BOT_TOKEN;
  const chat_id = process.env.CHAT_ID;

  const text = ` Pesan Baru dari Website:\n\n Nama: ${name}\n Email: ${email}\n Pesan: ${message}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text }),
    });

    const data = await response.json();

    if (data.ok) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: data.description });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

