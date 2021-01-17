<template>
  <v-app>
    <div>
      <v-app-bar color="primary" dense dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>StockScanner</v-toolbar-title>

        <v-spacer></v-spacer>

        <template v-if="!isUserAuth">
          <v-btn
            text
            v-for="button in navItems"
            :to="button.to"
            :key="button.name"
            >{{ button.text }}</v-btn>
        </template>

        <template v-if="isUserAuth">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar color="primary">
                  <v-icon dark> mdi-account-circle </v-icon>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div class="mx-auto text-center">
                  <v-avatar color="primary">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                  <h3>{{ getUser.displayName }}</h3>
                  <p class="caption mt-1">
                    {{ getUser.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text>Postavke</v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="signOut"
                    >Odjavi se</v-btn
                  >
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </template>
      </v-app-bar>
    </div>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        initials: "JD",
        fullName: "John Doe",
        email: "john.doe@doe.com",
      },
      navItems: [
        { text: "Login", to: "/login", icon: "sign-in-alt" },
        { text: "Register", to: "/register", icon: "user-plus" },
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