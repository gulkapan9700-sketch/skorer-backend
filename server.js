app.get("/fb/today", async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

    const response = await axios.get(
      `https://sofascore.p.rapidapi.com/v1/sport/football/scheduled-events/${today}`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
        },
      }
    );

    console.log("API RESPONSE:", response.data);

    const events =
      response.data?.data?.events ||
      response.data?.events ||
      [];

    res.json(events);
  } catch (err) {
    console.error("HATA:", err.response?.data || err.message);
    res.status(500).json({ error: "Veri çekilemedi" });
  }
});
