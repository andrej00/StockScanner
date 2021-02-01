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
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    label="Ime i prezime"
                    placeholder="John Doe"
                    outlined
                    type="text"
                    v-model="displayName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    label="Email"
                    placeholder="john.doe@gmail.com"
                    outlined
                    type="text"
                    v-model="email"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    label="Šifra"
                    placeholder="******"
                    outlined
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    label="Ponovljena šifra"
                    placeholder="******"
                    outlined
                    type="password"
                    v-model="passwordRepeat"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn color="primary" @click.prevent="validate()">
            Registriraj se
          </v-btn>
          <v-btn text to="/"> Natrag </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script>
import Navbar from "./Navbar.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { Navbar },
  data() {
    return {
      displayName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      validationErrors: [],
      textFields: [
        {
          label: "Ime i prezime",
          placeholder: "John Doe",
          type: "text",
          model: "",
        },
        {
          label: "Email",
          placeholder: "john.doe@mail.com",
          type: "text",
          model: "",
        },
        { label: "Šifra", placeholder: "******", type: "password", model: "" },
        {
          label: "Ponovljena šifra",
          placeholder: "******",
          type: "password",
          model: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["isUserAuth"]),
  },
  methods: {
    ...mapActions(["signUpAction"]),
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
      if (!(this.password === this.passwordRepeat)) {
        this.validationErrors.push("<strong>Passwords</strong> did not match");
      }
      console.log(this.validationErrors);
      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signUp();
      }
    },
    signUp() {
      console.log(this.email);
      this.signUpAction({
        displayName: this.displayName,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
.container {
  margin-top: 50px;
}
</style>