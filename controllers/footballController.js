import fetch from 'node-fetch';

const HOST = 'sofascore.p.rapidapi.com';
const BASE = 'https://sofascore.p.rapidapi.com';
const KEY = process.env.RAPID_API_KEY;

// 🔥 TÜM API çağrıları buradan geçiyor
async function apiCall(path) {
  try {
    const response = await fetch(`${BASE}/${path}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': KEY,
        'x-rapidapi-host': HOST
      }
    });

    const text = await response.text();

    // DEBUG (çok önemli)
    console.log("API RESPONSE:", text.substring(0, 200));

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("JSON parse hatası:", text);
      return { events: [] };
    }

  } catch (err) {
    console.error("FETCH HATASI:", err);
    return { events: [] };
  }
}

// 🔴 CANLI MAÇLAR
export const getLive = async (req, res) => {
  try {
    const data = await apiCall('api/v1/sport/football/events/live');
    return res.status(200).json(data?.events || []);
  } catch (e) {
    console.error(e);
    return res.status(500).json([]);
  }
};

// 📅 BUGÜNKÜ MAÇLAR
export const getToday = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const data = await apiCall(`api/v1/sport/football/events/date/${today}`);

    return res.json(data); // 🔥 direkt data dön
  } catch (e) {
    console.error("HATA:", e);
    return res.status(500).json({ error: e.message });
  }
};

// 📊 MAÇ DETAYI
export const getFixture = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json([]);

    const data = await apiCall(`api/v1/event/${id}`);

    return res.status(200).json(data?.event ? [data.event] : []);
  } catch (e) {
    console.error(e);
    return res.status(500).json([]);
  }
};

// 💰 ORANLAR
export const getOdds = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({});

    const data = await apiCall(`api/v1/event/${id}/odds/1/all`);

    return res.status(200).json(data || {});
  } catch (e) {
    console.error(e);
    return res.status(500).json({});
  }
};

// ⚽ MAÇ OLAYLARI (gol, kart)
export const getPrediction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json([]);

    const data = await apiCall(`api/v1/event/${id}/incidents`);

    return res.status(200).json(data?.incidents || []);
  } catch (e) {
    console.error(e);
    return res.status(500).json([]);
  }
};
