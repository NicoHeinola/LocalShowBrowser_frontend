import { createStore } from 'vuex'

import show from './items/show/index';

console.log(show)

export default createStore({
  namespaced: true,
  state: {
    ...show.state
  },
  getters: {
    ...show.getters

  },
  mutations: {
    ...show.mutations

  },
  actions: {
    ...show.actions

  },
})
