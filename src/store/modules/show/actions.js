import axios from "axios";

export default {
    searchShows({ commit }, params) {
        let term = (params && params.searchTerm) ? params.searchTerm : '';
        return axios.get("/shows", { "params": { "searchTerm": term } }).then((response) => {
            commit('SET_SHOWS', response.data)
            return response;
        }).catch(e => {
            commit('SET_SHOWS', []);
            throw e;
        })
    },
    getShow({ commit }, id) {
        return axios.get("/shows/" + id).then((response) => {
            commit('SET_SHOW', response.data)
            return response;
        }).catch(e => {
            commit('SET_SHOW', []);
            throw e;
        })
    },
    suggestCovers({ commit }, params) {
        let term = (params && params.searchTerm) ? params.searchTerm : '';
        let amount = (params && params.amount) ? params.amount : 10;
        return axios.get("/shows/suggest-images", { "params": { "searchTerm": term, 'amount': amount } }).then((response) => {
            commit('SET_IMAGE_COVERS', response.data)
            return response;
        }).catch(e => {
            commit('SET_IMAGE_COVERS', e.response.data);
            throw e;
        })
    },
    getNotAddedShows({ commit }, params) {
        return axios.get("/shows/not-added").then((response) => {
            commit('SET_NOT_ADDED_SHOWS', response.data)
            return response;
        }).catch(e => {
            commit('SET_NOT_ADDED_SHOWS', []);
            throw e;
        })
    },
    addShow({ commit }, params) {
        return axios.post("/shows", params).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    editShow({ commit }, params) {
        return axios.put("/shows", params).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
}