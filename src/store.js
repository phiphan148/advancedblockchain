import Vue from "vue";
import Vuex from "vuex";
// import 'es6-promise/auto'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        mainData: [],
        info: [],
        id: '',
    },
    mutations: {
        mainData(state, data){
            this.state.mainData = data;
        },
        infoData(state, data){
            this.state.info = data;
        },
        tweetId(state, id){
            this.state.id = id.toString();
        }
    },
    actions: {}
});
