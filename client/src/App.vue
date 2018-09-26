<template>
  <v-app>
    <Nabvar></Nabvar>
    <router-view></router-view>
  </v-app>
</template>

<script>

import Nabvar from './components/navbarComponent/index';
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Nabvar
  }
}
</script>
