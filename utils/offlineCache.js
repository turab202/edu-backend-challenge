// utils/offlineCache.js
const fs = require("fs");

const CACHE_FILE = "./offline-cache.json";

// Save request to local cache
function saveOffline(data) {
  let cache = [];
  if (fs.existsSync(CACHE_FILE)) {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE));
  }
  cache.push(data);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

// Sync cached requests to database when online
function syncOfflineData(db) {
  if (!fs.existsSync(CACHE_FILE)) return;
  const cached = JSON.parse(fs.readFileSync(CACHE_FILE));
  if (cached.length === 0) return;

  console.log("🔄 Syncing offline data...");

  cached.forEach(item => {
    db.run(
      "INSERT INTO progress (user_id, lesson, score) VALUES (?, ?, ?)",
      [item.user_id, item.lesson, item.score]
    );
  });

  fs.writeFileSync(CACHE_FILE, JSON.stringify([]));
  console.log("✅ Offline data synced!");
}

module.exports = { saveOffline, syncOfflineData };
