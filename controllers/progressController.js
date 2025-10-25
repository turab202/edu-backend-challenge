// controllers/progressController.js
const db = require("../db/database");
const { saveOffline } = require("../utils/offlineCache");

// Set this to true to force offline mode (testing), false for normal DB saving
const FORCE_OFFLINE = false;

exports.saveProgress = (req, res) => {
  const { user_id, lesson, score } = req.body;
  if (!user_id || !lesson || !score)
    return res.status(400).json({ error: "All fields required" });

  if (FORCE_OFFLINE) {
    // Force offline saving
    console.log("⚠️ Offline — saving to cache.");
    saveOffline({ user_id, lesson, score });
    return res.status(200).json({
      message: "Saved offline, will sync later.",
      cached: true
    });
  }

  // Normal DB saving
  db.run(
    "INSERT INTO progress (user_id, lesson, score) VALUES (?, ?, ?)",
    [user_id, lesson, score],
    function (err) {
      if (err) {
        console.log("⚠️ Offline — saving to cache.");
        saveOffline({ user_id, lesson, score });
        return res.status(200).json({
          message: "Saved offline, will sync later.",
          cached: true
        });
      }
      res.json({ id: this.lastID, user_id, lesson, score });
    }
  );
};

exports.getAllProgress = (req, res) => {
  db.all("SELECT * FROM progress", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};
