export default async function handler(req, res) {
  const { fixture } = req.query;
  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return res.status(500).json({ error: "Falta configurar API_FOOTBALL_KEY en Vercel (Settings > Environment Variables)." });
  }
  if (!fixture) {
    return res.status(400).json({ error: "Falta parámetro fixture." });
  }

  try {
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${fixture}`;
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
