const routes = require('express').Router()
const { create, update, upvote, downvote } = require('../controllers/answerController')
const { isLogin, voteAnswerAuth, authAnswer } = require('../middleware')

routes.put('/update/:id', isLogin, authAnswer, update)
routes.post('/create/:id', isLogin, create) //id question
routes.post('/upvote/:id', isLogin, voteAnswerAuth, upvote) // id answer
routes.post('/downvote/:id', isLogin, voteAnswerAuth, downvote) // id answer

module.exports = routes