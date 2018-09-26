<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-btn slot="activator" color="#4DB6AC" dark>UPDATE</v-btn>

    <v-card>
      <v-card-text>
        <v-flex sm12>
          <v-card color="#009688" class="white--text" style="clear:both">
            <v-card-title primary-title>
      
            <v-textarea
            solo-inverted
            name="input-7-4"
            v-model="description"
            ></v-textarea>
        
            </v-card-title>
          </v-card>
        </v-flex>
      </v-card-text>

      <v-card-title>
        <v-spacer></v-spacer>
        <v-btn color="#009688" @click.native="dialog = false" style="color: #FFFFFF;">CLOSE</v-btn>
        <v-btn color="#009688" v-on:click="btnUpdate(answer._id)" style="color: #FFFFFF;">UPDATE</v-btn>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
import config from '../../../config.js'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'ModalUpdateAnswer',
  data: function () {
    return {
      dialog: false,
      description: this.answer.description
    }
  },
  props: ['answer'],
  methods: {
    ...mapActions(['findOneQuestion']),

    btnUpdate: function(answerId) {
      let self = this
      axios({
        method: 'put',
        url: `${config.port}/answers/update/${answerId}`,
        data: {
          description : self.description
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(function () {
        self.$emit('updatesuccess', true)
        self.dialog = false
      })
    }
  }
}
</script>

<style>

</style>
