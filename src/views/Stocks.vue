<template>
  <v-app>
    <navbar />
    <v-container style="margin-top: 50px">
      <v-row v-if="loading">
        <v-col
          lg="4"
          md="6"
          sm="12"
          col
          v-for="n in 10"
          :key="n"
          class="pa-3 d-flex flex-column"
        >
          <v-sheet class="pa-3" color="blue-grey lighten-5">
            <v-skeleton-loader
              class="mx-auto"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row v-if="!loading">
        <v-col
          lg="4"
          md="6"
          sm="12"
          xs="12"
          v-for="(stock, i) in stockData"
          :key="stock.symbol"
          class="pa-3 d-flex flex-column"
        >
          <v-card color="primary" class="elevation-5 flex d-flex flex-column">
            <v-card-text>
              <div class="secondary--text">
                <br />
                <p
                  style="
                    text-align: center !important;
                    font-size: 24px;
                    padding: 10px 15px 15px 15px;
                  "
                >
                  {{ stocks[i].fullName }}
                </p>
                <p style="text-align: center; padding: 0 30px">
                  $ {{ stock.c }}
                </p>
              </div>
            </v-card-text>
            <v-card-actions style="text-align: center !important">
              <v-btn
                class="secondary--text"
                style="margin: 0 auto"
                text
                small
                @click="displayChart(i)"
                >Grafikon</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>

<script>
import Navbar from "../components/Navbar.vue";
import { db } from "../plugins/firebase";
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
  components: { Navbar },
  name: "Stocks",
  data: () => ({
    currentPrice: 0,
    stocks: [
      {
        fullName: "Apple",
        symbol: "aapl",
      },
      {
        fullName: "Pfeizer",
        symbol: "pfe",
      },
      {
        fullName: "McDonald's",
        symbol: "mcd",
      },
      {
        fullName: "Google",
        symbol: "googl",
      },
      {
        fullName: "Moderna",
        symbol: "mrna",
      },
      {
        fullName: "Tesla",
        symbol: "tsla",
      },
      {
        fullName: "IBM",
        symbol: "ibm",
      },
      {
        fullName: "Amazon",
        symbol: "amzn",
      },
      {
        fullName: "NVIDIA",
        symbol: "nvda",
      },
      {
        fullName: "Nike",
        symbol: "nke",
      },
    ],
    stockData: [],
    stockPrices: [],
    pickedStock: null,
    dialog: false,
    arrayPrice: [1],
    loading: true,
  }),
  methods: {
    timeInMillis() {
      return parseInt(new Date().getTime() / 1000);
    },
    getStockInfo() {
      const self = this;
      this.loading = true;
      this.stocks.map((stock) => {
        this.axios
          .get(this.$stockInfoApi + stock.symbol.toUpperCase())
          .then((response) => {
            this.stockData.push(response.data);
          });
      });
      this.loading = false;
      console.log(this.stockData);
    },
    displayChart(clickedStock) {
      console.log(this.stocks[clickedStock].symbol)
      this.$router.push("stocks/" + this.stocks[clickedStock].symbol);
    },
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    getThePrice() {
      console.log(this);
      return this.currentPrice;
    },
  },
  // watch: {
  //   currentPrice: function () {
  //     console.log(currentPrice);
  //     return this.currentPrice;
  //   },
  // },
  created() {
    // 1611878400  --
    // 1611998846  --> time in millis
    // console.log(this.timeInMillis());
    const self = this;
    setTimeout(function(){ self.getStockInfo(); }, 3000);
    // this.getStockInfo();
    // console.log(typeof this.$store.getters.getUser);

    // const socket = new WebSocket(this.$webSocket);

    // socket.addEventListener("open", function (event) {
    //   socket.send(JSON.stringify({ type: "subscribe", symbol: "AAPL" }));
    // });

    // socket.addEventListener("message", function (event) {
    //   let data = JSON.parse(event.data);
    //   this.currentPrice = data.data[0].p;
    //   console.log(this.currentPrice);
    // });
  },
};
</script>
<style>
.card-spacing {
  margin: 25px;
}
/* .theme--light.v-application .text--primary {
  color: white !important;
} */
</style>
