<!-- <template>
  <div class="columns" v-if="!isUserAuth">
    <div class="column is-half is-offset-one-quarter">
      <div class="card">
        <div class="card-content">
          <div
            v-if="validationErrors.length"
            class="notification is-danger is-light"
          >
            <button @click="resetError()" class="delete"></button>
            <div class="content">
              Please resolve the following error(s) before proceeding.
              <ul style="margin-top:0.3em; margin-left: 1em">
                <li
                  v-for="(error, index) in validationErrors"
                  :key="`error-${index}`"
                  v-html="error"
                />
              </ul>
            </div>
          </div>
          <form>
            <div class="field">
              <label class="label">E-mail</label>
              <div class="control">
                <input
                  v-model="email"
                  class="input"
                  type="text"
                  autocomplete="email"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  v-model="password"
                  class="input"
                  type="password"
                  autocomplete="current-password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="field">
              <p class="control">
                <button @click.prevent="validate()" class="button is-success">
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
-->

<template>
  <v-app>
    <v-stepper vertical>
      <v-stepper-step step="1"> Upišite svoje podatke </v-stepper-step>

      <v-stepper-content step="1">
        <v-form>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12"
                md="12"
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
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";

export default {
  data() {
    return {
      email: "andrej.prskalo@outlook.com",
      password: "123456",
      validationErrors: [],
      firebaseError: "",
      textFields: [
        { label: "Email", placeholder: "jelena.karleuša@gmail.com" },
        { label: "Šifra", placeholder: "******" },
      ],
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