import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songs: [],
    selectedSongs: [],
    currentPage: 1,
    itemsPerPage: 3
  },
  mutations: {
    setSongs (state, songs) {
      state.songs = songs
    },
    selectSong (state, song) {
      state.selectedSongs.push({ id: song.id, amount: song.amount, price: song.price })
    },
    clearSelectedSongs (state) {
      state.selectedSongs = []
    },
    setCurrentPage (state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async fetchSongs (context) {
      const response = await fetch('http://localhost:8000/song/')
      const songs = await response.json()
      context.commit('setSongs', songs)
    }
  },
  getters: {
    totalPages (state) {
      return Math.ceil(state.songs.length / state.itemsPerPage)
    },
    displayedSongs (state) {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return state.songs.slice(start, end)
    }
  }
})
