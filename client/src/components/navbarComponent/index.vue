<template>
  <div>
    <v-toolbar color="#009688">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="white--text" style="margin-right: 5px;">Home</v-toolbar-title>
      </router-link>

      <router-link to="/questions/create" v-if="isLogin">
        <v-toolbar-title class="white--text" style="font-size:14px;"><v-icon style="color:#FFFFFF;">note_add</v-icon>Create Question</v-toolbar-title>
      </router-link>

    
      <v-text-field  
        class="ml-12" 
        v-model="seacrh" 
        label="Search..."
        style="margin-left:15px;"  
        dark>
      </v-text-field>
  

      <v-spacer></v-spacer>
      <div v-if="!isLogin">
        <ModalLogin/>
        <modalRegister/>
      </div>
      <div v-else>
        <v-btn color="#009688" style="color:#FFFFFF;" @click="btnLogout">LOGOUT</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>

<script>

import ModalLogin from './loginComponent'
import ModalRegister from './registerComponent'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    ModalLogin,
    ModalRegister
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  created: function () {},
  methods: {
    ...mapActions(['setIslogin', 'setUserEmail', 'searchQuestion']),

    btnLogout: function () {
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      this.setIslogin()
      this.setUserEmail()
    },
       
  },
  computed: {
    ...mapState(['isLogin']),

    seacrh: {
      set: function (value) {
        this.searchQuestion(value)
        this.$router.push('/')
      },
      get: function () {}
    }

  }
}
</script>
