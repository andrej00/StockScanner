<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dense>
        <v-app-bar-nav-icon
          color="secondary"
          @click.stop="drawer = !drawer"
          v-if="$vuetify.breakpoint.xsOnly"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="secondary--text">StockScanner</v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-if="!$vuetify.breakpoint.xsOnly">
          <template v-if="!isUserAuth">
            <v-btn
              class="secondary--text"
              text
              v-for="button in navItems"
              :to="button.to"
              :key="button.name"
              >{{ button.text }}</v-btn
            >
          </template>

          <template v-if="isUserAuth">
            <v-btn text to="/stocks" class="secondary--text">Home</v-btn>
            <v-btn text to="/news" class="secondary--text">News</v-btn>
            <v-btn text to="/portfolio" class="secondary--text"
              >Portfolio</v-btn
            >
            <v-btn
              v-if="getUser.database.role == 'admin'"
              text
              to="/stocksadmin"
              class="secondary--text"
              >Admin</v-btn
            >
            <v-menu bottom min-width="200px" color="secondary" rounded offset-y>
              <template v-slot:activator="{ on }">
                <v-btn icon x-large v-on="on">
                  <v-avatar color="primary" size="38">
                    <!-- <v-icon dark color="secondary"> mdi-account-circle </v-icon> -->
                    <v-img :src="getUser.database.image"></v-img>
                  </v-avatar>
                </v-btn>
              </template>
              <v-card>
                <v-list-item-content class="justify-center">
                  <div class="mx-auto text-center">
                    <v-avatar color="primary" size="96">
                      <!-- <v-icon dark> mdi-account-circle </v-icon> -->
                      <v-img :src="getUser.database.image"></v-img>
                    </v-avatar>
                    <h3 class="pt-3">{{ getUser.database.name }}</h3>
                    <p class="caption mt-1">
                      {{ getUser.database.email }}
                    </p>
                    <v-divider class="my-3"></v-divider>
                    <v-btn depressed rounded text to="/userprofile"
                      >Profile</v-btn
                    >
                    <v-divider class="my-3"></v-divider>
                    <v-btn depressed rounded text @click="signOut"
                      >Logout</v-btn
                    >
                  </div>
                </v-list-item-content>
              </v-card>
            </v-menu>
          </template>
        </div>
      </v-app-bar>

      <v-overlay :value="drawer" z-index="4"> </v-overlay>
      <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        hide-overlay
        :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
      >
        <v-list dense>
          <v-list-item to="/stocks" @click="drawer = false"> Home </v-list-item>
          <v-list-item to="/news" @click="drawer = false"> News </v-list-item>
          
        </v-list>
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
      navItems: [
        { text: "Login", to: "login", icon: "sign-in-alt" },
        { text: "Register", to: "register", icon: "user-plus" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
  },
  methods: {
    ...mapActions(["signOutAction"]),
    signOut() {
      this.signOutAction();
    },
  },
};
</script>

<style>
#app .v-application--wrap {
  min-height: 0;
}
</style>