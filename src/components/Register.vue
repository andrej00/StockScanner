<template>
  <v-app>
    <v-stepper vertical>
      <v-stepper-step step="1">
        Upišite svoje podatke
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="6"
                v-for="textField in textFields"
                :key="textField.label"
              >
                <v-text-field
                  :label="textField.label"
                  :placeholder="textField.placeholder"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-btn color="primary" @click.prevent="validate()"> Continue </v-btn>
        <v-btn text> Cancel </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      displayName: "andrej",
      email: "andrej.prskalo@outlook.com",
      password: "123456",
      passwordRepeat: "123456",
      validationErrors: [],
      textFields: [
        { label: "Ime i prezime", placeholder: "Jelena Karleuša" },
        { label: "Email", placeholder: "jelena.karleuša@gmail.com" },
        { label: "Šifra", placeholder: "******" },
        { label: "Ponovljena šifra", placeholder: "******" },
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

      // when valid then sign in
      if (this.validationErrors.length <= 0) {
        this.signUp();
      }
    },
    signUp() {
      this.signUpAction({
        email: this.email,
        password: this.password,
        displayName: this.displayName,
      });
    },
  },
};
</script>