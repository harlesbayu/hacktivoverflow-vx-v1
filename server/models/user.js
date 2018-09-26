const mongoose = require('mongoose')
const Schema = mongoose.Schema
const uniqueValidator = require('mongoose-unique-validator')
const { generatePassword } = require('../helpers')

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required']
  },
  password: {
    type: String,
    required: [true, 'passwword is required']
  }
}, {
  timestamps: true
})

userSchema.post('save', function(user) {

    generatePassword(this.email, this.password)
    .then(function(newPassword){
        User.update(
            { _id : user._id},
            { password : newPassword}
        )
        .then(function(){})
        .catch(function(){})
    })

})

userSchema.post('save', function(error, user, next) {

  if (error.name === 'MongoError' && error.code === 11000) {
    next('email must be unique')
  } else {
    next(error)
  }

})

const User = mongoose.model('User', userSchema)

module.exports = User