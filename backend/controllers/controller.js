const express = require("express");
const victim = require("../models/victim");
const admin = require("../models/admin");
const imagekit = require("imagekit");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   pass: {
//     type: String,
//     required: true,
//   },
//   region: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   pincode: {
//     type: String,
//     required: true,
//   },

// });
exports.registervictim = async (req, res) => {
  try {
    const { name, email, pass, region, state, pincode } = req.body;
    const newvictim = new victim({ name, email, pass, region, state, pincode });
    await newvictim.save();
    res.status(200).json({
      message: "Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.loginvictim = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const victims = await victim.findOne({ email });
    if (victims) {
      if (victims.pass === password) {
        res.status(200).json({
          message: "Logged In Successfully",
          id: victims._id,
          victim: victims,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(401).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.loginadmin = async (req, res) => {
  try {
    const { adminid, pass } = req.body;
    const admins = await admin.findOne({ adminid });
    if (admins) {
      if (admins.pass === pass) {
        res.status(200).json({
          message: "Logged In Successfully",
          id: admins._id,
          admin: admins,
        });
      } else {
        res.status(401).json({
          message: "Invalid Credentials",
        });
      }
    } else {
      res.status(401).json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.addcase = async (req, res) => {
  try {
    const id = req.params.id;
    //       title: String,
    //   description: String,
    //   approve: Boolean
    const { title, description, approve } = req.body;
    const cases1 = {
      title,
      description,
      approve,
    };
    const vict = await victim.findOneAndUpdate(
      { _id: id },
      { $push: { cases: cases1 } },
      { new: true }
    );
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.grantapproval = async (req, res) => {
  try {
    const id = req.params.id;
    const vict = await victim.findOne({ "cases._id": id });

    // Find the index of the case with the given id
    const caseIndex = vict.cases.findIndex((c) => c._id == id);

    // Update the 'approve' field of the case
    vict.cases[caseIndex].approve = true;

    // Save the updated victim document
    await vict.save();

    console.log(vict);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getFalseApprovedCases = async (req, res) => {
  try {
    const falseApprovedCases = await victim.aggregate([
      // Match documents where at least one case has approve: false
      {
        $match: {
          "cases.approve": false,
        },
      },
      // Unwind the cases array to deconstruct it
      {
        $unwind: "$cases",
      },
      // Match only the cases where approve is false
      {
        $match: {
          "cases.approve": false,
        },
      },
    ]);
    res.status(200).send({ cases: falseApprovedCases });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//  name: {
//     type: String,
//     required: true,
//   },
//   adminid: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   pass: {
//     type: String,
//     required: true,
//   },
//   region: {
//     type: String,
//     required: true,
//   },
//   state: {
//     type: String,
//     required: true,
//   },
//   pincode: {
//     type: String,
//     required: true,
//   },
exports.registeradmin = async (req, res) => {
  try {
    const { name, adminid, pass, region, state, pincode } = req.body;
    const newAdmin = new admin({ name, adminid, pass, region, state, pincode });
    await newAdmin.save();
    res.status(200).json({
      message: "Admin Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
exports.getAllVictims = async (req, res) => {
  try {
    const victims = await victim.find();
    res.status(200).send({ victims });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.fetchsinglevictim = async (req, res) => {
  try {
    const id = req.params.id;
    const victims = await victim.findOne({ _id: id });
    res.status(200).send({ victims });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const storageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Set the destination path
  }, // path
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const imagekitClient = new imagekit({
  publicKey: process.env.UPLOAD_PUBLIC,
  privateKey: process.env.UPLOAD_PRIVATE,

  urlEndpoint: "https://ik.imagekit.io/j1n1a7fbw",
});
exports.upload = multer({
  storage: storageEngine,
});
exports.newCase = async (req, res) => {
  if (req.files) {
    const { id } = req.params;
    console.log(id);
    const { title, description } = req.body;
    const { evidence } = req.files;
    try {
      const img1 = fs.readFileSync(evidence[0].path);
      const base1 = img1.toString("base64");

      const image1UploadResult = await imagekitClient.upload({
        file: base1,
        fileName: evidence[0].originalname,
      });
      const newCase = {
        title,
        description,
        approve: false,
        evidence: image1UploadResult.url,
      };
      await victim.findOneAndUpdate(
        { _id: id },
        { $push: { cases: newCase } },
        { new: true }
      );

      res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("INVALID");
  }
};
