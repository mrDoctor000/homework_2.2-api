var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/json
app.use(bodyParser.json())
app.use(function(req, res, next) {
  console.log(req.body) // populated!
  next()
})

app.listen(3000);

const users = [{
    name: 'Egor',
    score: '1290'
  },
  {
    name: 'Stepan',
    score: '1570'
  }
];

const RPC = {
  'read_user': function(name, callback) {
    users.find(el => {
      if (el.name === name) {
        callback(0, el)
      } else {
        callback(404, null);
      }
    });
  },
  'add_user': function(params, callback) {
    if (users.find(el => { return el.name === req.params.name }) === undefined) {
      users.push(params);
      callback(0, users);
    } else {
      callback(400, null);
    }
  },
  'delete_user': function(name, callback) {
    const index = users.findIndex((el) => {
      return el.name === name;
    });

    if (index >= 0) {
      users.splice(index, 1);

      callback(0, users)
    } else {
      callback(404, null)
    }
  },
  'update_user': function(name, score, callback) {
    const element = users.find(el => {
      if (el.name === name) {
        el.score = score;
        return true;
      } else {
        return false;
      }
    });

    if (element === undefined) {
      callback(404, null);
    } else {
      callback(0, users);
    }
  }
}


app.post("/rpc", function(req, res) {
  console.log(req.body);

  const method = RPC[req.body.method];
  method(req.body.params, function(error, result) {
    if (error !== 0) {
      res.sendStatus(error)
    } else { res.json(result); }

  });
});