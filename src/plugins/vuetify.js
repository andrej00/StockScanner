import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#6A1B9A'
        , // #E53935
        secondary: "#fff",
        // secondary: colors.grey.lighten5, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
});
// #00695C - zelena
// colors.pink.darken4
// 009688 - teal