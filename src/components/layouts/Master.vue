<template>
  <div id="app">
      <ul class="nav">
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li><router-link :to="{ name: 'todo' }">App</router-link></li>
          <li><router-link :to="{ name: 'about' }">About</router-link></li>
          <li v-if="!loggedIn"><router-link :to="{ name: 'login' }">Login</router-link></li>
          <li v-if="!loggedIn"><router-link :to="{ name: 'register' }">Register</router-link></li>
          <li v-if="loggedIn"><router-link :to="{ name: 'logout' }">Logout</router-link></li>
      </ul>
      <div>
          <transition name="router-animation" 
          enter-active-class="animated fadeIn" 
          leave-active-class="animated fadeOut" mode="out-in">
            <router-view></router-view>
          </transition>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name:'Master',

    computed:{
        ...mapGetters(['loggedIn'])
    },
}
</script>

