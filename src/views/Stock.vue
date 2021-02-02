<template>
  <v-app>
    <v-alert
      v-model="successAlert"
      border="left"
      close-text="Close Alert"
      style="background-color: #4a148c !important"
      dark
      dismissible
      >Uspješno ste kupili dionice</v-alert
    >
    <v-alert
      v-model="errorAlert"
      border="left"
      close-text="Close Alert"
      style="background-color: #b71c1c !important"
      dark
      dismissible
      >Nemate dovoljno novca za kupnju dionice</v-alert
    >

    <v-card class="mx-auto" max-width="444">
      <v-card-text style="margin-bottom: -40px">
        <v-text-field
          label="Količina"
          placeholder="1"
          outlined
          v-model="amount"
        ></v-text-field>
        <p>Dostupno: {{ available }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="deep-purple accent-4"> Prodaj </v-btn>
        <v-spacer></v-spacer>
        <v-btn text color="deep-purple accent-4" @click="buy()"> Kupi </v-btn>
      </v-card-actions>
    </v-card>
    <trading-vue
      :data="chartData"
      :width="width"
      :height="height"
      :title-txt="stockName"
    >
    </trading-vue>
  </v-app>
</template>
<script>
import { db } from "../plugins/firebase";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MainChart",
  data() {
    return {
      amount: null,
      available: 0,
      successAlert: false,
      errorAlert: false,
      stockName: this.$route.params.id.toUpperCase(),
      width: window.innerWidth - 10,
      height: window.innerHeight - 1.7,
      stockPrices: [],
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
    buy() {
      const currentPrice = this.stockPrices[0].c[
        this.stockPrices[0].c.length - 1
      ];

      if (this.getUser.database.balanceUSD > currentPrice * this.amount) {
        const update = {};
        console.log(currentPrice * this.amount);
        update[`portfolio.${this.stockName}`] = this.amount;

        db.collection("users")
          .doc(this.getUser.uid)
          .update(update)
          .then(function () {
            // commit("setUser", user);
            console.log("Document successfully written!");
          });

        const balance = this.getUser.database.balanceUSD - currentPrice * this.amount;
        this.available = balance;
        db.collection("users")
          .doc(this.getUser.uid)
          .update({
            balanceUSD: balance
          })
          .then(function () {
            // commit("setUser", user);
            console.log("Document successfully written!");
          });
        this.successAlert = true;
      } else {
        console.log("nemate dovoljno novca");
        this.errorAlert = true;
      }
    },
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
        console.log(this.stockPrices);
      });
    },
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  mounted() {
    window.onresize = () => {
      this.width = window.innerWidth - 10;
      this.height = window.innerHeight - 1.7;
    };
  },
  created() {
    this.available = this.getUser.database.balanceUSD;
    this.getStockPrice();
  },
};
</script>
<style>
</style>
