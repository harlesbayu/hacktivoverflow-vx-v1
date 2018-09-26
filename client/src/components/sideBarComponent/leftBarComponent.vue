<template>
  <v-flex xs3>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="allQuestion">All Question</v-toolbar-title>
    </v-toolbar>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="popularQuestion">Question Popular</v-toolbar-title>
    </v-toolbar>
    <v-toolbar color="teal" dark>
      <v-toolbar-title style="font-size:18px; cursor:pointer;" @click="mostAnswers">Most Answers</v-toolbar-title>
    </v-toolbar>
  </v-flex>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: 'LeftBarComponent',
  methods: {
    ...mapActions(['searchPopularQuestion', 'searchMostAnswers', 'allQuestions']),

    allQuestion: function () {
      this.allQuestions()
      this.$router.push('/')
    },
    mostAnswers: function () {
      this.searchMostAnswers()
      this.$router.push('/')
    },
    popularQuestion: function () {
      this.searchPopularQuestion()
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
