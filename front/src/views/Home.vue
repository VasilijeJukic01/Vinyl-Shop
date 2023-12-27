<template>
  <div class="home">
    <h1>Welcome to Vinyl Whirl!</h1>
    <router-link to="/song" class="explore-button">Explore</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.explore-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
</style>
