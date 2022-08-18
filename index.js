var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js')

// used to serve static files from the public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {
  // else create user
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

// all accounts
app.get('/account/all', function(req, res) {
  dal.all()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
    });
});

app.get('/account/deposit/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  });
});

app.get('/account/withdraw/:email/:amount', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.amount
  });
});

app.get('/account/deposit/:email/:balance', function (req, res) {
  res.send({
    email: req.params.email,
    amount: req.params.balance
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});