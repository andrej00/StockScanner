<template>
  <v-app>
    <v-parallax
      dark
      src="https://www.alphavantage.co/static/img/intro-bg.jpeg"
      id="parallax-img"
    >
      <div>
        <v-card
          class="d-flex flex-row-reverse"
          flat
          style="background: transparent;"
        >
          <v-btn class="ma-2" text color="secondary" to="/register">Registracija</v-btn>
          <!-- <v-btn class="ma-2" text color="secondary" to="/register"> Registracija </v-btn> -->
        </v-card>
      </div>
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <h1 class="text-h1 font-weight-thin mb-4">Stock Scanner</h1>
          <h4 class="subheading">Sve informacije na jednom mjestu</h4>

          <v-btn class="mt-16" outlined color="green lighten-3" to="/login">
            <h2 class="font-weight-light">PRIJAVI SE</h2>
          </v-btn>
        </v-col>
      </v-row>
    </v-parallax>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  // components: {
  //   HelloWorld,
  // },

  data: () => ({
    //
  }),
};
</script>
<style>
.v-parallax {
  height: 100vh !important;
}
.v-parallax__image-container img {
  filter: blur(1px);
}

#app
  .v-sheet.theme--dark.v-toolbar.v-app-bar.v-app-bar--fixed.v-app-bar--hide-shadow {
  transform: none !important;
}

.my-span {
  background-color: blue;
  color: white;
  font-weight: bold;
  margin-right: 0;
  float: right;
}
</style>
