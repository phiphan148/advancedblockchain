<template>
    <div class="profile">
        <div class="card mb-2 shadow-sm bg-white">
            <div class="banner">
                <div class="banner-img">
                    <img src="../assets/bg.jpg" class="img-fluid">
                </div>
                <img :src=profile class="img-fluid prof prof-img">
            </div>
            <div class="infoProfile row pt-1">
                <div class="col-2 col-sm-2"></div>
                <div class="col-8 col-sm-9"><h5 class="title-color font-weight-bold">{{userName}}</h5></div>
            </div>
        </div>
        <v-card v-if="login" class="activitiesProfile row">
            <h4 class="col title-color pb-2">Your recent activities</h4>
            <div class="col">
                <p><span class="font-weight-bold">Creation time: </span>{{creationTime}}</p>
                <p><span class="font-weight-bold">Last sign in time: </span>{{lastSignInTime}}</p>
            </div>
        </v-card>
        <v-card v-else class="activitiesProfile row">
            <p class="col">Please login <router-link to="/login" class="title-color font-italic">here</router-link> to see your account activities</p>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Profile",
        components: {},
        data() {
            return {
                userName: '',
                profile: '',
                lastSignInTime: '',
                creationTime: '',
                login: false,
            }
        },
        created() {
            this.getProfile();
            this.checkLogin();
        },
        methods: {
            getProfile() {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.userName = user.displayName;
                        this.profile = user.photoURL;
                        this.creationTime = user.metadata.creationTime;
                        this.lastSignInTime = user.metadata.lastSignInTime;
                    }
                })
            },
            checkLogin() {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.login = true;
                        console.log(this.login);

                        // this.userNameLogin = user.displayName;
                    } else {
                        this.login = false;
                        console.log(this.login);
                    }
                })
            },
        }
    };
</script>

<style>
    @media only screen and (min-width: 786px) and (max-width: 991px) {
        .banner {
            bottom: -20% !important;
        }
    }

    @media only screen and (min-width: 992px) {
        .prof {
            bottom: -25% !important;
        }
        .infoProfile{
            min-height: 65px !important;
        }
    }

    .banner {
        position: relative;
    }

    .prof {
        position: absolute;
        bottom: -14%;
        left: 2%;
    }

    .prof-img {
        width: 11%;
        border-radius: 50%;
        background-color: white;
        padding: 2px;
    }

    .banner-img {
        max-height: 250px;
        overflow: hidden;
    }

    .infoProfile {
        min-height: 42px;
        background-color: white;
    }

    .activitiesProfile {
        padding: 30px 20px;
    }
</style>