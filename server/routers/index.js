const routes     = require('express').Router()
const routerUser = require('./users')
const routerQuestion = require('./questions')
const routerAnswer = require('./answer')

routes.use('/users', routerUser)
routes.use('/questions', routerQuestion)
routes.use('/answers', routerAnswer)

module.exports = routes