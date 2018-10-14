<template>
    <div class="card mb-2 shadow-sm bg-white">
        <div class="banner">
            <div class="banner-img">
                <img :src=infoData.profile_banner_url class="img-fluid">
            </div>
            <img :src=infoData.profile_image_url class="img-fluid prof prof-img">
        </div>
        <div>
            <div class="row pt-1">
                <div class="col-2 col-sm-2"></div>
                <div class="col-8 col-sm-9"><p>{{infoData.screen_name}}</p></div>
            </div>
            <div class="row pb-2 pt-2 static">
                <div class="col-6 col-sm-3">
                    <i class="fab fa-twitter title-color"></i><span> {{infoData.tweets_count}}</span>
                </div>
                <div class="col-6 col-sm-3">
                    <i class="far fa-heart title-color"></i><span> {{infoData.likes_count}}</span>
                </div>
                <div class="col-6 col-sm-3">
                    <p><span class="font-weight-bold title-color">Following</span> {{infoData.followings_count}}</p>
                </div>
                <div class="col-6 col-sm-3">
                    <p><span class="font-weight-bold title-color">Followers</span> {{infoData.followers_count}}</p>
                </div>
            </div>
            <div id="summary" class="infomation pb-2">
                <a class="collapsed title-color font-weight-bold" data-toggle="collapse" href="#collapseSummary" aria-expanded="false" aria-controls="collapseSummary"></a>
                <div class="collapse" id="collapseSummary">
                    <p>{{infoData.description}}</p>
                    <div class="row">
                        <p class="col-sm-6 col-12 title-color"><i class="fas fa-link pr-2"></i>{{infoData.url}}</p>
                        <p class="col-sm-6 col-12"><i class="fas fa-map-marker-alt title-color pr-2"></i>{{infoData.location}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        components: {},
        data() {
            return {}
        },
        computed: {
            infoData() {
                return this.$store.state.info;
            }
        },
        created() {
            // this.test();
        },
        methods: {
            // test(){
            //   console.log(this.infoData.entities.url.urls)
            // }
        }
    };
</script>

<style>
    @media only screen and (min-width: 786px) and (max-width: 991px) {
        .banner {
            bottom: -20% !important;
        }
        .static {
            width: 80% !important;
            text-align: center!important;
        }
    }

    @media only screen and (min-width: 992px) {
        .prof {
            bottom: -25% !important;
        }

        .static {
            width: 80% !important;
            text-align: center!important;
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

    #summary p.collapse:not(.show) {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    #summary a.collapsed:after {
        content: 'More info';
    }

    #summary a:not(.collapsed):after {
        content: 'Less info';
    }

    .static{
        width: 100%;
        margin: 0px auto;
        text-align: center;
    }

    .infomation{
        width: 80%;
        margin: 0px auto;
    }

</style>