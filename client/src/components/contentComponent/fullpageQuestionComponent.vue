<template>
  <div>
    <v-flex xs12>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ question.title }}</div>
          </div>
        </v-card-title>

        <hr style="color: #009688">
        <v-card class="fieldQuestion">
            <div style="margin: 10px 0;">
              <h3 v-if="question.postBy">{{ question.postBy.name }}</h3>
              <p>
                {{ question.description }}
              </p>
            </div>

            <div class="icon">
              <v-icon v-on:click="downvoteQuestion(question._id)">thumb_down</v-icon><span class="iconQuestion" v-if="question.downvote">({{ question.downvote.length }})</span>
              <v-icon v-on:click="upvoteQuestion(question._id)">thumb_up</v-icon><span class="iconQuestion" v-if="question.upvote">({{ question.upvote.length }})</span>
              <v-icon>mode_comment</v-icon><span class="iconQuestion"  v-if="question.answers">({{ question.answers.length }})</span>
            </div>
        </v-card>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="boxComment">
        <h3 v-if="question.answers">Answer ({{ question.answers.length }})</h3>
        <v-card color="#4DB6AC" class="white--text boxAnswer" v-for="(answer, index) in question.answers" :key="index">
          <div style="padding: 10px;">
            <div style="display:block;">Post by : {{ answer.answerBy.name }}</div>
            <div style="text-align:justify;">
              {{ answer.description }}
            </div>
          </div>
          <div>
            <v-card-actions>
              <v-icon v-on:click="downvoteAnswer(answer._id)">thumb_down</v-icon><span class="iconQuestion" >({{ answer.downvote.length }})</span>
              <v-icon v-on:click="upvoteAnswer(answer._id)">thumb_up</v-icon><span class="iconQuestion">({{ answer.upvote.length }})</span>
              <ModalUpdateAnswer @updatesuccess="updateSuccess" v-bind:answer="answer" class="btnUpdate" v-if="userEmail === answer.answerBy.email"/>
            </v-card-actions>
          </div>
        </v-card>
      </v-card>
    </v-flex>

    <v-flex xs12>
      <v-card class="boxComment">
        <h3>Ask Question</h3>
        <v-textarea
          box
          name="input-7-4"
          v-model="answerDescription"
        ></v-textarea>
        <v-btn color="#009688" style="float:right; color: #FFFFFF;" v-on:click="btnAnswer(question._id)">Post Your Answer</v-btn>
      </v-card>
    </v-flex>

  </div>
</template>

<script>

import config from '../../../config.js'
import ModalUpdateAnswer from '../contentComponent/modalUpdateAnswer'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FullPageQuestions',
  components : {
    ModalUpdateAnswer
  },
  data: function () {
    return {
      question: '',
      answerDescription: '',
      alertComment: false,
    }
  },
  created: function () {
    this.documentReady()
  },
  methods: {
    ...mapActions(['findOneQuestion','createAnswer', 'upvoteQuestion', 'downvoteQuestion']),

    documentReady: function () {

      let articleId = this.$route.params.id
      let self = this
      
      this.findOneQuestion(articleId)
      .then(function (response) {
        self.question = response
      })
  
    },
    btnAnswer: function (questionId){
      let data = {
        questionId,
        description : this.answerDescription
      }

      let self = this

      this.createAnswer(data)
      .then(function (response){
        self.answerDescription = ''
        self.documentReady()
      })
      .catch(function(err){
        self.alertComment = true
      })
    },
    downvoteQuestion: function (questionId) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/questions/downvote/${questionId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        self.documentReady()
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    upvoteQuestion: function (questionId) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/questions/upvote/${questionId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        self.documentReady()
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    downvoteAnswer: function (answerId) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/answers/downvote/${answerId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        self.documentReady()
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    upvoteAnswer: function (answerId) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/answers/upvote/${answerId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        self.documentReady()
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    updateSuccess: function () {
      this.documentReady()
    }
  },
  computed: {
      ...mapState(['userEmail']),
      getQuestionsIdFormParams: {
        get: function () {
          return this.$route.params.id
        }
      }
    },
  watch: {
    getQuestionsIdFormParams: function (articleId) {
      let self = this
    
      this.findOneQuestion(articleId)
      .then(function (response) {
        self.question = response
      })
    }
  }
}
</script>

<style scoped>
  .icon {
    margin-top: 4px;
  }

  .icon .iconQuestion {
    display: inline-block;
    margin: 10px 10px 30px 0;;
  }

  .fieldQuestion {
    padding: 0 14px;
  }

  .boxAnswer {
    margin-bottom: 10px;
  }

  .btnUpdate {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #FFFFFF;
  }

  .boxComment {
    padding: 14px;
    overflow: hidden;
  }
</style>
