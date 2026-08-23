export default async function handler(req, res) {
  const { date, league, season } = req.query;
  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return res.status(500).json({ error: "Falta configurar API_FOOTBALL_KEY en Vercel (Settings > Environment Variables)." });
  }
  if (!date || !league) {
    return res.status(400).json({ error: "Faltan parámetros date y league." });
  }

  try {
    const url = `https://v3.football.api-sports.io/fixtures?date=${date}&league=${league}&season=${season || 2026}`;
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
