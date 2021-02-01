<template>
  <v-app>
    <v-container>

      <v-divider></v-divider>

      <!-- Životopis -->
      <h1 class="primary--text text-center section-header">Životopis</h1>
      <v-row align="stretch">
        <v-col cols="6" class="d-flex flex-column">
          <v-card class="mx-auto flex d-flex flex-column" max-width="400">
            <v-img
              class="white--text align-end"
              height="400px"
              src="../../public/andrej_prskalo.jpeg"
            >
              <v-card-title>Andrej Prskalo</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Međugorje</v-card-subtitle>

            <v-card-text class="text--primary flex">
              <div>
                Na Fakultet Prirodoslovno Matematičkih i Odgojnih Znanosti sam
                se upisao kako bih dobio potrebno znanje iz programiranja kako
                bih kvalitetno rješavao programske probleme. Imam iskustvo u
                Vue.js, Python, React, Flutter.
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                href="https://github.com/andrej00"
                target="_blank"
              >
                <v-icon dark> mdi-github </v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                href="https://www.facebook.com/andrej.prskalo.7/"
                target="_blank"
              >
                <v-icon dark> mdi-facebook </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="6" class="d-flex flex-column">
          <v-card class="mx-auto flex d-flex flex-column" max-width="400">
            <v-img
              class="white--text align-end"
              height="400px"
              src="../../public/marko_matesic.jpeg"
            >
              <v-card-title>Marko Matešić</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">Rama</v-card-subtitle>

            <v-card-text class="text--primary flex">
              <div>
                Fakultet Prirodnoslovni matematičkih i odgojnih znanosti u
                Mostaru upisujem zbog zainteresiranosti u tehnologiju i
                programiranje.
              </div>
            </v-card-text>

            <v-card-actions>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="primary"
                href="https://github.com/mmatesic99"
                target="_blank"
              >
                <v-icon dark> mdi-github </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                fab
                small
                href="https://www.facebook.com/marko.matesic.3"
                target="_blank"
                color="primary"
              >
                <v-icon dark> mdi-facebook </v-icon>
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

export default {
  components: { Navbar },
  name: "Resume",
  data: () => ({}),
};
</script>
<style>
</style>
