import Vuex from 'vuex';
import Vue from 'vue';
import axios from '../util/request';

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      homeInfo: ''
    },
    getters: {

    },
    mutations: {
      setHomeInfo(state, res) {
        state.homeInfo = res
      }
    },
    actions: {
      getHomeInfo({ commit }) {
        return axios.get('/homeInfo').then((res) => {
          console.log('getHomeInfo', res.data);
          commit('setHomeInfo', res.data.name)
        })
      }
    }
  })
}