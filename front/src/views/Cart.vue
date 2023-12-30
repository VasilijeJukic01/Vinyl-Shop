<template>
  <div>
    <h1>Your Cart</h1>
    <CartItems :cartSongs="cartSongs" :removeFromCart="removeFromCart" />
    <div>Total Price: {{ totalPrice }}</div>
    <div class="background-bottom"></div>
  </div>
</template>

<script>
import CartItems from '@/components/CartItems.vue'

export default {
  components: {
    CartItems
  },
  computed: {
    cartSongs () {
      return this.$store.state.selectedSongs
    },
    totalPrice () {
      return this.cartSongs.reduce((total, song) => total + song.price * song.amount, 0)
    }
  },
  methods: {
    removeFromCart (song) {
      this.$store.commit('removeSong', song)
    }
  }
}
</script>

<style scoped>
.background-bottom {
  background: url('@/assets/background.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}
</style>
