const Post = require('../models/postSchema')

const seedData = require('./seed.json')

Post.deleteMany({}).then(() => {
  Post.insertMany(seedData, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("seed done");
    }
    process.exit();
  });
});