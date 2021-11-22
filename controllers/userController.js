const express = require('express')
const router = express.Router()
const User = require("../models/userSchema");

//shows all users
router.get("/", (req, res) => {
  User.find().then((user) => {
    res.json({ status: 200, user: user });
  });
});

//create user
router.post('/', (req,res) =>{
  const{name,email,password} = req.body
  if(!name || !email || !password){
      res.status(422).json({error:"Please add all fields"})
  }
  User.findOne({email:email})
  .then((savedUser) =>{
      if(savedUser){
          return res.status(422).json({error:"user already exists with that email"})
      }
      User.create(req.body)
      .then(user => {
          res.json({status: 200, user: user})
      })
      .catch(err => {
          console.log(err)
      }) 
  })
  .catch(err => {
      console.log(err)
  })
})

//delete user
router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then(() => {
    res.status(204).json();
  });
});

//update user
router.put('/:id', (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id}, req.body,  {new: true})
      .then(user => res.status(200).json({status: 200, user: user}))
})

module.exports = router 