<template>
  <v-dialog v-model="modalRegister" persistent max-width="500px">
    <v-btn slot="activator" color="#009688" dark>Register</v-btn>
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
              <v-text-field label="Name" v-model="name"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Phone Number"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Address" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email" v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" v-model="password"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="modalRegister = false; errorMessage = false">CLOSE</v-btn>
        <v-btn color="blue darken-1" flat @click="btnRegister">REGISTER</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import config from '../../../config.js'
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'ModalRegister',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      modalRegister: false,
      error: '',
      errorMessage: false
    }
  },
  methods: {
    btnRegister: function () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      let self = this
      axios({
        method: 'post',
        url: `${config.port}/users/signup`,
        data
      })
      .then(function () {
        swal(
          'Registration Success',
          '',
          'success'
        )
        .then( () => {
          self.modalRegister = false
        })
      })
      .catch(function (err) {
        self.error = Object.values(err.response.data.err.errors)[0].message
        self.errorMessage = true
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
</style>
