<template>
  <v-app>
    <navbar />
    <v-container style="margin-top: 50px">
      <v-row>
        <v-col
          cols="3"
          class="card-spacing"
          v-for="(stock, i) in stockData"
          :key="stock.symbol"
        >
          <v-card class="mx-auto" color="primary">
            <v-card-text>
              <div class="text--primary">
                <br />
                <p
                  style="
                    color: white !important;
                    text-align: center !important;
                    font-size: 24px;
                    padding: 10px 15px 15px 15px;
                  "
                >
                  {{ stocks[i] }}
                </p>
                <p
                  style="
                    text-align: center;
                    color: white !important;
                    padding: 0 30px;
                  "
                >
                  {{ stock.c }}
                </p>
              </div>
            </v-card-text>
            <v-card-actions style="text-align: center !important">
              <v-btn
                style="margin: 0 auto"
                text
                dark
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

export default {
  components: { Navbar },
  name: "Stocks",
  data: () => ({
    currentPrice: 0,
    stocks: ["AAPL", "PFE", "TSLA", "GOOGL", "MSFT", "MRNA"],
    stockData: [],
    stockPrices: [],
    pickedStock: null,
    dialog: false,
    arrayPrice: [1],
  }),
  methods: {
    timeInMillis() {
      return parseInt(new Date().getTime() / 1000);
    },
    getStockInfo() {
      const self = this;
      this.stocks.map((stock) => {
        this.axios.get(this.$stockInfoApi + stock).then((response) => {
          this.stockData.push(response.data);
          console.log(response.data);
        });
      });
    },
    displayChart(clickedStock) {
      this.$router.push("stocks/" + this.stocks[clickedStock]);
    },
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    getThePrice() {
      console.log(this);
      return this.currentPrice;
    },
  },
  watch: {
    currentPrice: function () {
      console.log(currentPrice);
      return this.currentPrice;
    },
  },
  created() {
    this.getStockInfo();

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
