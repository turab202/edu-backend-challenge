const express = require("express");
const db = require("./db/database");
const { syncOfflineData } = require("./utils/offlineCache");

const userRoutes = require("./routes/userRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", progressRoutes);

// Sync any offline data at startup
syncOfflineData(db);

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
