<template>
  <v-app>
    <navbar />
    <v-container style="margin-top: 50px">
      <v-row>
        <v-col class="pa-3 d-flex flex-column" lg="6" md="12" cols="12" v-for="(info, i) in news" :key="i">
          <v-card color="primary" class="elevation-5 flex d-flex flex-column dark">
            <v-card-text class="secondary--text fill-height">
              <div class="mb-3">{{ info.category.toUpperCase() }}</div>
              <p class="display-1">{{ info.headline }}</p>
                                        <!-- <div>{{ getTime(info.datetime) }}, {{ info.source }}</div> -->

            </v-card-text>
            <v-card-text class="secondary--text">
                          <div class="date">{{ getTime(info.datetime) }}, {{ info.source }}</div>

            </v-card-text>

            <v-spacer></v-spacer>
            <v-card-actions>
              <v-btn text color="pink lighten-5" target="_blank" :href="info.url">
                Saznaj više
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { DateTime } from "luxon";

export default {
  components: { Navbar },
  name: "News",
  data: () => ({
    news: [],
  }),
  methods: {
    getNews() {
      this.axios.get(this.$newsApi).then((response) => {
        this.news = response.data;
      });
    },
    getTime(time) {
      return DateTime.fromSeconds(time).toFormat('dd LLL yyyy');
    }
  },
  created() {
    this.getNews();
  },
};
</script>

<style>
#app .date {
  padding: 0px !important;
  margin: 0px !important;
}
</style>