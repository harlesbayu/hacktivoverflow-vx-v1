<template>
   <v-dialog v-model="modalLogin" persistent max-width="500px">
      <v-btn slot="activator" color="#009688" dark>LOGIN</v-btn>
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>

              <v-flex xs12>
                <div class="alert" v-if="errorMessage">
                  {{ error }}
                </div> 
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" required v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" type="password" v-model="password"></v-text-field>
              </v-flex>
              </v-layout>
              </v-container>
              <small>*indicates required field</small>
          </v-card-text>
          <div style="text-align: center;">
            <v-spacer></v-spacer>
            <div style="display: block;">
              <v-btn color="#009688" @click="btnLoginFacebook" style="width: 200px;"><span style="color:#FFFFFF">Login With Facebook</span></v-btn>
            </div>
            <div style="display: block; color:#FFFFFF">
              <v-btn color="#009688" @click="btnLogin" style="width: 200px;"><span style="color:#FFFFFF">Login Manually</span></v-btn>
            </div>
            <div>
              <v-btn color="blue darken-1" flat @click.native="modalLogin = false; errorMessage = false">CLOSE</v-btn>
            </div>
          </div>
      </v-card>
    </v-dialog>
</template>

<script>

import config from '../../../config.js'
import facebookLogin from 'facebook-login'
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ModalLogin',
  data: function () {
    return {
      email: '',
      password: '',
      modalLogin: false,
      isLogin: false,
      error: '',
      errorMessage: false
    }
  },
  created: function () {
    this.documentReady()
  },
  methods: {
    ...mapActions([ 'setIslogin', 'allQuestions', 'myQuestionsAct', 'setUserEmail']),
    documentReady: function () {
      let token = localStorage.getItem('token')
      if(token){
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    },
    btnLogin: function () {
      
      let data = {
        email: this.email,
        password: this.password
      }

      let self = this
      axios({
        method: 'post',
        url: `${config.port}/users/signin`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then(function (response) {
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('token', response.data.token)
          self.allQuestions()
          self.myQuestionsAct()
          self.setIslogin()
          self.setUserEmail()
          self.modalLogin = false
        })
        .catch(function (err) {
          self.error = err.response.data.message
          self.errorMessage = true
        })
     
    },
    btnLoginFacebook: function () {
      
      const api = facebookLogin({ appId: `${config.idFacebook}` });
      let self = this
      api.login()
      .then(function (response) {

        axios({
          method: 'post',
          url: `${config.port}/users/signinFb`,
          headers : {
            token : response.authResponse.accessToken
          }
        })
        .then(function(response) {
          localStorage.setItem('email', response.data.email)
          localStorage.setItem('token', response.data.token)
          self.allQuestions()
          self.myQuestionsAct()
          self.setIslogin()
          self.setUserEmail()
          self.modalLogin = false
        })
        .catch(function (err) {
          console.log(err.response)
        })
        
      })
    }
  }
}
</script>

<style scoped>
.alert {
    padding: 20px;
    background-color: #f44336; /* Red */
    color: white;
    margin-bottom: 15px;
}

.closebtn {
    margin-left: 15px;
    color: white;
    font-weight: bold;
    float: right;
    font-size: 22px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.3s;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: black;
}
</style>
