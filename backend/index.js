// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const dns = require("dns");
// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// dns.setServers(["8.8.8.8", "1.1.1.1"]);
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ── Cloudinary Config ──
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // ── Multer + Cloudinary Storage ──
// // Ab file local disk pe nahi, seedha Cloudinary pe permanently save hoti hai.
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "team-portal",
//     allowed_formats: ["jpeg", "jpg", "png", "webp", "gif"],
//     // unique public_id taaki naam clash na ho
//     public_id: (req, file) =>
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
// });

// // ── Image Upload Route ──
// app.post("/api/upload", upload.single("image"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "Koi file nahi mili" });
//   // multer-storage-cloudinary req.file.path mein permanent Cloudinary URL deta hai
//   res.json({ url: req.file.path });
// });

// // Multer/upload errors ka handling (bade files, wrong format, etc.)
// app.use((err, req, res, next) => {
//   if (err) return res.status(400).json({ error: err.message });
//   next();
// });

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/team", require("./routes/teamRoutes"));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server Running on ${PORT}`));

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ── Cloudinary Config ──
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Config verify karo (server start pe)
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ MISSING",
  api_key: process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING",
});

// ── Multer + Cloudinary Storage ──
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "team-portal",
    allowed_formats: ["jpeg", "jpg", "png", "webp", "gif"],
    public_id: (req, file) =>
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// ── Image Upload Route ──
// ✅ Error handling ko inline callback me daal do
app.post("/api/upload", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Upload Error:", err);
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Koi file nahi mili" });
    }
    console.log("Uploaded File:", req.file);
    res.json({ url: req.file.path });
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));

// ✅ Global error handler SABSE LAST me
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(400).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on ${PORT}`));