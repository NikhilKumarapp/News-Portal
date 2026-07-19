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

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const dns = require("dns");
// const multer = require("multer");
// const { v2: cloudinary } = require("cloudinary");

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

// console.log("Cloudinary Config:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? "✓ Set" : "✗ MISSING",
//   api_key: process.env.CLOUDINARY_API_KEY ? "✓ Set" : "✗ MISSING",
//   api_secret: process.env.CLOUDINARY_API_SECRET ? "✓ Set" : "✗ MISSING",
// });

// // ── Multer Memory Storage ──
// const storage = multer.memoryStorage();

// // ── File Filter ──
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "image/gif",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Sirf image files allowed hain (jpeg, jpg, png, webp, gif)"));
//   }
// };

// // ── Multer Upload Config ──
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// // ── Image Upload Route ──
// app.post("/api/upload", upload.single("image"), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: "Koi file nahi mili" });
//     }

//     const result = await new Promise((resolve, reject) => {
//       const stream = cloudinary.uploader.upload_stream(
//         {
//           folder: "team-portal",
//           resource_type: "image",
//           public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result);
//         }
//       );

//       stream.end(req.file.buffer);
//     });

//     return res.status(200).json({
//       message: "Image upload successful",
//       url: result.secure_url,
//       public_id: result.public_id,
//       original_name: req.file.originalname,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// // MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("Mongo Error:", err));

// // Other routes
// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/team", require("./routes/teamRoutes"));

// // ── Global Error Handler ──
// app.use((err, req, res, next) => {
//   console.error("Global Error:", err);

//   if (err instanceof multer.MulterError) {
//     if (err.code === "LIMIT_FILE_SIZE") {
//       return res.status(400).json({ error: "File size 5MB se zyada nahi honi chahiye" });
//     }
//     return res.status(400).json({ error: err.message });
//   }

//   return res.status(400).json({ error: err.message || "Something went wrong" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server Running on ${PORT}`));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const dns = require("dns");
const multer = require("multer");
const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

app.use(cors());
app.use(express.json());

// ---------------- Cloudinary ----------------

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary Config");
console.log("Cloud Name :", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API Key :", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
console.log("API Secret :", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

// Test Cloudinary Connection
cloudinary.api.ping()
    .then((res) => {
        console.log("✅ Cloudinary Connected");
    })
    .catch((err) => {
        console.log("❌ Cloudinary Error");
        console.log(err);
    });

// ---------------- Multer ----------------

const storage = multer.memoryStorage();

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter(req, file, cb) {

        const allowed = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif"
        ];

        if (!allowed.includes(file.mimetype)) {
            return cb(new Error("Only image files are allowed."));
        }

        cb(null, true);
    },
});

// ---------------- Upload Function ----------------

// const uploadToCloudinary = (buffer) => {

//     return new Promise((resolve, reject) => {

//         const uploadStream = cloudinary.uploader.upload_stream(
//             {
//                 folder: "team-portal",
//                 resource_type: "image",
//                 transformation: [
//                     {
//                         width: 1200,
//                         height: 1200,
//                         crop: "limit",
//                         quality: "auto",
//                         fetch_format: "auto",
//                     },
//                 ],
//             },
//             (error, result) => {

//                 if (error) {
//                     console.log("Cloudinary Upload Error");
//                     console.log(error);
//                     return reject(error);
//                 }

//                 resolve(result);
//             }
//         );

//         streamifier.createReadStream(buffer).pipe(uploadStream);
//     });
// };

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "NewsMedia", // Cloudinary folder name
                resource_type: "image",

                transformation: [
                    {
                        width: 1200,
                        height: 1200,
                        crop: "limit",
                        quality: "auto",
                    },
                ],
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", {
                        message: error.message,
                        httpCode: error.http_code,
                        name: error.name,
                        details: error.error,
                    });

                    return reject(error);
                }

                resolve(result);
            }
        );

        uploadStream.end(buffer);
    });
};

// ---------------- Upload API ----------------

app.post("/api/upload", upload.single("image"), async (req, res) => {

    try {

        console.log("Upload API Called");

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No image received."
            });

        }

        console.log("File Name :", req.file.originalname);
        console.log("File Size :", req.file.size);
        console.log("Mime Type :", req.file.mimetype);

        const result = await uploadToCloudinary(req.file.buffer);

        console.log(result);

        return res.status(200).json({

            success: true,
            message: "Image Uploaded Successfully",

            image: {
                url: result.secure_url,
                public_id: result.public_id,
                width: result.width,
                height: result.height,
                format: result.format,
            }

        });

    } catch (err) {

        console.log("Upload Error");
        console.log(err);

        return res.status(500).json({

            success: false,
            message: err.message

        });

    }

});

// ---------------- MongoDB ----------------

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected");

    })
    .catch((err) => {

        console.log("MongoDB Error");
        console.log(err);

    });

// ---------------- Routes ----------------

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));

// ---------------- Error Handler ----------------

app.use((err, req, res, next) => {

    console.log(err);

    if (err instanceof multer.MulterError) {

        return res.status(400).json({
            success: false,
            message: err.message,
        });

    }

    res.status(500).json({
        success: false,
        message: err.message || "Server Error",
    });

});

// ---------------- Server ----------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server Running On Port ${PORT}`);

});
