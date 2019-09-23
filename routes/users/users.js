var express = require('express');
var router = express.Router();
var userController = require('./controllers/userController');
let teamController = require('../teams/controllers/teamController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up-and-sign-in', function(req, res, next) {
    // console.log(req.body)
  userController.signup(req.body, res, next)
    .then(user =>{
      res.json(user)
    })
    .catch(error =>{
      console.log(error)
    })
}, teamController.createUserteam);


module.exports = router;
