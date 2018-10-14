import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
      {
          path: "/login",
          name: "Login",
          component: Login
      },
      {
          path: "/signup",
          name: "SignUp",
          component: SignUp
      },
      {
          path: "/profile",
          name: "Profile",
          component: Profile
      },
    {
      path: "/tweet",
      name: "tweet",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Tweet.vue"),
        // meta: {
        //     requiresAuth: true
        // }
    }
  ]
});
// Router.beforeEach ((to, from, next) => {
//     let currentUser = firebase.auth().currentUser;
//     let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//
//     if (requiresAuth && !currentUser) next('home')
//     else if(!requiresAuth && currentUser) next ('chat')
//     else next()
// })