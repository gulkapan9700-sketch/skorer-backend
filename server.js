app.get("/fb/today", async (req, res) => {
  try {
    const response = await axios.get(
      "https://sofascore.p.rapidapi.com/v1/sport/football/events/live",
      {
        headers: {
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
          "X-RapidAPI-Host": "sofascore.p.rapidapi.com",
        },
      }
    );

    console.log("LIVE DATA:", JSON.stringify(response.data, null, 2));

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
