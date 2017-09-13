const express = require('express');
const app = express();
app.listen(1337);

const restV1 = express.Router();

const users = [{
    name: 'Egor',
    score: '1290'
  },
  {
    name: 'Stepan',
    score: '1570'
  }
];

restV1.get('/users/', (req, res) => {
  res.json(users);
});

restV1.post('/users/:name/score/:score', (req, res) => {

  const user = {
    name: req.params.name,
    score: req.params.score
  };
  console.log(users.find(el => { return el.name === req.params.name }));

  if (users.find(el => { return el.name === req.params.name }) === undefined) {
    users.push(user);

    res.json(users);
  } else {
    res.sendStatus(400);
  }

});

restV1.delete('/users/:name/', (req, res) => {
  const index = users.findIndex((el) => {
    return el.name === req.params.name;
  });

  if (index >= 0) {
    users.splice(index, 1);

    res.json(users);
  } else {
    res.sendStatus(404);
  }

})

restV1.put('/users/:name/score/:score', (req, res) => {
  const element = users.find(el => {
    if (el.name === req.params.name) {
      el.score = req.params.score;
      return true;
    } else {
      return false;
    }
  });

  if (element === undefined) {
    res.sendStatus(404);
  } else {
    res.json(users);
  }

});


app.use('/api/v1', restV1);