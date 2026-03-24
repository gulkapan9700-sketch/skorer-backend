
import fetch from 'node-fetch';
const API = 'https://v3.football.api-sports.io';
const KEY = process.env.RAPID_API_KEY;

async function apiCall(url) {
  const r = await fetch(url, { headers: { 'x-apisports-key': KEY }});
  const j = await r.json();
  return j.response ?? [];
}

export const getToday = async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  res.json(await apiCall(`${API}/fixtures?date=${today}`));
};

export const getLive = async (req, res) => res.json(await apiCall(`${API}/fixtures?live=all`));
export const getFixture = async (req, res) => res.json(await apiCall(`${API}/fixtures?id=${req.params.id}`));
export const getOdds = async (req, res) => res.json(await apiCall(`${API}/odds?fixture=${req.params.id}&bookmaker=1`));
export const getPrediction = async (req, res) => res.json(await apiCall(`${API}/predictions?fixture=${req.params.id}`));
