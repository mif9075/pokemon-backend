var express = require('express');
var router = express.Router();
let teamController = require('./controllers/teamController')
let User = require('../users/models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/my-team/:email', (req,res,next)=>{

  User.findOne({ email: req.params.email })
      .then(result=>{
        teamController.getUserTeam(result.id)
          .then(results =>{
            res.json(results)
          })
      })
      .catch(error =>{
        res.status(error.message).json(message)
      })
})

router.post('/add-new-member', (req, res, next)=>{ 
    User.findOne({ email: req.body.email })
      .then(result=>{
        teamController.addNewMemberToteam(result._id, req.body)
        .then(updated =>{
            res.json(updated)
        })
        .catch(error =>{
          res.status(error.status).json(error)
        })
      })
      .catch(error =>{
        res.status(error.status.json(error))
      })

})


module.exports = router;
