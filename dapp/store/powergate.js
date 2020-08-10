import Vue from 'vue';

export const state = () => ({
  info: null
});

export const getters = {
  info: state => state.info
};

export const mutations = {
  setFfsInfo(state, info) {
    state.info = info;
  }
};

export const actions = {
  async updateFfsInfo({commit}, info) {
    commit('setFfsInfo', info);
  },
};
