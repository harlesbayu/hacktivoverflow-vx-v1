<template>
  <v-flex xs3 v-if="isLogin">
    <v-card>
        <v-toolbar color="#009688" style="color:#FFFFFF;">
          <v-toolbar-title>My Questions</v-toolbar-title>
        </v-toolbar>

        <div>
          <div  v-for="(question, index) in myQuestions" :key="index">
            <v-layout row wrap>
              <v-flex xs8>
                <v-toolbar>
                  <router-link :to="{ path : `/questions/${question._id}` }">
                    <v-toolbar-title style="font-size:12px; color:#009688">{{ question.title.slice(0,10) }} ... </v-toolbar-title>
                  </router-link>
                </v-toolbar>
              </v-flex>
              <v-flex xs4>
                <v-toolbar>
                  <router-link :to="{ path : `/questions/update/${question._id}` }">
                    <v-icon>update</v-icon>
                  </router-link>
                  <v-icon v-on:click="btnDelete(question._id)">delete</v-icon>
                </v-toolbar>
              </v-flex>
            </v-layout>
          </div>
        </div>
      </v-card>

  </v-flex>
</template>

<script>
import config from '../../../config.js'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'RightBarComponent',
  created: function () {
    
  },
  methods: {
    ...mapActions(['allQuestions', 'myQuestionsAct']),

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
    ...mapState(['myQuestions', 'isLogin'])
  }
}
</script>

<style>

</style>
