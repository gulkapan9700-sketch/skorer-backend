<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skorer – Canlı Spor Merkezi</title>

    <style>
        body {
            background: #0f0f0f;
            color: #fff;
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        #liveTicker {
            background: #222;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 20px;
            color: #ffd95a;
            font-size: 14px;
        }
        .match-card {
            background: #1b1b1b;
            padding: 15px;
            border: 1px solid #333;
            border-radius: 10px;
            margin-bottom: 12px;
            cursor: pointer;
        }
        .match-card:hover {
            background: #292929;
        }
        .league {
            font-size: 14px;
            color: #8cd2ff;
            margin-bottom: 6px;
        }
        .teams {
            font-size: 18px;
            margin-bottom: 6px;
        }
        .time {
            font-size: 14px;
            color: #bbb;
        }
    </style>
</head>
<body>

    <h1>⚽ Skorer – Canlı Spor Merkezi</h1>
    <div id="liveTicker">Canlı skorlar yükleniyor...</div>

    <h2>Bugünkü Maçlar</h2>
    <div id="matchFeed">Yükleniyor...</div>

    <!-- ✅ app.js bağlantısı -->
    <script src="app.js"></script>
</body>
</html>
