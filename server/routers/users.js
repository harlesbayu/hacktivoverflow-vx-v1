const routes = require('express').Router()
const { signup, signin, signinFb } = require('../controllers/usersController')

routes.post('/signup', signup)
routes.post('/signin', signin)
routes.post('/signinFb', signinFb)

module.exports = routes