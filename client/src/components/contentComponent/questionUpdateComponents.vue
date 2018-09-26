<template>
  <v-flex xs12>
    <v-card>
      <v-form>
        <v-container>
          <v-layout row wrap>

            <v-flex xs12>
            <v-text-field label="Question" solo  v-model="title"></v-text-field>
            <v-textarea
              solo
              label="Description"
              v-model="description"
            ></v-textarea>

            <v-btn color="#009688" style="float: right" v-on:click="btnUpdate"><span style=" color:#FFFFFF">UPDATE</span></v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-card>
  </v-flex>
</template>

<script>

import config from '../../../config.js'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'UpdateQuestions',
  data: function () {
    return {
      title: '',
      description: ''
    }
  },
  created: function () {
    let questionId = this.$route.params.id
    let self = this
    this.findOneQuestion(questionId)
    .then(function (response){
      self.title = response.title
      self.description = response.description
    })
  },
  methods: {
    ...mapActions(['findOneQuestion', 'allQuestions', 'myQuestionsAct']),

    btnUpdate: function () {

      let questionId = this.$route.params.id
      let self = this

      let data = {
        title: this.title,
        description: this.description
      }

      axios({
        method: 'put',
        url: `${config.port}/questions/update/${questionId}`,
        data,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(function () {
        self.title = ''
        self.description = ''
        self.allQuestions()
        self.myQuestionsAct()
        self.$router.push('/')
      })
      .catch(function (err) {
        console.log(err.response)
      })
      
    }
  }
}
</script>
