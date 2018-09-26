const routes = require('express').Router()
const { create, findAll, findQuestionUser, myQuestions, mostAnswer, update, remove, upvote, downvote } = require('../controllers/questionsController')
const { isLogin, authQuestion, voteAuth } = require('../middleware')

routes.get('/', findAll)
routes.get('/findQuestionUser/:id', findQuestionUser) // findOne/OnePgae
routes.get('/myQuestions', isLogin, myQuestions)
routes.get('/mostAnswers', mostAnswer)
routes.post('/create', isLogin, create)
routes.delete('/remove/:id', isLogin, authQuestion, remove)
routes.put('/update/:id', isLogin, authQuestion, update) // id question
routes.post('/upvote/:id', isLogin, voteAuth, upvote) // id question
routes.post('/downvote/:id', isLogin, voteAuth, downvote) // id question

module.exports = routes