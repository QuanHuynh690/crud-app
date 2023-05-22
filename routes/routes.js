const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");

// image upload
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

let upload = multer({
  storage: storage,
}).single("image");

//add user to db
router.post("/user", upload, async (req, res) => {
  try {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      title: req.body.title,
      study: req.body.study,
      work: req.body.work,
      description: req.body.description,
      socialMedia: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        youtube: req.body.youtube,
      },
      image: req.file.filename,
    });
    await user.save();
    req.session.message = {
      type: "success",
      message: "User added successfully",
    };
    res.json({ message: "User added successfully", type: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message, type: "danger" });
  }
});

//get user list
router.get("/user", (req, res) => {
  User.find()
    .exec()
    .then((users) => {
      res.json({ data: users });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//get one user
router.get("/user/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id)
    .then((user) => {
      res.json({ user: user });
    })
    .catch((err) => {
      res.json({ message: err.message });
    });
});

//edit user
router.put("/user/:id", upload, async (req, res) => {
  let id = req.params.id;
  // let newImage = "";
  // if (req.file) {
  //   newImage = req.file.filename;
  //   try {
  //     fs.unlinkSync(req.file.fileName)
  //   }
  // }
  const updatedData = req.body;
  User.findByIdAndUpdate(id, updatedData, { new: true })
    .then((updatedUser) => {
      if (updatedUser) {
        res.json({ user: updatedUser });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

//delete user
// router.del("/user/:id", (req, res) => {
//   let id = req.params.id;
//   User.findById(id)
//     .then((user) => {
//       res.json({ user: user });
//     })
//     .catch((err) => {
//       res.json({ message: err.message });
//     });
// });
module.exports = router;
