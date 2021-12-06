const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userSchema");

//shows all users
router.get("/", (req, res) => {
  User.find().then((user) => {
    res.json({ status: 200, user: user });
  });
});

//get info for one user
router.get("/:user", (req,res) => {
  User.findOne({username: req.params.user}).then((user) => {
    res.json({status:200, user:user})
  })
})

//create post for user
router.post("/newpost/:user", (req, res) => {
  User.updateOne(
    {
      username: req.params.user,
    },
    {
      $push: { posts: req.body },
      //   $set: {likes : req.body}
    }
  ).then((user) => res.status(201).json({ status: 201, user: user }));
  // .catch((error) => console.log(error));
});

//delete post for user
router.delete("/:user/:postId", (req, res) => {
  User.updateOne(
    {
      username: req.params.user,
    },
    {
      $pull: { posts: { _id: req.params.postId } },
    }
  )
    .then((post) => res.status(205).json({ status: 201, post: post }))
    .catch((error) => console.log(error));
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, password, username } = req.body;
    // validate
    if (!name || !email || !password || !username)
      return res.status(422).json({ error: "Please add all fields" });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: passwordHash,
      username,
      name,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Please add all fields." });
    const existingUser = await User.findOne({ email: email });
    if (!existingUser)
      return res.status(400).json({ msg: "Invalid Email or password." });
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid Email or password." });
    const token = jwt.sign({ id: existingUser._id }, "secret");
    res.status(200).json({
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        name: existingUser.name
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if token is valid
router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "secret");
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
  });
});

module.exports = router;
