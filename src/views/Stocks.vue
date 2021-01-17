<template>
  <v-app>
    <v-container style="margin-top: 50px">
      <v-row>
        <div
          class="card-spacing"
          v-for="(stock, i) in stockData"
          :key="stock.symbol"
        >
          <v-card class="mx-auto" max-width="344" color="primary">
            <v-card-text>
              <div class="text--white">
                {{ stock.Symbol }}
              </div>
              <div class="text--primary">
                <br />
                <p
                  style="color: white !important; text-align: center !important"
                >
                  {{ stocks[i] }}
                </p>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-btn text dark small to="stocks/aapl">Grafikon</v-btn>
              <!-- <v-dialog v-model="dialog" width="90%" overlay-opacity="0.5">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    dark
                    small
                    v-bind="attrs"
                    v-on="on"
                    @click="displayChart(i)"
                  >
                    Grafikon
                  </v-btn>
                </template>

                <template>
                  <v-sparkline
                    :auto-draw-duration="autoDrawDuration"
                    auto-draw-easing
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                  ></v-sparkline>
                </template>
              </v-dialog> -->
            </v-card-actions>
          </v-card>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"],
];
export default {
  name: "Stocks",
  data: () => ({
    autoDrawDuration: 6000,
    width: 1,
    radius: 100,
    padding: 8,
    lineCap: "round",
    gradient: gradients[5],
    value: [],
    gradientDirection: "top",
    gradients,
    fill: false,
    type: "trend",
    autoLineWidth: false,

    apiToken: "bvcsnb748v6u47crk5n0",
    stockInfoApi:
      "https://finnhub.io/api/v1/quote?token=bvcsnb748v6u47crk5n0&symbol=",
    stockPriceApi:
      "https://finnhub.io/api/v1/stock/candle?resolution=1&from=1605543327&to=1607469224&token=bvcsnb748v6u47crk5n0&symbol=AAPL",
    stocks: ["AAPL"],
    stockData: [],
    stockPrices: [],
    pickedStock: null,
    dialog: false,
  }),
  methods: {
    timeInMillis() {
      return parseInt(new Date().getTime() / 1000);
    },
    getStockInfo() {
      const self = this;
      this.stocks.map((stock) => {
        this.axios.get(this.stockInfoApi + stock).then((response) => {
          this.stockData.push(response.data);
        });
      });
    },
    getStockPrice() {
      const self = this;
      const from = parseInt(new Date().getTime() / 1000) - 62000000;
      const api = `https://finnhub.io/api/v1/stock/candle?&resolution=D&from=1571043327&to=1605629727&token=bvcsnb748v6u47crk5n0&symbol=`;
      this.stocks.forEach((stock) => {
        this.axios.get(api + stock).then((response) => {
          this.stockPrices.push(response.data);
        });
      });
    },
    displayChart(i) {
      this.value = this.stockPrices[i].c;
    },
  },
  created() {
    this.getStockInfo();
    this.getStockPrice();
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
