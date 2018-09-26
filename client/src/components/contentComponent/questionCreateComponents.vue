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

            <v-btn color="#009688" style="float: right" v-on:click="btnCreate"><span style=" color:#FFFFFF">CREATE</span></v-btn>
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
  name: 'CreateQuestions',
  data: function () {
    return {
      title: '',
      description: ''
    }
  },
  created: function () {
    if(this.isLogin == false){
        this.$router.push('/')
    }
  },
  methods: {
    ...mapActions(['allQuestions', 'myQuestionsAct']),

    btnCreate: function () {
      let data = {
        title: this.title,
        description: this.description
      }

      let self = this

      axios({
        method: 'post',
        url: `${config.port}/questions/create`,
        data,
        headers : {
          token : localStorage.getItem('token')
        }
      })
      .then(function (response) {
        self.title = ''
        self.description = ''
        self.allQuestions()
        self.myQuestionsAct()
        self.$router.push(`/questions/${response.data.question._id}`)
      })
      .catch(function (err) {
        console.log(err.response)
      })
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  watch: {
    isLogin: function (value) {
      if(value == false){
        this.$router.push('/')
      }
    }
  }
}
</script>
