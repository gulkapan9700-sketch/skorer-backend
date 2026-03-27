import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.APISPORTS_KEY;

// Futbol canlı maçlar
app.get("/api/football/live", async (req, res) => {
  try {
    const response = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
      headers: {
        "x-apisports-key": API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

// Basketbol canlı maçlar
app.get("/api/basketball/live", async (req, res) => {
  try {
    const response = await fetch("https://v1.basketball.api-sports.io/games?live=all", {
      headers: {
        "x-apisports-key": API_KEY
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
