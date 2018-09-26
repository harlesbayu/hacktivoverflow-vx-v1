import config from '../config'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { promises, stat } from 'fs';

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    questions: [],
    myQuestions: [],
    userEmail: '',
    isLogin: false
  },
  mutations: {
    getIsLogin: function(state, payload) {
      state.isLogin = payload
    },
    getAllQuestion: function(state, payload) {
      state.questions = payload
    },
    getMyQuestions: function(state, payload) {
      state.myQuestions = payload
    },
    getUserEmail: function (state, payload) {
      state.userEmail = payload
    }
  },
  actions: {
    setIslogin: function ({commit, dispatch}) {
      let token = localStorage.getItem('token')
      if(token) {
        commit('getIsLogin', true)
      } else {
        commit('getIsLogin', false)
      }
    },
    setUserEmail: function ({commit, dispatch}) {
      let email = localStorage.getItem('email')
      commit('getUserEmail', email)
    },
    allQuestions: function ({commit}, payload) {

      axios({
        method: 'get',
        url: `${config.port}/questions`
      })
        .then(function (response) {
          console.log(response)
          commit('getAllQuestion', response.data)
        })
        .catch(function (err) {
          console.log(err.response)
        })
    },
    findOneQuestion: function ({commit, dispatch}, payload) {
      return new Promise(function(resolve, reject) {
        axios({
          method: 'get',
          url: `${config.port}/questions/findQuestionUser/${payload}`
        })
        .then(function (response){
          resolve(response.data.questions)
        })
        .catch(function (err){
          console.log(err.response)
        })
      })
    },
    myQuestionsAct: function ({commit, dispatch}, payload) {
      axios({
        method: 'get',
        url: `${config.port}/questions/myQuestions`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (response){
        commit('getMyQuestions', response.data.questions)
      })
      .catch(function (err){
        // console.log(err.response)
      })
    },
    downvoteQuestion: function ({commit, dispatch}, payload) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/questions/downvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        dispatch('allQuestions')
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    upvoteQuestion: function ({commit, dispatch}, payload) {
      let self = this
      axios({
        method: 'post',
        url: `${config.port}/questions/upvote/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function (){
        dispatch('allQuestions') 
      })
      .catch(function (err){
        console.log(err.response)
      })
    },
    createAnswer: function ({commit, dispatch}, payload) {
      return new Promise(function(resolve, reject) {

        axios({
          method: 'post',
          url: `${config.port}/answers/create/${payload.questionId}`,
          data: {
            description : payload.description
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (err){
          reject(err.response)
        })
      
      })

    }
  }
})
