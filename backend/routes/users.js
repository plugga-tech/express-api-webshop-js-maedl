const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();

// HÄMTA ALLA USERS // SKICKA INTE MED LÖSENORD // BARA ID, NAMN + EMAIL PÅ ALLA USERS
router.get('/', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');

  usersCollection.find().toArray()
  .then(results => {
    let users = [];

    for (let i = 0; i < results.length; i++) {
      delete results[i].password;
      users.push(results[i]);
    }

    res.json(users);
  })

});

// HÄMTA SPECIFIK USER // SKICKA HELA OBJEKTET
router.post('/', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');
  let id = req.body.id;
  let objectId = new ObjectId(id);

  usersCollection.findOne({_id: objectId})
  .then(result => {
    res.json(result);
  })

});

// SKAPA USER
router.post('/add', function(req, res) {

  let answer = {
   success: false,

  }

  const usersCollection = req.app.locals.db.collection('users');

  usersCollection.insertOne(req.body)
  .then(result => {
    answer.success = true;
    answer.id = result.insertedId;
    res.json(answer);
  })
})

// LOGGA IN USER
router.post('/login', function(req, res) {

  const usersCollection = req.app.locals.db.collection('users');

  const user = {
    user: req.body.username,
    pw: req.body.password
  }

  let answer = {
    loggedIn: false,
    user: '',
    id: ''
  }

  usersCollection.find().toArray()
  .then(users => {
    for (let i = 0; i < users.length; i++) {
      if (user.username === users[i].username && user.pw === users[i].password) {
        answer.loggedIn = true;
        answer.user = user;
        answer.id = users[i]._id;
      }
    }

    res.json(answer);
  })
  
})

module.exports = router;
