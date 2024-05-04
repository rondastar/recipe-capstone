const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get ingredients" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Set ingredients" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `Update ingredient ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete ingredient ${req.params.id}` });
});

module.exports = router;
