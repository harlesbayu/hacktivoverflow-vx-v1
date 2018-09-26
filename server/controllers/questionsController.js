const Question = require('../models/question')

module.exports = {

  findAll: function (req,res) {
    Question.find()
    .sort([['createdAt', 'descending']])
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  findQuestionUser: function (req,res) {
    Question.findById(req.params.id)
    .populate('postBy')
    .populate({path : 'answers', populate : {path : 'answerBy'}})
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  myQuestions: function (req,res) {
    Question.find({postBy : req.userId})
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  create: function (req,res) {
    
    let dataQuestion = new Question ({
      title: req.body.title,
      description: req.body.description,
      postBy: req.userId
    })

    dataQuestion.save()
    .then(function (question) {
      res.status(201).json({
        question,
        message: `create question success`
      })
    })

  },

  update: function (req, res) {

    Question.update(
      { _id : req.params.id },
      {
        title : req.body.title,
        description : req.body.description
      }
    )
    .then(function () {
      res.status(200).json({
        message: `updated question success`  
      })
    })

  },

  upvote: function (req,res) {

    Question.findById(req.params.id)
    .populate(
      { path: 'upvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (question) {
      if(question.upvote.length === 0){
        Question.update( { _id: req.params.id },
          { $push: { upvote: req.userId } })
          .then(function () {
            Question.update( { _id: req.params.id },
              { $pull: { downvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  message: `upvote success`
                })
              })
          })
      } else {
        res.status(500).json({
          message: `you can't upvote again`
        })
      }
    })

  },
  
  downvote: function (req,res) {

    Question.findById(req.params.id)
    .populate(
      { path: 'downvote',
        match: { _id : { $eq: req.userId }}}
    )
    .then(function (question) {
      if(question.downvote.length === 0){
        Question.findByIdAndUpdate(req.params.id,
          { $push: { downvote: req.userId } })
          .then(function () {
            Question.findByIdAndUpdate(req.params.id,
              { $pull: { upvote: req.userId } })
              .then(function () {
                res.status(201).json({
                  message: `upvote success`
                })
              })
          })
          .catch(function(err) {
            res.status(500).json({
              message: `you can't upvote again`
            })
          })
      } else {
        res.status(500).json({
          message: `you can't upvote again`
        })
      }
    })

  },

  remove: function (req,res) {
    Question.findByIdAndRemove(req.params.id)
    .then(function () {
      res.status(200).json({
        message: `delete question success`  
      })
    })
  },

  mostAnswer: function (req,res) {
    Question.find().sort({answers: -1}).limit(10)
    .populate('answers')
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })
  },

  popularQuestions: function (req,res) {

    Question.find()
    .sort({upvote: -1}).limit(10)
    .populate('answers')
    .populate('postBy')
    .then(function (questions) {
      res.status(200).json({
        questions
      })
    })

  },

  searchQuestuon: function(req,res){

    Question.find({title: new RegExp(req.query.title, 'i')})
    .sort([['createdAt', 'descending']])
    .populate('postBy')
    .then(function(questions){
        res.status(200).json({
          questions
        })
    })
},

}