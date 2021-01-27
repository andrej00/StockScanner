<template>
  <div>
    <trading-vue
      :data="chartData"
      :width="width"
      :height="height"
      :title-txt="stockName"
    >
    </trading-vue>
    <v-btn to="/stocks">NATRAG</v-btn>
    <v-btn @click="buy">KUPI</v-btn>
    <v-btn>PRODAJ</v-btn>
  </div>
</template>
<script>
import { db } from "../plugins/firebase";

export default {
  name: "MainChart",
  data() {
    return {
      stockName: this.$route.params.id.toUpperCase(),
      width: window.innerWidth - 10,
      height: window.innerHeight - 1.7,
      stockPrices: [],
      chartData: {
        chart: {
          data: [],
          // time ohlcv
          settings: {},
          grid: {},
        },
      },
    };
  },
  methods: {
    buy() {},
    getStockPrice() {
      const self = this;
      const from = parseInt(new Date().getTime() / 1000) - 62000000;
      const api = this.$specificStockData + self.stockName;
      this.axios.get(api).then((response) => {
        this.stockPrices.push(response.data);
        for (let i = 0; i < this.stockPrices[0].c.length; i++) {
          this.chartData.chart.data.push([
            // because time in api has 10 digits, and chart requires 13 digits
            this.stockPrices[0].t[i] * 1000,
            this.stockPrices[0].o[i],
            this.stockPrices[0].h[i],
            this.stockPrices[0].l[i],
            this.stockPrices[0].c[i],
            this.stockPrices[0].v[i],
          ]);
        }
      });
    },
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth - 10;
      this.height = window.innerHeight - 1.7;
    };
  },
  created() {
    this.getStockPrice();
  },
};
</script>
<style>
</style>
