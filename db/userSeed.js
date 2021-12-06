const User = require('../models/userSchema')

const seedData = require('./seed.json')

User.deleteMany({}).then(() => {
  User.insertMany(seedData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("seed done");
    }
    process.exit();
  });
});