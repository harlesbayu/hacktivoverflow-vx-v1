const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Question = require('../models/question')
const Answer = require('../models/answer')

module.exports = {

  isLogin: function (req,res,next) {

    let token = req.headers.token
    if (token) {
      jwt.verify(token, process.env.ACCESS_DATA, function (err, decoded) {
        if(!err){
          User.findById(decoded.userId)
          .then(function (user) {
            req.userId = user._id
            next()
          })
        }else {
          res.status(500).json({
            message : `access danied`
          })
        }
      })
    } else {
      res.status(500).json({
        message : `access danied`
      })
    }
    
  },

  authQuestion: function (req,res,next) {

    Question.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (question) {
      if (String(question.postBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access danied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access danied`
      })
    })

  },

  authAnswer: function (req,res,next) {

    Answer.findOne({_id : req.params.id})
    .populate('answerBy')
    .then(function (answer) {
      if (String(answer.answerBy._id) == String(req.userId)) {
        next()
      } else {
        res.status(500).json({
          message : `access danied`
        })
      }

    })
    .catch(function () {
      res.status(500).json({
        message : `access danied`
      })
    })

  },

  voteAuth: function (req,res,next) {
    Question.findOne({_id : req.params.id})
    .populate('postBy')
    .then(function (question) {

      if (String(question.postBy._id) == String(req.userId)) {
        res.status(500).json({
          message : `you can't vote on your own`
        })
      } else {
        next()
      }
    })
    .catch(function () {
      res.status(500).json({
        message : `you can't vote on your own`
      })
    })
  },

  voteAnswerAuth: function (req,res,next) {

    Answer.findOne({_id : req.params.id})
    .populate('answerBy')
    .then(function (answer) {
      if (String(answer.answerBy._id) == String(req.userId)) {
        res.status(500).json({
          message : `you can't vote on your own`
        })
      } else {
        next()
      }
    })
    .catch(function () {
      res.status(500).json({
        message : `you can't vote on your own`
      })
    })
  }

}