const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// require("dotenv").config();
const postController = require("./controllers/postController");

// const PORT = process.env.PORT;

app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/post", postController);

app.listen(4000, () => {
  console.log("server running on port 4000");
});
