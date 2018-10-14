<template>
    <div class="signup-page">
        <div class="text-center">
            <div class="pb-3">
                <div>
                    <div class="align-self-center col content-box signUp">
                        <h4 class="text-left title-color font-weight-bold pb-3">SIGN UP</h4>
                        <div class="row pb-3">
                            <div class="col-3 align-self-center text-left">
                                <p>Name:<span class="text-danger">*</span></p>
                            </div>
                            <div class="col-9 align-self-center">
                                <p><input v-model="userName" type="text" required></p>
                            </div>
                        </div>
                        <div class="row pb-3">
                            <div class="col-3 align-self-center text-left">
                                <p>Email:<span class="text-danger">*</span></p>
                            </div>
                            <div class="col-9 align-self-center">
                                <p><input v-model="emailSignup" type="text" required></p>
                            </div>
                        </div>
                        <div class="row pb-3">
                            <div class="col-3 text-left">
                                <p style="padding-top: 5px">Password:<span class="text-danger">*</span></p>
                            </div>
                            <div class="col-9 align-self-center">
                                <p><input v-model="passwordSignup" type="password" id="pass2"></p>
                                <div class="container row mt-1 show-pass">
                                    <input class="col-1 align-self-center pr-1" type="checkbox" v-on:click="checkPass('pass2')">Show password
                                </div>
                            </div>
                        </div>
                        <div class="col text-center">
                            <v-btn v-on:click="signUp" color="info">Sign Up </v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data() {
            return {
                userName: '',
                emailSignup: "",
                passwordSignup: "",
            };
        },
        created() {
        },
        methods: {
            checkPass(idInput) {
                let pass = document.getElementById(idInput);
                if (pass.type === "password") {
                    pass.type = "text";
                } else {
                    pass.type = "password";
                }
            },
            signUp() {
                if (this.userName != "") {
                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(this.emailSignup, this.passwordSignup)
                        .then(user => {
                            user = firebase.auth().currentUser;
                            if (user) {
                                user
                                    .updateProfile({
                                        displayName: this.userName,
                                        photoURL: "https://i.imgur.com/vHZfqPP.png"
                                    })
                                    .then(function () {
                                    });
                            }
                            alert(`Hi ${this.userName} Welcome to Advanced Blockchain application`)
                            this.$router.go("/");
                        })
                        .catch(function (error) {
                            let errorMessage = error.message;
                            alert(errorMessage);
                        });
                } else {
                    alert("Please fill your name");
                }
            },
        }
    };
</script>

<style scoped>
    @media only screen and (max-width: 575px) {
        .signUp{
            width: 90% !important;
        }
    }

    .signup-page{
        padding-top: 10%;
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