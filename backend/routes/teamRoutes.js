// const express = require("express");

// const router = express.Router();

// const {
//   createMember,
//   getMembers,
//   updateMember,
//   deleteMember
// } = require("../controllers/teamController");

// router.post("/", createMember);

// router.get("/", getMembers);

// router.put("/:id", updateMember);

// router.delete("/:id", deleteMember);

// module.exports = router;

const express = require("express");

const router = express.Router();

const authMiddleware =
  require("../middleware/authMiddleware");

const {

  createMember,
  getMembers,
  updateMember,
  deleteMember

} = require("../controllers/teamController");


// PUBLIC ROUTE

router.get("/", getMembers);


// ADMIN ROUTES

router.post(
  "/",
  authMiddleware,
  createMember
);

router.put(
  "/:id",
  authMiddleware,
  updateMember
);

router.delete(
  "/:id",
  authMiddleware,
  deleteMember
);

module.exports = router;