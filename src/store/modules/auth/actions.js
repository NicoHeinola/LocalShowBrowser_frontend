import axios from "axios";

export default {
    login({ commit }, params) {
        let username = params.username;
        let password = params.password;
        return axios.post("/auth/login", { password: password, username: username }).then((response) => {
            commit('SET_TOKEN', response.data.token)
            this.dispatch('user/getCurrentUser', {}, { root: true })
            return response;
        }).catch(e => {
            commit('SET_TOKEN', '');
            throw e;
        })
    },
    register({ commit }, params) {
        let username = params.username;
        let password = params.password;
        return axios.post("/auth/register", { password: password, username: username }).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    logout({ commit }, params) {
        commit("REMOVE_TOKEN");
    },
}