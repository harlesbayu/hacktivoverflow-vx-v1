const axios = require('axios')
const User = require('../models/user')
const jwt  = require('jsonwebtoken')
const {
  checkPassword
} = require('../helpers')

module.exports = {
  signup: function (req, res) {

    let dataUSer = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })

    dataUSer.save()
      .then(function (user) {
        res.status(201).json({
          user,
          message: `signup user success`
        })
      })
      .catch(function (err) {
        res.status(500).json({
          err
        })
      })
  },

  signin: function (req, res) {

    let dataUSer = null
    User.findOne({
        email: req.body.email
      })
      .then(function (user){
        
        dataUSer = user

        if (user) {
          return checkPassword(user.password, req.body.password, req.body.email)
        } else {
          res.status(404).json({
            message : `password and email didn't match`
          })
        }
      })
      .then(function (){
        jwt.sign({
          userId : dataUSer._id
        }, process.env.ACCESS_DATA, function(err,token){
          if(!err){
            res.status(200).json({
              name : dataUSer.name,
              email: dataUSer.email,
              token : token
            })
          } else {
            res.status(404).json({
              message : `password and email didn't match`
            })
          }

        })
      })
      .catch(function (){
        res.status(404).json({
          message : `password and email didn't match`
        })
      })

  },

  signinFb: function (req,res) {

    let newUser = null
    axios({
      method:'get',
      url:`https://graph.facebook.com/me?fields=email,name&access_token=${req.headers.token}`,
    })
    .then(function (result) {
      let newUser = result.data
      return User.findOne({email : newUser.email})
    .then(function (user) {

      if(user){

        let password = newUser.email + process.env.PASSWORD_FACEBOOK

        checkPassword(user.password, password, newUser.email)
        .then(function() {
          jwt.sign({
            userId : user._id
          }, process.env.ACCESS_DATA, function(err,token){
            if(!err){
              res.status(200).json({
                name : user.name,
                email: user.email,
                token : token
              })
            } else {
              console.log(err)
            }
          })
        })
      }else {
        let password = newUser.email + process.env.PASSWORD_FACEBOOK
        let dataUser = new User({
          name: newUser.name,
          email: newUser.email,
          password: password
        })
    
        dataUser.save()
          .then(function (userSignup) {
            jwt.sign({
              userId : user._id
            }, process.env.ACCESS_DATA, function(err,token){
              if(!err){
                res.status(200).json({
                  name : userSignup.name,
                  email: userSignup.email,
                  token : token
                })
              } else {
                console.log(err)
              }
            })
          })
          .catch(function (err) {
            console.log(err.response)
          })
      }

    })

    
    })

  }

}