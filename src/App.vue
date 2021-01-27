<template>
  <div id="app">
    <!-- <navbar /> -->
    <!-- <v-container> -->
      <!-- <section v-if="isUserAuth" class="section"> -->
        <!-- <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          Welcome {{ getUser.email }}
        </div>
      </div> -->
      <!-- </section> -->
      <section>
        <div>
          <router-view />
        </div>
      </section>
    <!-- </v-container> -->
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import { mapGetters, mapActions } from "vuex";
export default {
  components: { Navbar },
  data() {
    return {
      kaas: true,
    };
  },
  mounted() {
    this.authAction();
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["authAction"]),
  },
};
</script>
<style>
#app, body, html {
  background-color: #EEEEEE;
}
</style>