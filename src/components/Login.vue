<template>
  <v-app>
    <navbar />
    <v-container class="container">
      <v-stepper vertical>
        <v-stepper-step step="1"> Upišite svoje podatke </v-stepper-step>

        <v-stepper-content step="1">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Email"
                    placeholder="john.doe@gmail.com"
                    outlined
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="Šifra"
                    placeholder="******"
                    outlined
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn color="primary" @click.prevent="validate()"> Prijavi se </v-btn>
          <v-btn text to="/home"> Natrag </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./Navbar.vue";
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";

export default {
  components: { Navbar },
  data() {
    return {
      email: "",
      password: "",
      validationErrors: [],
      firebaseError: "",
    };
  },
  computed: {
    ...mapGetters(["isUserAuth"]),
  },
  methods: {
    ...mapActions(["signInAction"]),
    resetError() {
      this.validationErrors = [];
    },
    validate() {
      // Clear the errors before we validate again
      this.resetError();

      // email validation
      if (!this.email) {
        this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
      }
      if (/.+@.+/.test(this.email) != true) {
        this.validationErrors.push("<strong>E-mail</strong> must be valid.");
      }
      // password validation
      if (!this.password) {
        this.validationErrors.push("<strong>Password</strong> cannot be empty");
      }
      if (/.{6,}/.test(this.password) != true) {
        this.validationErrors.push(
          "<strong>Password</strong> must be at least 6 characters long"
        );
      }
      // when valid then sign in
      console.log(this.validationErrors);
      if (this.validationErrors.length <= 0) {
        this.signIn();
      }
    },
    signIn() {
      this.signInAction({ email: this.email, password: this.password });
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}
</style>