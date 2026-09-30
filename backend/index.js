// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const dns = require("dns");
// const multer = require("multer");
// const streamifier = require("streamifier");
// const { v2: cloudinary } = require("cloudinary");

// dotenv.config();
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

// const app = express();

// app.use(cors());
// app.use(express.json());

// // ---------------- Cloudinary ----------------

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// console.log("Cloudinary Config");
// console.log("Cloud Name :", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("API Key :", process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing");
// console.log("API Secret :", process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing");

// // Test Cloudinary Connection
// cloudinary.api.ping()
//     .then((res) => {
//         console.log("✅ Cloudinary Connected");
//     })
//     .catch((err) => {
//         console.log("❌ Cloudinary Error");
//         console.log(err);
//     });

// // ---------------- Multer ----------------

// const storage = multer.memoryStorage();

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 5 * 1024 * 1024,
//     },
//     fileFilter(req, file, cb) {

//         const allowed = [
//             "image/jpeg",
//             "image/jpg",
//             "image/png",
//             "image/webp",
//             "image/gif"
//         ];

//         if (!allowed.includes(file.mimetype)) {
//             return cb(new Error("Only image files are allowed."));
//         }

//         cb(null, true);
//     },
// });

// const uploadToCloudinary = (buffer) => {
//     return new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//             {
//                 folder: "NewsMedia", // Cloudinary folder name
//                 resource_type: "image",

//                 transformation: [
//                     {
//                         width: 1200,
//                         height: 1200,
//                         crop: "limit",
//                         quality: "auto",
//                     },
//                 ],
//             },
//             (error, result) => {
//                 if (error) {
//                     console.error("Cloudinary upload error:", {
//                         message: error.message,
//                         httpCode: error.http_code,
//                         name: error.name,
//                         details: error.error,
//                     });

//                     return reject(error);
//                 }

//                 resolve(result);
//             }
//         );

//         uploadStream.end(buffer);
//     });
// };

// // ---------------- Upload API ----------------

// app.post("/api/upload", upload.single("image"), async (req, res) => {

//     try {

//         console.log("Upload API Called");

//         if (!req.file) {

//             return res.status(400).json({
//                 success: false,
//                 message: "No image received."
//             });

//         }

//         console.log("File Name :", req.file.originalname);
//         console.log("File Size :", req.file.size);
//         console.log("Mime Type :", req.file.mimetype);

//         const result = await uploadToCloudinary(req.file.buffer);

//         console.log(result);

//         return res.status(200).json({

//             success: true,
//             message: "Image Uploaded Successfully",

//             image: {
//                 url: result.secure_url,
//                 public_id: result.public_id,
//                 width: result.width,
//                 height: result.height,
//                 format: result.format,
//             }

//         });

//     } catch (err) {

//         console.log("Upload Error");
//         console.log(err);

//         return res.status(500).json({

//             success: false,
//             message: err.message

//         });

//     }

// });

// // ---------------- MongoDB ----------------

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {

//         console.log("MongoDB Connected");

//     })
//     .catch((err) => {

//         console.log("MongoDB Error");
//         console.log(err);

//     });

// // ---------------- Routes ----------------

// app.use("/api/admin", require("./routes/adminRoutes"));
// app.use("/api/team", require("./routes/teamRoutes"));

// // ---------------- Error Handler ----------------

// app.use((err, req, res, next) => {

//     console.log(err);

//     if (err instanceof multer.MulterError) {

//         return res.status(400).json({
//             success: false,
//             message: err.message,
//         });

//     }

//     res.status(500).json({
//         success: false,
//         message: err.message || "Server Error",
//     });

// });

// // ---------------- Server ----------------

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {

//     console.log(`Server Running On Port ${PORT}`);

// });


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

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "NewsMedia",
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

// ---------------- Health Check (Render sleep prevent) ----------------

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is awake",
        time: new Date().toISOString(),
    });
});

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "JEE India News API is running",
    });
});

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