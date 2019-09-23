const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    signup: (params) => {
        console.log(params.email.email)
        return new Promise((resolve, reject) => {
            User.findOne({email: params.email.email})
                .then( user => {
                    if (!user) {
                        const newUser = new User({ 
                                            email: params.email.email, 
                                            password: params.email.password  
                                        })
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) 
                                    throw err;
                                newUser.password = hash;
                                newUser.save()
                                       .then( user => {
                                            const payload = {
                                                id: user._id,
                                                email: user.email
                                            }
                                            jwt.sign(payload, process.env.SECRET_KEY, {
                                                expiresIn: 3600
                                            }, (err, token) => {
                                                if (err) {
                                                    reject(err)
                                                } else {
                                                    let success = {}
                                                    success.confirmation = true;
                                                    success.token = `Bear ${token}`
                                                    resolve(success);
                                                    next()
                                                }
                                            })
                                       })
                                       .catch(error => {
                                            let errors = {}
                                            errors.status = 400;
                                            errors.message = error;
                                            reject(errors)
                    
                                       });
                            })
                        });              
                    } else {
                        
                        bcrypt
                            .compare(params.email.password, user.password)
                            .then( isMatch => {
                                if (isMatch) {
                                    const payload = {
                                        id: user._id, 
                                        email: user.email
                                    }
    
                                    jwt.sign(payload, process.env.SECRET_KEY, {
                                        expiresIn: 3600
                                    }, (err, token) => {
                                        if (err) {
                                            reject(err)
                                        } else {
                                            let success = {};
                                            success.token = `Bearer ${token}`
                                            resolve(success)
                                        }
                                    })
                                } else {
                                    let errors = {}
                                    errors.status = 401;
                                    errors.message = err
                                    reject(errors)
                                }
                              
                            })
                            .catch( error => {
                                let errors = {}
                                errors.status = 400;
                                errors.message = error;
                                reject(errors)
                            })
                    }
                })
                .catch(error => {
                    let errors = {}
                    errors.status = 400;
                    errors.message = error;
                    reject(errors)
                })
        })
    }
}