<template>
  <v-app>
    <v-container style="margin-top: 50px" d-flex justify-center mb-6>
      <trading-vue :data="this.$data" style="text-align: center"></trading-vue>
    </v-container>
          <v-btn @click="nesto">KLIKNI MEEEEE</v-btn>

  </v-app>
</template>

<script>
export default {
  name: "Stock",
  data: () => ({
    ohlcv: [
      [1551128400000, 33, 37.1, 14, 14, 196],
      [1551132000000, 13.7, 30, 6.6, 30, 206],
      [1551135600000, 29.9, 33, 21.3, 21.8, 74],
      [1551139200000, 21.7, 25.9, 18, 24, 140],
      [1551142800000, 24.1, 24.1, 24, 24.1, 29],
    ],
  }),
  methods: {
    nesto() {
      console.log(this.$route.params.id);
    },
  },
};
</script>

