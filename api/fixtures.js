export default async function handler(req, res) {
  const { date } = req.query;
  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return res.status(500).json({ error: "Falta configurar API_FOOTBALL_KEY en Vercel." });
  }
  if (!date) {
    return res.status(400).json({ error: "Falta parámetro date." });
  }

  try {
    const url = `https://v3.football.api-sports.io/fixtures?date=${date}`;
    const apiResp = await fetch(url, {
      headers: { "x-apisports-key": key }
    });
    const data = await apiResp.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
