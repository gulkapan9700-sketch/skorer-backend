import fetch from 'node-fetch';

app.get('/debug', async (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const r = await fetch(`https://sofascore.p.rapidapi.com/api/v1/sport/football/scheduled-events/${today}`, {
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': 'sofascore.p.rapidapi.com'
    }
  });
  const j = await r.json();
  res.json(j);
});
```

Commit'le, deploy bekle, sonra şunu aç:
```
https://skorer-backend-q44o.onrender.com/debug
