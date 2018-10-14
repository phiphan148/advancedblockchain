<template>
    <div class="tweet">
        <div class="tweet-content shadow-sm bg-white" v-for="(tweet, index) in tweetData" :key="index">
            <div class="row">
                <div class="col-2 col-sm-2 not-show-mb title-color text-center">
                    <img width="70%" class="img-fluid" :src=tweet.user.profile_image_url alt="prof img">
                    <p class="time not-show-mb">{{tweet.created_at}}</p>
                </div>
                <div class="col">
                    <p class="test pb-2">{{tweet.text}}</p>
                    <div class="tweet-img" v-if="tweet.link_text && tweet.photo_link_text">
                        <v-hover>
                            <div slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="mx-auto">
                                <a href=tweet.link_text><img width="100%" :src=tweet.photo_link_text alt="link img"></a>
                                <div class="tweet-img-title">
                                    <p href=tweet.link_text>{{tweet.link_text}}</p>
                                </div>
                            </div>
                        </v-hover>
                    </div>
                    <p class="pr-1 title-color hashtag" v-for="hash in tweet.entities.hashtags">#{{hash}}</p>
                    <div style="clear: both"></div>
                    <p class="not-show title-color">{{tweet.created_at}}</p>
                    <div class="light-box-img">
                        <lightbox width="200" :images=tweet.media_image></lightbox>
                    </div>
                    <div class="row social pt-2 pb-2">
                        <div class="col"><i class="far fa-comments"></i> <span class="static"> Comment</span></div>
                        <div class="col"><i class="fas fa-retweet"></i> {{tweet.retweet_count}}</div>
                        <div class="col"><i class="far fa-heart"></i> {{tweet.favorite_count}}</div>
                    </div>
                    <div class="row comment" id="collapseSummary">
                        <div class="card col-10"><input style="padding: 3px 0px" v-model="inputTxt" type="text"></div>
                        <div class="col-2" style="padding: 0px; color: white"><a v-on:click="addComment" class="btn btn-primary">Send</a>
                        </div>
                    </div>
                    <div class="tweet-content userComments row" v-for="comment in keyArr">
                        <div class="col-3 col-sm-2 text-center">
                            <img class="img-fluid comment-user" :src=comment.photo alt="prof img">
                            <p class="title-color time">{{comment.username}}</p>
                        </div>
                        <div class="col-9 col-sm-10 align-self-center speech-bubble-comment" style="margin: 0px">
                            <div class="row" style="padding: 10px">
                                <p class="col-12">{{comment.mess}}</p>
                                <div class="col-12 pt-1">
                                    <p class="title-color time">{{comment.time}} {{comment.date}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="tweet-content mb-2 row" v-if="tweet.retweeted_status" v-for="retweet in tweet.retweeted_status">
                        <div class="col-3 col-sm-2">
                            <img class="img-fluid" :src=retweet.user.profile_image_url alt="prof img">
                            <p class="title-color time">{{retweet.user.screen_name}}</p>
                        </div>
                        <div class="col-9 col-sm-10 align-self-center speech-bubble" style="margin: 0px">
                            <div class="row" style="padding: 0px">
                                <div class="col txt">
                                    <div class="details">
                                        <p>{{retweet.text}}</p>
                                        <div class="tweet-img" v-if="retweet.link_text && retweet.photo_link_text">
                                            <a href=retweet.link_text><img width="100%" :src=retweet.photo_link_text alt="link img"></a>
                                            <div class="tweet-img-title">
                                                <p href=retweet.link_text>{{retweet.link_text}}</p>
                                            </div>
                                        </div>
                                        <p class="pr-1 title-color hashtag" v-for="hash in retweet.entities.hashtags">#{{hash}}</p>
                                        <div style="clear: both"></div>
                                        <div class="light-box-img">
                                            <lightbox :images=retweet.media_image>
                                            </lightbox>
                                        </div>
                                        <div class="row social pt-1 text-center">
                                            <div class="col"><i class="far fa-comments"></i></div>
                                            <div class="col"><i class="fas fa-retweet"></i> {{retweet.retweet_count}}</div>
                                            <div class="col"><i class="far fa-heart"></i> {{retweet.favorite_count}}</div>
                                        </div>
                                        <p class="title-color time pt-1">{{retweet.created_at}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tweet",
        components: {},
        data() {
            return {
                comments: {},
                inputTxt: '',
                idClick: '',
                newKeyPost: '',
                keyArr: [],
            }
        },
        computed: {
            idTweet() {
                return this.$store.state.id;
            },
            tweetData() {
                return this.$store.state.mainData.filter(match => match.id == this.idClick);
            },

        },
        created() {
            this.getTeetId();
            this.getPosts();
        },
        methods: {
            getTeetId: function () {
                if (this.idTweet != '') {
                    localStorage.setItem("id", this.idTweet);
                    this.idClick = localStorage.getItem('id');
                } else {
                    this.idClick = localStorage.getItem('id');
                }
            },
            pad(s) {
                return (s < 10) ? '0' + s : s;
            },
            addComment() {
                firebase.auth().onAuthStateChanged(user => {
                    if (user) {
                        this.$router.go('/tweet');
                        var userName = firebase.auth().currentUser.displayName;
                        var currentDate = new Date();
                        var date = [this.pad(currentDate.getDate()), this.pad(currentDate.getMonth() + 1), currentDate.getFullYear()].join('/');
                        var time = [this.pad(currentDate.getHours()), this.pad(currentDate.getMinutes() + 1), currentDate.getSeconds()].join(':');
                        if (this.inputTxt != '') {
                            this.newKeyPost = database.ref().child('posts').push().key;
                            firebase.database().ref(`posts/${this.newKeyPost}${this.idClick}`).set({
                                username: userName,
                                photo: user.photoURL,
                                mess: this.inputTxt,
                                date: date,
                                time: time,
                                milionseconds: currentDate.getTime(),
                            });
                        }
                        this.inputTxt = '';
                    } else {
                        this.$router.push('/login');
                    }
                });
            },
            getData(receivedmess, arr) {
                this.comments = receivedmess;
                console.log(this.comments);
                this.keyArr = arr.sort((a,b)=>b.milionseconds - a.milionseconds);
            },
            getPosts() {
                let arr =[];
                let checkId = firebase.database().ref('posts');
                checkId.on("value", (snapshot) => {
                    snapshot.forEach(e => {
                        if (e.key.includes(this.idClick)) {
                            if (!arr.includes(e.val())) {
                                arr.push(e.val());
                                this.getData(e.val().mess, arr);
                            }
                        }
                    });
                })
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 576px) {
        .speech-bubble:after {
            top: 7% !important;
        }

        .time {
            font-size: 8px;
            padding-top: 3px;
        }

        .light-box-img vue-lightbox ul li img {
            width: 100px !important;
        }

        .static{
            display: none;
        }

        .social{
            text-align: center;
        }
    }

    .speech-bubble img {
        width: 100%;
        height: 100%;
        min-height: 80vh;
    }

    .speech-bubble {
        position: relative;
        background: #F5F5F5;
        border-radius: .4em;
    }

    .speech-bubble-comment {
        position: relative;
        background: #F5F5F5;
        border-radius: .4em;
    }

    .speech-bubble:after {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #F5F5F5;
        border-left: 0;
        border-top: 0px;
        margin-top: -10px;
        margin-left: -20px;
    }

    .speech-bubble-comment:after {
        content: '';
        position: absolute;
        left: 0;
        top: 20%;
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-right-color: #F5F5F5;
        border-left: 0;
        border-top: 0px;
        margin-top: -10px;
        margin-left: -20px;
    }

    .details {
        padding: 15px;
    }

    .comment {
        padding: 5px;
    }

    .comment input:focus {
        outline: none;
    }

    .comment-user {
        border-radius: 50%;
    }
</style>
