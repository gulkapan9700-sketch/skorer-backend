import fetch from 'node-fetch';

const API = 'https://api-football-v1.p.rapidapi.com/v3';
const KEY = process.env.RAPID_API_KEY;

async function apiCall(url) {
  const r = await fetch(url, {
    headers: {
      'x-rapidapi-key': KEY,
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
    }
  });
  const j = await r.json();
  return j.response ?? [];
}
