<template>
  <b-card class="shadow-sm">
    <h5>{{ song.name }}</h5>
    <p>{{ song.performer }}</p>
    <p>{{ song.categories.name }}</p>
    <p>{{ song.price }}RSD</p>
    <p>{{ song.description }}</p>
    <input type="number" min="1" v-model="localAmount" placeholder="Quantity">
    <button @click="selectSong(song)">Select</button>
  </b-card>
</template>

<script>
export default {
  props: ['song'],
  data () {
    return {
      localAmount: this.song.amount
    }
  },
  watch: {
    localAmount (newAmount) {
      this.$emit('updateAmount', { song: this.song, amount: newAmount })
    }
  },
  methods: {
    selectSong (song) {
      this.$emit('select', { ...song, amount: this.localAmount })
    }
  }
}
</script>
