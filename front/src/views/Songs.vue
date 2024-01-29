<template>
  <div>
    <h1>Explore</h1>
    <b-container fluid>
      <b-row class="flex-row flex-nowrap overflow-auto">
        <b-col cols="4" class="mb-3" v-for="song in displayedSongs" :key="song.id">
          <SongCard :song="song" @select="selectSong" />
        </b-col>
      </b-row>
      <div>
        <ul class="pagination" style="justify-content: center;">
          <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
          <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
            <button class="page-link" @click="goToPage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </div>
      <div class="button-container">
        <b-button squared variant="success" @click="goToOrder">Order Selected Songs</b-button>
        <b-button squared variant="success" @click="goToCart">Go to Cart</b-button>
      </div>
    </b-container>
    <div class="background-bottom"></div>
  </div>
</template>

<script>
import SongCard from '@/components/SongCard.vue'

export default {
  components: {
    SongCard
  },
  computed: {
    totalPages () {
      return this.$store.getters.totalPages
    },
    displayedSongs () {
      return this.$store.getters.displayedSongs
    },
    currentPage: {
      get () {
        return this.$store.state.currentPage
      },
      set (page) {
        this.$store.commit('setCurrentPage', page)
      }
    }
  },
  methods: {
    async fetchSongs () {
      await this.$store.dispatch('fetchSongs')
    },
    selectSong (song) {
      this.$store.commit('selectSong', song)
    },
    goToOrder () {
      localStorage.setItem('selectedSongs', JSON.stringify(this.$store.state.selectedSongs))
      this.$router.push('/order')
    },
    goToCart () {
      this.$router.push('/cart')
    },
    nextPage () {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    goToPage (page) {
      this.currentPage = page
    }
  },
  created () {
    this.fetchSongs()
  }
}
</script>

<style scoped>
h1 {
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.b-button {
  margin: 10px;
}

.navbar a.router-link-exact-active {
  font-weight: bold;
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
  height: 50vh;
  z-index: -1;
}
</style>
