<template>
  <div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style>
#app {
  background: #333;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

header {
  text-align: center;
  padding: 20px 0;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #fff;
  margin-right: 15px;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
</style>

<script setup>
</script>
