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

require("dotenv").config();

const app = express();


// MIDDLEWARE

app.use(cors());

app.use(express.json());


// DATABASE

mongoose.connect(process.env.MONGO_URI)

.then(() => {
  console.log("MongoDB Connected");
})

.catch((err) => {
  console.log(err);
});


// ROUTES

app.use(
  "/api/team",
  require("./routes/teamRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);


// SERVER

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running on ${PORT}`
  );
});