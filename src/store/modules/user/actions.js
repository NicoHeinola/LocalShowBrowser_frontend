import axios from "axios";

export default {
    getCurrentUser({ commit }, params) {
        return axios.get("/user/current").then((response) => {
            commit('SET_CURRENT_USER', response.data)
            return response;
        }).catch(e => {
            commit('SET_CURRENT_USER', null)
            throw e;
        })
    },
}