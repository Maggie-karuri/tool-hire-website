const express = require("express");
const cors = require("cors");
const tools = require("./Data");
const path = require("path");
const multer = require("multer");

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
 filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

//Route to fetch all tools
app.get("/api/tools", (req, res) => {
  console.log("Request received for tools");
  res.json(tools);
});

//filter by category
app.get("/api/tools/:category", (req, res) => {
  const category = req.params.category;
  const filtered = tools.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
  res.json(filtered);
});
//route to post
app.post("/api/tools", upload.single("image"), (req, res) => {
  const {name, category, description } = req.body;
  const newTool = {
    id: tools.length + 1,
    name,
    category,
    description,
    image: `https://elite-hire-backend.onrender.com/uploads/${req.file.filename}`
  };
  tools.push(newTool);

  res.json(newTool);
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));