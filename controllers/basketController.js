
import fetch from 'node-fetch';
const API = 'https://v1.basketball.api-sports.io';
const KEY = process.env.RAPID_API_KEY;

async function apiCall(url) {
  const r = await fetch(url, { headers: { 'x-apisports-key': KEY }});
  const j = await r.json();
  return j.response ?? [];
}

export const getToday = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json(await apiCall(`${API}/games?date=${today}`));
};
export const getLive = async (req, res) => res.json(await apiCall(`${API}/games?live=all`));
export const getFixture = async (req, res) => res.json(await apiCall(`${API}/games?id=${req.params.id}`));
