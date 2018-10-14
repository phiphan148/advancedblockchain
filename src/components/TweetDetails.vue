<template>
    <div class="tweet-component">
        <div fluid grid-list-lg>
            <div class="tweet-content shadow-sm bg-white">
                <div class="row">
                    <div class="col-4 col-sm-2 not-show-mb title-color">
                        <p>{{tweet.created_at}}</p>
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

                        <!--<div class="light-box-img">-->
                        <!--<lightbox width="200" :images=tweet.media_image></lightbox>-->
                        <!--</div>-->
                        <div class="row social pt-1" @click="toTweet(tweet.id)">
                            <div class="col"><i class="far fa-comments"></i> Comment</div>
                            <div class="col"><i class="fas fa-retweet"></i> {{tweet.retweet_count}}</div>
                            <div class="col"><i class="far fa-heart"></i> {{tweet.favorite_count}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TweetDetails",
        props: {
            data: Array,
            tweet: Object,
        },
        methods: {
            toTweet(id) {
                this.$store.commit('tweetId', id);
                console.log(this.$store.state.id);
                console.log(typeof this.$store.state.id);
                this.$router.push('/tweet');
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (min-width: 576px) {
        .not-show {
            display: none;
        }
    }

    .social {
        cursor: pointer;
        font-size: 12px;
        text-align: center;
    }
</style>
