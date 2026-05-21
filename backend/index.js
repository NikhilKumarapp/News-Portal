// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const dns = require("dns");

// dns.setServers(["8.8.8.8","1.1.1.1"]);

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/uploads", express.static("uploads"));

// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log(err));

// app.use(
//   "/api/admin",
//   require("./routes/adminRoutes")
// );
// app.use("/api/team", require("./routes/teamRoutes"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server Running on ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ── Multer Storage Config ──
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|gif/;
    const isValid = allowed.test(path.extname(file.originalname).toLowerCase())
                 && allowed.test(file.mimetype);
    if (isValid) cb(null, true);
    else cb(new Error("Sirf images allowed hain (jpg, png, webp, gif)"));
  },
});

// ── Image Upload Route ──
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Koi file nahi mili" });

  const imageUrl = `${process.env.BASE_URL || "https://news-portal-backend-d8q9.onrender.com"}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));