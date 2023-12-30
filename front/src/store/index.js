import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    songs: [],
    selectedSongs: [],
    currentPage: 1,
    itemsPerPage: 3
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.token = token
    },
    removeToken (state) {
      state.token = ''
      localStorage.token = ''
      console.log('Token removed')
    },
    setSongs (state, songs) {
      state.songs = songs
    },
    selectSong (state, song) {
      state.selectedSongs.push({
        id: song.id,
        name: song.name,
        performer: song.performer,
        categories: song.categories,
        amount: song.amount,
        price: song.price,
        delete: 1
      })
    },
    clearSelectedSongs (state) {
      state.selectedSongs = []
    },
    setCurrentPage (state, page) {
      state.currentPage = page
    },
    removeSong (state, song) {
      const index = state.selectedSongs.findIndex(s => s.id === song.id)
      if (index !== -1) {
        state.selectedSongs.splice(index, 1)
      }
    }
  },
  actions: {
    async register ({ commit }, obj) {
      console.log(JSON.stringify(obj))
      const response = await fetch('http://127.0.0.1:8001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

      const json = await response.json()
      commit('setToken', json.token)
    },

    async login ({ commit }, obj) {
      const response = await fetch('http://127.0.0.1:8001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      })

      const json = await response.json()
      if (json.token) {
        commit('setToken', json.token)
      } else { alert('Login failed') }
    },
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
