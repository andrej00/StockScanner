<template>
  <v-app>
    <navbar />
    <v-container style="margin-top: 30px">
      <h1 class="heading primary--text">PORTFOLIO</h1>
      <piechart />
      <h3 class="primary--text">Dostupno: ${{ getUser.database.balanceUSD }}</h3>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Piechart from "@/components/PieChart.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { Navbar, Piechart },
  name: "Portfolio",
  data: () => ({}),
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
};
</script>
<style>
.heading {
  text-align: center;
  font-size: 48px;
  margin-bottom: 40px;
}
</style>