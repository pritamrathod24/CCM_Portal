const express = require("express");
const router = express.Router();

const {
  registervictim,
  loginvictim,
  addcase,
  grantapproval,
  getFalseApprovedCases,
  registeradmin,
  loginadmin,
  getAllVictims,
  fetchsinglevictim,
  newCase,
  upload,
} = require("../controllers/controller");

router.post("/victim_register", registervictim);
router.post("/victim_login", loginvictim);
router.post("/add_cases/:id", addcase);
router.post("/grant_approval/:id", grantapproval);
router.get("/false_cases", getFalseApprovedCases);
router.post("/admin_register", registeradmin);
router.post("/admin_login", loginadmin);
router.post("/new_case/:id", upload.fields([{ name: "evidence" }]), newCase);
router.get("/fetch_victims", getAllVictims);
router.get("/fetch_single/:id", fetchsinglevictim);
module.exports = router;
