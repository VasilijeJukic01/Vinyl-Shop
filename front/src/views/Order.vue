<template>
  <div class="order-form">
    <b-container class="mx-auto">
      <h1 class="mb-4">Place an Order</h1>
      <b-form @submit.prevent="submitOrder">
        <b-form-group
          id="input-group-address"
          label="Address:"
          label-for="address"
        >
          <b-form-input
            id="address"
            v-model="order.address"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-name_surname"
          label="Name and Surname:"
          label-for="name_surname"
        >
          <b-form-input
            id="name_surname"
            v-model="order.name_surname"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-phone"
          label="Phone:"
          label-for="phone"
        >
          <b-form-input
            id="phone"
            v-model="order.phone"
            type="tel"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" class="mt-3">Place Order</b-button>
        <div>
          <b-modal ref="orderModal" id="modal-1" title="BootstrapVue">
            <p class="my-4">Your order has been successfully placed!</p>
          </b-modal>
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        order_time: '',
        schedule_time: '',
        status: '',
        address: '',
        name_surname: '',
        phone: '',
        songs: this.$route.params.songs || JSON.parse(localStorage.getItem('selectedSongs')) || []
      }
    }
  },
  methods: {
    async submitOrder () {
      this.order.order_time = new Date().toISOString()
      const scheduleDate = new Date()
      scheduleDate.setDate(scheduleDate.getDate() + 10)
      this.order.schedule_time = scheduleDate.toISOString()
      this.order.status = 'New'

      const response = await fetch('http://localhost:8000/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.order)
      })
      const data = await response.json()
      for (const song of this.order.songs) {
        await fetch('http://localhost:8000/orderitem/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order_id: data.id, song_id: song.id, amount: song.amount, price: song.price })
        })
      }

      this.$refs.orderModal.show()

      this.order = {
        order_time: '',
        schedule_time: '',
        status: '',
        address: '',
        name_surname: '',
        phone: '',
        songs: []
      }
    }
  }
}
</script>

<style scoped>
.order-form {
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
