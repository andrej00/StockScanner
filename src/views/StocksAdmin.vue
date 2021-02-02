<template>
  <v-app>
    <navbar />
    <v-container>
      <v-row>
        <v-col
          lg="4"
          md="6"
          sm="12"
          xs="12"
          class="pa-3 d-flex flex-column"
          v-for="(user, i) in users"
          :key="i"
        >
          <v-card color="secondary" class="elevation-5 flex d-flex flex-column">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{ user.name }}</div>
                <v-list-item-title class="headline mb-1">
                  {{ user.email }}
                </v-list-item-title>
                <v-list-item-subtitle
                  v-for="(value, key, i) in user.portfolio"
                  :key="i"
                >
                  {{ key }}: {{ value }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80">
                <v-img :src="user.image"></v-img
              ></v-list-item-avatar>
            </v-list-item>
            <!-- <v-card-text>
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="(value, key, i) in user.portfolio"
                  :key="i"
                  small
                >
                  <div>
                    <div class="font-weight-normal">
                      <strong>{{ key }}</strong> {{ value }}
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text> -->

            <v-card-actions style="float: right d-flex justify-space-around">
              <v-btn depressed color="primary" @click="deleteUser(user)">
                Dodaj ulogu admin
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn depressed color="error" @click="deleteUser(user)">
                Izbriši
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
import { mapGetters, mapActions } from "vuex";
import { db } from "../plugins/firebase";

export default {
  components: { Navbar },
  name: "Resume",
  data: () => ({
    users: [],
  }),
  methods: {
    getUsers() {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.users.push(doc.data());
          });
        });
    },
    deleteUser(user) {
      console.log(user);
      var removeIndex = this.users
        .map(function (item) {
          return item.id;
        })
        .indexOf(user.id);
      this.users.splice(removeIndex, 1);
      console.log(removeIndex);

      db.collection("users").doc(user.id).delete();
    },
  },
  created() {
    this.getUsers();
  },
};
</script>
<style>
</style>
