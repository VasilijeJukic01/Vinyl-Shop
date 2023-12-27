<template>
  <div>
    <h1>About</h1>
    <p>{{ text }}</p>
    <div class="about"></div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      text: 'This is a project for the course Scripting Languages. It is a simple web application for ordering vinyl records'
    }
  }
}
</script>

<style scoped>
.about {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90vh;
  z-index: -1;
}
</style>
