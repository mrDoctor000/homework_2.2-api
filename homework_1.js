const express = require("express");
const app = express();

const restV1 = express.Router();

restV1.get("/users/", (req, res) => {

});

restV1.post("/users/", (req, res) => {


  const user = {
    'name': req.param.name,
    'score': req.param.name,
    toString() {
      return `name: ${this.name}
            score: ${this.score}`
    }
  }

  res.send(user);
});

app.use("/api/v1", restV1);