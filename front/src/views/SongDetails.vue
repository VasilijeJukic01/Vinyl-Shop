<template>
  <div class="center-card" v-if="song">
    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img src="https://picsum.photos/400/400/?image=20" alt="Image" class="rounded-0"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body>
            <b-card-text>
              <h1>{{ song.name }}</h1>
              <p>{{ song.performer }}</p>
              <p>{{ song.description }}</p>
              <p>{{ song.category }}</p>
              <p>{{ song.price }}</p>
              <router-link :to="`/order/${song.id}`" class="btn btn-primary">Order</router-link>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  data () {
    return {
      song: null
    }
  },
  async created () {
    const id = this.$route.params.id
    const response = await fetch(`http://localhost:8000/song/${id}`)
    this.song = await response.json()
  }
}
</script>

<style scoped>
h1 {
  color: #333;
  font-size: 1.5em;
  margin-bottom: 10px;
}

.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Adjust this value according to your needs */
}

p {
  color: #666;
  font-size: 1em;
  margin: 5px 0;
}
</style>
