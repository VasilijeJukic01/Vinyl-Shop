<template>
  <div id="app">
    <h1>Explore</h1>
    <b-form @submit="onSubmit">
      <b-form-group label="User Name:" label-for="username">
        <b-form-input id="username" v-model="form.username" placeholder="Enter name"
                      required class="short-input center-input"></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password"
                      required class="short-input center-input"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="button-spacing">Login</b-button>
    </b-form>
    <div class="background-bottom"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit (e) {
      e.preventDefault()
      this.login(this.form)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
.short-input {
  width: 50%;
}
.center-input {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.button-spacing {
  margin-top: 20px;
}
.background-bottom {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70vh;
  z-index: -1;
}
</style>
