import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null,
    token: ''
  },
  mutations: {
    getUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    preserveUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    getToken(state, token) {
      state.token = token
    },
    preserveToken: (state, token) => {
      state.token = token
    },
    deleteToken: (state, token) => {
      state.token = token
    }
  },
  actions: {
  },
  modules: {
  }
})
