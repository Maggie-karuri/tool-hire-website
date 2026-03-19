const express = require("express");
const cors = require("cors");
const tools = require("./Data");

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch all tools
app.get("/api/tools", (req, res) => {
  console.log("Request received for tools");
  res.json(tools);
});

// Optional: filter by category
app.get("/api/tools/:category", (req, res) => {
  const category = req.params.category;
  const filtered = tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));