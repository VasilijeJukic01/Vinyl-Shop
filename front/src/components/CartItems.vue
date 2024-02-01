<template>
  <b-table striped hover :items="cartSongs">
    <template v-slot:cell(name)="data">
      {{ data.item.name }}
    </template>
    <template v-slot:cell(performer)="data">
      {{ data.item.performer }}
    </template>
    <template v-slot:cell(categories)="data">
      {{ data.item.categories.name }}
    </template>
    <template v-slot:cell(price)="data">
      {{ data.item.price }}
    </template>
    <template v-slot:cell(amount)="data">
      {{ data.item.amount }}
    </template>
    <template v-slot:cell(delete)="data">
      <b-button variant="danger" @click="removeFromCart(data.item)">Delete</b-button>
    </template>
  </b-table>
</template>

<script>
export default {
  props: {
    cartSongs: {
      type: Array,
      required: true
    },
    removeFromCart: {
      type: Function,
      required: true
    }
  }
}
</script>
