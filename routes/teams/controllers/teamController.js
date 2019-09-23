const Team =  require('../models/Team');
const uuid = require('uuid/v4');
const User = require('../../users/models/User');

module.exports = {
    getUserTeam: (id)=>{
        return new Promise((resolve, reject)=>{
            team.findOne({ owner: id})
            .then(team =>{
                resolve(team)
            })
            .catch(error =>{
                let errors = {}
                errors.status = 400
                errors.message = error
                reject(errors)
            })
        })
       
    },
    createUserteam: (req, res) =>{
        console.log(req.body)
        User.findOne({ email: req.body.email })
            .then(result =>{
                let newteam = new Team();
                newteam.owner = result._id

             newteam.save((error) =>{
                if(error) {
                    let errors = {}
                    errors.status  = 400;
                    errors.message =  error
                    res.status(errors.status).json(error)
                 } 
                 })
            })
            .catch(error =>{
                let errors = {}
                errors.status = 400;
                errors.message = error

                res.status(errors.status).json(error)
            })
        
    },

    addNewMemberToteam: (params) => {
      return new Promise((resolve, reject)=>{
          Team.findOne({ owner: params.id})
            .then(member =>{
                member.pokemons.push({
                    id: uuid(),
                    name: params,
                    image: params,

                })

                member.save()
                    .then(result  =>{
                        resolve(result)
                    })
                    .catch(error =>{
                        let errors = {}
                        errors.status = 400
                        errors.message = error
                        
                        reject(errors)
                    })
            })
      })
    }
}