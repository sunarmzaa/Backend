const express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
const router = express.Router();
const PORT = 9999;

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);

let income = 0;

router
  .route("/income")
  .get((req, res) => {
    res.send(income);
  })
  .put((req, res) => {
    user.name = req.body.name;
    res.send(income);
  });



  
app.listen(PORT, () => {
  console.log("Server running port ", PORT);
});