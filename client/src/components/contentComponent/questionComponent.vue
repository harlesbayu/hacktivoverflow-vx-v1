<template>
  <div>
    <v-flex v-for="(question, index) in questions.questions" :key="index">
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">{{ question.title }}</div>
            <div class="icon">
              <v-icon v-on:click="downvoteQuestion(question._id)">thumb_down</v-icon><span class="iconQuestion">({{ question.downvote.length }})</span>
              <v-icon v-on:click="upvoteQuestion(question._id)">thumb_up</v-icon><span class="iconQuestion">({{ question.upvote.length}})</span>
              <v-icon>mode_comment</v-icon><span class="iconQuestion">({{ question.answers.length }})</span>
            </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat>Share</v-btn>

          
          
          <router-link :to="{ path : `/questions/${question._id}` }"><v-btn flat color="purple">Read More</v-btn></router-link>
          <div v-if="question.postBy">
            <div class="btnAccess" v-if="question.postBy.email == userEmail">
              <router-link :to="{ path : `/questions/update/${question._id}` }">
                <v-btn color="#009688" style="color:#FFFFFF">Update</v-btn>
              </router-link>
              <v-btn color="#009688" style="color:#FFFFFF; margin-left:5px;" v-on:click="btnDelete(question._id)">Delete</v-btn>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </div>
</template>

<script>

import config from '../../../config.js'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'QuestionsCollection',
  data: function () {
    return {}
  },
  created: function () {
    this.allQuestions()
  },
  methods: {

    ...mapActions(['allQuestions', 'myQuestionsAct','downvoteQuestion', 'upvoteQuestion']),

    btnDelete: function (questionId){
      
      let self = this
      axios({
        method: 'delete',
        url: `${config.port}/questions/remove/${questionId}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function () {
        self.allQuestions()
        self.myQuestionsAct()
      })
      .catch(function (err) {
        console.log(err.response)
      })
    }

  },
  computed: {
    ...mapState(['questions', 'isLogin', 'userEmail'])
  }

}
</script>

<style scoped>
  .icon {
    margin-top: 15px;
  }
  .iconQuestion {
    margin-right: 8px;
  }

  .btnAccess {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #FFFFFF;
  }
</style>
