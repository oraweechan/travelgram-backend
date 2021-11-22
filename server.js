const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
// require("dotenv").config();

const PORT = process.env.PORT || 8080

const postController = require("./controllers/postController");
const userController = require("./controllers/userController");


app.use(cors());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/posts", postController);
app.use("/users", userController);


// Default Route
app.get("/", (req, res) => {
  // add redirect at some point
  // res.status(200).json({
  //     "status": 200,
  //     "msg" : "server is up and running"
  // })
  // Cannot set headers after they are sent to the client
  // res.send('hello')
  res.redirect('/posts')
});

app.set('port', PORT)

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

