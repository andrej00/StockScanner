<template>
  <v-app>
    <navbar />

    <v-row justify="center" class="mt-16">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              v-model="name"
              label="Ime i prezime"
              placeholder="John Doe"
              outlined
              prepend-inner-icon="mdi-account"
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="Email"
              placeholder="john.doe@gmail.com"
              outlined
              prepend-inner-icon="mdi-email"
            ></v-text-field>

            <v-text-field
              v-model="imageUrl"
              label="Link na sliku"
              placeholder="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
              outlined
              prepend-inner-icon="mdi-message-image-outline"
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn text to="/stocks"> Natrag </v-btn>
            <v-spacer></v-spacer>
            <v-slide-x-reverse-transition>
              <v-tooltip left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    class="my-0"
                    v-bind="attrs"
                    @click="resetForm"
                    v-on="on"
                  >
                    <v-icon>mdi-refresh</v-icon>
                  </v-btn>
                </template>
                <span>Osvježi formu</span>
              </v-tooltip>
            </v-slide-x-reverse-transition>
            <v-btn color="primary" text @click="submit">
              Spremi promjene
            </v-btn>
          </v-card-actions>
        </v-card>
        <div class="text-center mt-12">
          <v-btn rounded color="primary" dark @click="deleteProfile">
            Izbriši svoj korisnički račun
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapGetters, mapActions } from "vuex";
import { db } from "../plugins/firebase";
import firebase from "firebase/app";

export default {
  components: { Navbar },
  name: "Resume",
  data: () => ({
    name: null,
    email: null,
    imageUrl: null,
  }),
  computed: {
    ...mapGetters(["getUser", "isUserAuth"]),
    form() {
      return {
        name: this.name,
        address: this.address,
        city: this.city,
        state: this.state,
        zip: this.zip,
        country: this.country,
      };
    },
  },

  methods: {
    populateForm() {
      this.name = this.getUser.database.name;
      this.email = this.getUser.database.email;
      this.imageUrl = this.getUser.database.image;
    },
    resetForm() {
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit() {
      const user = this.getUser;
      var docData = {
        name: this.name,
        image: this.imageUrl,
      };
      db.collection("users")
        .doc(this.getUser.uid)
        .update(docData)
        .then(function () {
          // commit("setUser", user);
          console.log("Document successfully written!");
        });
    },
    deleteProfile() {
      db.collection("users").doc(this.getUser.uid).delete();
      const user = firebase.auth().currentUser;

      user
        .delete()
        .then(function () {
          // User deleted.
        })
        .catch(function (error) {
          // An error happened.
        });
    },
  },

  created() {
    console.log(this.getUser);
    this.populateForm();
  },
};
</script>
<style>
</style>
