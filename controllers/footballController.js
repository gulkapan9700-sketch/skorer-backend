import fetch from 'node-fetch';

const HOST = 'sofascore.p.rapidapi.com';
const BASE = 'https://sofascore.p.rapidapi.com';
const KEY = process.env.RAPID_API_KEY;

async function apiCall(path) {
  const r = await fetch(`${BASE}/${path}`, {
    headers: {
      'x-rapidapi-key': KEY,
      'x-rapidapi-host': HOST
    }
  });
  return await r.json();
}

// Canlı maçlar - futbol categoryId=1
export const getLive = async (req, res) => {
  try {
    const data = await apiCall('api/v1/sport/football/events/live');
    res.json(data?.events ?? []);
  } catch (e) {
    res.json([]);
  }
};

// Bugünkü maçlar
export const getToday = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const data = await apiCall(`api/v1/sport/football/scheduled-events/${today}`);
    res.json(data?.events ?? []);
  } catch (e) {
    res.json([]);
  }
};

// Maç detayı
export const getFixture = async (req, res) => {
  try {
    const data = await apiCall(`api/v1/event/${req.params.id}`);
    res.json(data?.event ? [data.event] : []);
  } catch (e) {
    res.json([]);
  }
};

// Maç istatistikleri
export const getOdds = async (req, res) => {
  try {
    const data = await apiCall(`api/v1/event/${req.params.id}/odds/1/all`);
    res.json(data ?? {});
  } catch (e) {
    res.json({});
  }
};

// Maç olayları (goller, kartlar)
export const getPrediction = async (req, res) => {
  try {
    const data = await apiCall(`api/v1/event/${req.params.id}/incidents`);
    res.json(data?.incidents ?? []);
  } catch (e) {
    res.json([]);
  }
};
```

Commit'le ve deploy bekle. Sonra şunu test edelim:
```
https://skorer-backend-q44o.onrender.com/fb/today
