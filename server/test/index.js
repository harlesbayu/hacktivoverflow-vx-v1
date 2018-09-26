process.env.DATA_TESTING = 'test-app'
const chat = require('chai')
const expect = chai.expect
const chaiHTTP = require('chai-http')
const app = require('../app')
const assert = require('assert')

chai.use(chaiHTTP)

describe('User', function () {

  it('/POST user signup', function (done) {
    chai.request(app)
      .post('/users/signup')
      .send({
        name: 'anggara',
        email: 'anggara@mail.com',
        password: 'anggara'
      })
      .end(function (req,res) {
        expect(res.body.users).to.have.property('name')
        expect(res.body.users).to.have.property('email')
        expect(res.body.users).to.have.property('password')
      })

  })

})