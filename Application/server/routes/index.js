const express = require("express");
const path = require("path");
const auth = require("./auth");
const user = require("./user");
const users = require("./users");
const stickies = require("./stickies");
const news = require("./news");
const stocks = require("./stocks");
const weather = require("./weather");
const events = require("./events");
const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/users", users);
router.use("/api/stickies", stickies);
router.use("/api/news", news);
router.use("/api/stocks", stocks);
router.use("/api/weather", weather);
router.use("/api/events", events);

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

module.exports = router;
