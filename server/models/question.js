const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  postBy: { type: Schema.Types.ObjectId, ref: 'User' },
  upvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
},{
  timestamps : true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question