<template>
  <v-app id="app">
    <v-navigation-drawer persistent :clipped="clipped" v-model="drawer" enable-resize-watcher fixed app>
      <v-card>
        <div v-if="login">
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <router-link to="/profile"><img :src=userProPhoto alt="imgage" class="img-fluid"></router-link>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <router-link to="/profile">
                    <v-list-tile-title class="text-color font-weight-bold">{{userName}}</v-list-tile-title>
                  </router-link>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>
        </div>
        <div style="padding: 15px 0px">
          <div class="prof-drawer">
            <ul>
              <li>
                <i class="fas fa-home pr-2"></i><span><router-link to="/" class="text-color">Home</router-link></span>
              </li>
              <li><i class="fas fa-user-circle pr-2"></i><span><router-link to="/profile"
                                                                            class="text-color"> My profile</router-link></span>
              </li>
              <li>
                <i class="fas fa-sign-in-alt pr-2"></i><span><router-link to="/login"
                                                                          class="text-color">Login</router-link></span>
              </li>
              <li>
                <i class="fas fa-user-plus pr-2"></i><span><router-link to="/signup"
                                                                        class="text-color">Sign Up</router-link></span>
              </li>
            </ul>
          </div>
          <v-btn v-if="login" v-on:click="signOut" color="info">
            <router-link to="/" style="color: white">Log Out</router-link>
          </v-btn>
          <v-btn v-else v-on:click="logIn" color="info" style="padding: 5px 8px">
            <router-link to="/profile" style="color: white">Login with Twitter</router-link>
          </v-btn>
        </div>
      </v-card>
    </v-navigation-drawer>
    <v-toolbar app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title class="title-color">Blockchain AG</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat><i class="fab fa-twitter-square pr-1 title-color"></i><a
                href="https://twitter.com/blockchainag?lang=en"
                target="_blank">Follow us</a></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app class="row">
      <div class="col text-center pt-3">
        <p>&copy; 2018</p>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
    export default {
        name: 'App',
        components: {},
        data() {
            return {
                userName: '',
                userProPhoto: '',
                mainData: '',
                login: false,
                clipped: false,
                drawer: false,
                fixed: false,
            }
        },
        created() {
            this.fetchData();
            this.checkLogin();
        },
        methods: {
            fetchData() {
                // let url = "https://api.twitter.com/1.1/users/show.json?screen_name=BlockchainAG";
                // fetch(url, {
                //   method: 'GET',
                //   headers: {
                //     'Access-Control-Allow-Headers': 'Origin',
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'Authorization': 'YxkPYkq1zKD72Q4MdYUUhg6Dw'
                //   }
                // })
                fetch("https://api.myjson.com/bins/pi7ck")
                    .then(response => response.json())
                    .then(data => {
                        this.mainData = data;
                        this.$store.commit('mainData', this.mainData.AG_timeline);
                        this.$store.commit('infoData', this.mainData.AG_info);
                    })
            },
            signOut() {
                firebase
                    .auth()
                    .signOut()
                    .then(result => {
                        this.login = false;
                        alert('We hope to see you again')
                        this.$router.push("/");
                    })
                    .catch(function (error) {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert(errorMessage);
                    });
            },
            logIn() {
                var provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithPopup(provider).then((result) => {
                    var token = result.credential.accessToken;
                    var secret = result.credential.secret;
                    var user = result.user;
                    this.$router.push("/");
                }).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    var email = error.email;
                    var credential = error.credential;
                    alert(errorCode + errorMessage + email + credential)
                });
            },
            checkLogin() {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.userProPhoto = user.photoURL;
                        this.userName = user.displayName;
                        this.login = true;
                    } else {
                        this.login = false;
                    }
                })
            },
        }
    }
</script>

<style>
  @media only screen and (max-width: 576px) {
    .banner-img {
      max-height: 150px !important;
    }

    .static {
      text-align: left !important;
      padding-left: 4%;
    }

    .not-show-mb {
      display: none;
    }

    .tweet-img-title {
      font-size: 10px;
    }
  }

  #app {
    /*font-family: "Avenir", Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #101010;
    background-size: 100%;
    min-height: 100vh;
    overflow: hidden;
  }

  ul li {
    list-style: none;
    padding: 0px;
  }

  p {
    margin: 0px;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 3px 0px;
  }

  a {
    color: #108EC8;
    margin: 0px;
    padding: 0px;
  }

  a:hover {
    text-decoration: none;
    color: #108EC8;
  }

  select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] {
    font-size: 16px;
  }

  .title-color {
    color: #108EC8;
  }

  .tweet-content {
    background-color: white;
    border-bottom: solid 1px #e6e6e6;
    padding: 15px;
  }

  .light-box-img ul {
    text-align: left !important;
  }

  .hashtag {
    float: left;
  }

  .tweet-img:hover {
    transform: scale(1.03);
    transition: all .5s;
  }

  .tweet-img {
    width: 60%;
    position: relative;
    margin-bottom: 5px;
    transition: all .5s;
  }

  .tweet-img-title {
    background-color: rgba(0, 0, 0, 0.66);
    position: absolute;
    bottom: 0%;
    width: 100%;
    padding: 5px;
    color: #f4f4f4;
    cursor: pointer;
  }

  .prof-drawer ul li {
    padding: 10px;
  }

  .prof-drawer ul li:hover {
    background-color: #d9d9d9;
  }

  .text-color {
    color: black;
  }

</style>
