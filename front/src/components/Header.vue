<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand" active-class="router-link-active">Vinyl Whirl</router-link>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link v-if="!token" to="/register" class="nav-link" active-class="router-link-active">Register</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="!token" to="/login" class="nav-link" active-class="router-link-active">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="token" class="nav-link" active-class="router-link-active" @click.native="logout()" to>Logout</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/song" class="nav-link" active-class="router-link-active">Songs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" active-class="router-link-active">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapState([
      'token'
    ])
  },
  methods: {
    ...mapMutations([
      'removeToken',
      'setToken'
    ]),
    logout () {
      this.removeToken()
    }
  },
  watch: {
    token () {
      this.$forceUpdate()
    }
  },
  mounted () {
    if (localStorage.token) {
      this.setToken(localStorage.token)
    }
  }
}
</script>
