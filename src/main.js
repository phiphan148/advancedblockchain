import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuetify from 'vuetify';
import lightbox from 'vlightbox'
import 'vuetify/dist/vuetify.min.css';

Vue.use(lightbox)
Vue.use(Vuetify)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
