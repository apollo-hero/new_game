import * as types from "./mutation-types";
import axios from "axios";

const state = () => {
  return {
    darkMode: true,
    authToken: null,
    user: null,
    init: null,
    level_rank: null,
    hero_rank: null,
    reput_rank: null,
    rank: null
  };
};

// getters
const getters = {
  darkMode: state => state.darkMode,
  authToken: state => state.authToken,
  user: state => state.user,
  init: state => state.init,
  level_rank: state => state.level_rank,
  hero_rank: state => state.hero_rank,
  reput_rank: state => state.reput_rank,
  shop_log: state => state.shop_log,
  wheel_log: state => state.wheel_log,
  donation_log: state => state.donation_log,
  rank: state => state.rank
};

// actions
const actions = {
  setDarkMode({ commit }, darkMode) {
    commit(types.SET_DARK_MODE, { darkMode });
  },
  setUser({ commit }, user) {
    commit(types.SET_USER, user);
  },
  setInit({commit}, data) {
    commit(types.SET_INIT, data);
  },
  setShop({commit}, data) {
    commit(types.SET_SHOP, data);
  },
  setWheel({commit}, data) {
    commit(types.SET_WHEEL, data);
  },
  setDonate({commit}, data) {
    commit(types.SET_DONATION, data);
  },
  setLevel({commit}, data) {
    commit(types.SET_LEVEL, data);
  },
  setHero({commit}, data) {
    commit(types.SET_HERO, data);
  },
  setReput({commit}, data) {
    commit(types.SET_REPUT, data);
  },
  setRANK({commit}, data) {
    commit(types.SET_RANK, data);
  },
  login({commit}, credentials) {
    return axios.post('/account/login', credentials)
        .then(response => {
          
            if(response.data.message == "success"){
              commit(types.SET_AUTH_TOKEN, response.data.result.token);
              commit(types.SET_USER, response.data.result.user);
              commit(types.SET_INIT, response.data.result.data);
              localStorage.setItem('token', response.data.result.token);
            }
            console.log(response);
            return response;
        });
  },
  logout({commit}) {

    localStorage.removeItem('token');
    commit(types.SET_AUTH_TOKEN, null);
    return true;

  },
  changeEmail({commit}, email) {
    return axios.post('/api/changeEmail', email,{
      headers:{
          "Content-Type": "application/json",
          token: localStorage.getItem('token'),
      }
  })
        .then((res)=>{
          if(res.data.status == "success"){
            commit(types.SET_USER, res.data.user);
          }
          return res;
        })
  },
  changePassword({commit}, data) {
    return axios.post('/api/changePassword', data, {
      headers:{
          "Content-Type": "application/json",
          token: localStorage.getItem('token'),
      }
  })
        .then((res)=>{
          if(res.data.status == "success"){
            commit(types.SET_USER, res.data.user);
          }
          return res;
        })
  },
  getAccount({commit}) {
    return axios.get('/account/my-account',{
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then((res)=>{
      if(res.data.message == "success"){
        commit(types.SET_USER, res.data.result.user);
        commit(types.SET_INIT, res.data.result.data);
      }
      return res;
    })
  }
};

// mutations
const mutations = {
  [types.SET_DARK_MODE](state, { darkMode }) {
    state.darkMode = darkMode;
  },
  [types.SET_AUTH_TOKEN](state, token) {
    state.authToken = token;
  },
  [types.SET_USER](state, user) {
      state.user = user;
  },
  [types.SET_INIT](state, init) {
    state.init = init;
  },
  [types.SET_LEVEL](state, level_rank) {
    state.level_rank = level_rank;
  },
  [types.SET_RANK](state, rank) {
    state.rank = rank;
  },
  [types.SET_HERO](state, hero_rank) {
    state.hero_rank = hero_rank;
  },
  [types.SET_REPUT](state, reput_rank) {
    state.reput_rank = reput_rank;
  },
  [types.SET_SHOP](state, shop_log) {
    state.shop_log = shop_log;
  },
  [types.SET_WHEEL](state, wheel_log) {
    state.wheel_log = wheel_log;
  },
  [types.SET_DONATION](state, donation_log) {
    state.donation_log = donation_log;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
