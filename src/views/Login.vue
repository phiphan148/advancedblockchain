<template>
    <div class="login">
        <div class="text-center">
            <div v-if="!login" class="pb-4">
                <div class="align-self-center col content-box signUp">
                    <!--<h4 class="text-left title-color font-weight-bold pb-3">SIGN UP</h4>-->
                    <div class="row pb-3">
                        <div class="col-3 align-self-center text-left">
                            <p>Email:<span class="text-danger">*</span></p>
                        </div>
                        <div class="col-9 align-self-center">
                            <p><input v-model="emailLogIn" type="text" required></p>
                        </div>
                    </div>
                    <div class="row pb-3">
                        <div class="col-3 text-left">
                            <p style="padding-top: 5px">Password:<span class="text-danger">*</span></p>
                        </div>
                        <div class="col-9 align-self-center">
                            <p><input v-model="passwordLogIn" type="password" id="pass2"></p>
                            <div class="container row mt-1 show-pass">
                                <input class="col-1 align-self-center pr-1" type="checkbox" v-on:click="checkPass('pass2')">Show password
                                <!--<p class="col text-left align-self-center small-txt" style="padding:0px"></p>-->
                            </div>
                        </div>
                    </div>
                    <div class="col text-center">
                        <v-btn v-on:click="loginE" color="info">Login </v-btn>
                    </div>
                </div>
            </div>
            <div v-else>
                <img class="pb-3" src="../assets/ag-logo.png" alt="logo">
                <p style="text-transform: uppercase; font-weight: bold">Hi {{userNameLogin}}</p>
            </div>
            <div v-if="!login" class="signUp text-left row">
                <p class="pb-2 col-12 col-sm-6"><i class="fab fa-twitter-square title-color pr-2"></i><router-link to="/profile" class="text-color"><span v-on:click="loginT">Login with Twitter</span></router-link></p>
                <p class="pb-2 col-12 col-sm-6"><i class="fas fa-envelope title-color pr-2"></i><router-link to="/profile" class="text-color"><span v-on:click="loginG">Login with Gmail</span></router-link></p>
            </div>
            <div v-else class="pb-3">
                <v-btn color="info">
                    <router-link to="/profile" style="color: white">Click here to go to your profile</router-link>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                login: false,
                userNameLogin: '',
                emailLogIn: "",
                passwordLogIn: "",
            };
        },
        created() {
            this.checkLogin();
        },
        methods: {
            loginE() {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.emailLogIn, this.passwordLogIn)
                    .then(user => {
                        this.$router.push("/");
                    })
                    .catch(function (error) {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert(errorCode + errorMessage);
                    });
            },
            loginG() {
                let provider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithRedirect(provider);
                firebase
                    .auth()
                    .getRedirectResult()
                    .then(result => {
                        if (result) {
                            this.$router.push("/");
                        }
                    })
                    .catch(function (error) {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert(errorCode + errorMessage);
                    });
            },
            loginT() {
                var provider = new firebase.auth.TwitterAuthProvider();
                firebase.auth().signInWithRedirect(provider);
                firebase
                    .auth()
                    .getRedirectResult()
                    .then(result => {
                        if (result.credential) {
                            var token = result.credential.accessToken;
                            var secret = result.credential.secret;
                            this.$router.push("/");
                        }
                        var user = result.user;
                    })
                    .catch(function (error) {
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        alert(errorCode + errorMessage);
                    });
            },
            checkLogin() {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.login = true;
                        this.userNameLogin = user.displayName;
                    }
                })
            },
            checkPass(idInput) {
                let pass = document.getElementById(idInput);
                if (pass.type === "password") {
                    pass.type = "text";
                } else {
                    pass.type = "password";
                }
            },
        }
    };
</script>

<style scoped>
    @media only screen and (min-width: 992px) {
        .login img {
            width: 30% !important;
        }
    }

    @media only screen and (min-width: 576px) and (max-width: 991px) {
        .login img {
            width: 35% !important;
        }
    }

    @media only screen and (max-width: 575px) {
        .login img {
            width: 70% !important;
        }

        .signUp{
            width: 90% !important;
        }
    }

    .login {
        padding-top: 40px;
    }

    @-webkit-keyframes rotate {
        from {
            -webkit-transform: rotateY(0deg);
        }
        to {
            -webkit-transform: rotateY(180deg);
        }
    }

    .login img {
        -webkit-animation-name: rotate;
        -webkit-animation-duration: 4s;
        -webkit-animation-iteration-count: infinite;
        -webkit-ANIMATION-timing-function: linear;
    }

    .signUp{
        width: 60%;
        margin: 0px auto;
        padding: 0px;
    }

    .signUp input{
        border: 1px solid #000;
        outline: none;
        width: 100%;
        border-radius: 3px;
        padding: 5px;
    }

</style>