<template>
  <v-container grid-list-md>
    <!-- text-xs-center -->
    <v-layout row wrap>

      <LeftBarComponent/>
      <v-flex xs6>
        <router-view></router-view>
      </v-flex>
      <RightBarComponent/>

    </v-layout>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<script>
import LeftBarComponent from '../components/sideBarComponent/leftBarComponent'
import RightBarComponent from '../components/sideBarComponent/rightBarComponent'
import FullPageQuestion from '../components/contentComponent/fullpageQuestionComponent'
import QuestionCreate from '../components/contentComponent/questionCreateComponents'

import {mapActions, mapState} from 'vuex'

export default {
  name: 'Home',
  components: {
    LeftBarComponent,
    RightBarComponent,
    FullPageQuestion,
    QuestionCreate
  },
  data: function () {
    return {}
  },
  created() {    
    this.allQuestions()
    this.myQuestionsAct()
    this.setIslogin()
    this.setUserEmail()
  },
  methods: {
    ...mapActions(['allQuestions', 'myQuestionsAct', 'setIslogin', 'setUserEmail'])
  }
}
</script>

<style>
</style>
