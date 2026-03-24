// ✅ BACKEND URL – SENİN RENDER SUNUCU URL'İN
const API = "https://skorer-backend-q44o.onrender.com";

// ✅ Güvenli Fetch Fonksiyonu
async function fetchJSON(url) {
    try {
        const r = await fetch(url);
        return await r.json();
    } catch (err) {
        console.error("API Hatası:", err);
        return null;
    }
}

// ✅ CANLI TICKER (Header’daki kayan skor bandı)
async function loadTicker() {
    const liveFB = await fetchJSON(`${API}/fb/live`);
    const liveBB = await fetchJSON(`${API}/bb/live`);

    let html = "";

    if (liveFB && liveFB.length) {
        html += liveFB
            .slice(0, 7)
            .map(
                (m) =>
                    `⚽ ${m.teams.home.name} ${m.goals.home}-${m.goals.away} ${m.teams.away.name}`
            )
            .join(" • ");
    }

    if (liveBB && liveBB.length) {
        html += " • " +
            liveBB
                .slice(0, 7)
                .map(
                    (m) =>
                        `🏀 ${m.teams.home.name} ${m.scores.home.total}-${m.scores.away.total} ${m.teams.away.name}`
                )
                .join(" • ");
    }

    document.getElementById("liveTicker").innerHTML =
        html || "Şu anda canlı maç yok";
}

// ✅ ANA SAYFADAKİ MAÇ LİSTESİ
async function loadMatches() {
    const fbToday = await fetchJSON(`${API}/fb/today`);
    const bbToday = await fetchJSON(`${API}/bb/today`);

    let html = "";

    // ✅ FUTBOL MAÇLARI
    if (fbToday && fbToday.length) {
        fbToday.forEach((m) => {
            html += `
            <div class="match-card" onclick="openMatch(${m.fixture.id}, 'football')">
                <div class="league">${m.league.name}</div>
                <div class="teams">${m.teams.home.name} vs ${m.teams.away.name}</div>
                <div class="time">${new Date(m.fixture.date).toLocaleTimeString("tr-TR")}</div>
            </div>`;
        });
    }

    // ✅ BASKETBOL MAÇLARI
    if (bbToday && bbToday.length) {
        bbToday.forEach((m) => {
            html += `
            <div class="match-card" onclick="openMatch(${m.id}, 'basket')">
                <div class="league">${m.league.name}</div>
                <div class="teams">${m.teams.home.name} vs ${m.teams.away.name}</div>
                <div class="time">${new Date(m.date).toLocaleTimeString("tr-TR")}</div>
            </div>`;
        });
    }

    document.getElementById("matchFeed").innerHTML =
        html || "<div class='loader'>Bugün için listelenecek maç bulunamadı.</div>";
}

// ✅ MAÇ DETAY SAYFASINA GİDİŞ
function openMatch(id, type) {
    window.location.href = `match.html?id=${id}&type=${type}`;
}

// ✅ SAYFAYI BAŞLAT
loadTicker();
loadMatches();

// ✅ OTOMATİK YENİLEME
setInterval(loadTicker, 30000); // 30 saniyede bir canlı skor
setInterval(loadMatches, 60000); // 60 saniyede bir maç listesi
