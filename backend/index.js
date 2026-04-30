const express = require("express");
const cors = require("cors");
const tools = require("./Data");
const path = require("path");
const multer = require("multer");

// Clerk import
const { clerkMiddleware, requireAuth } = require("@clerk/express");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/*PUBLIC: GET ALL TOOLS*/
app.get("/api/tools", (req, res) => {
  res.json(tools);
});

/*PUBLIC: FILTER BY CATEGORY*/
app.get("/api/tools/:category", (req, res) => {
  const category = req.params.category;
  const filtered = tools.filter(
    tool => tool.category.toLowerCase() === category.toLowerCase()
  );
  res.json(filtered);
});

/*ADMIN ONLY: ADD TOOL (UPLOAD)*/
app.post(
  "/api/tools",
  requireAuth(),
  upload.single("image"),
  (req, res) => {
    const userId = req.auth.userId;

    // 👇 CHECK ADMIN ROLE
    const role = req.auth.sessionClaims?.publicMetadata?.role;

    if (role !== "admin") {
      return res.status(403).json({ error: "Admins only" });
    }

    const { name, category, description } = req.body;

    const newTool = {
      id: tools.length + 1,
      name,
      category,
      description,
      image: req.file
        ? `https://elite-hire-backend.onrender.com/uploads/${req.file.filename}`
        : null,
      createdBy: userId
    };

    tools.push(newTool);

    res.json(newTool);
  }
);
app.delete("/api/tools/:id", requireAuth(), (req, res) => {
  const role = req.auth.sessionClaims?.publicMetadata?.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "Admins only" });
  }

  const id = parseInt(req.params.id);

  const index = tools.findIndex(tool => tool.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Tool not found" });
  }

  tools.splice(index, 1);

  res.json({ message: "Tool deleted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));