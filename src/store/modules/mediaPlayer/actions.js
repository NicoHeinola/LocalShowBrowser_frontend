import axios from "axios";

export default {
    isDownloaded({ commit }, params) {
        return axios.get("/media-player/is-downloaded").then((response) => {
            commit('SET_MEDIA_PLAYER_DOWNLOADED', response.data)
            return response;
        }).catch(e => {
            commit('SET_MEDIA_PLAYER_DOWNLOADED', false)
            throw e;
        })
    },
    download({ commit }, params) {
        return axios.get("/media-player/download").then((response) => {
            commit('SET_MEDIA_PLAYER_DOWNLOADED', true)
            return response;
        }).catch(e => {
            commit('SET_MEDIA_PLAYER_DOWNLOADED', false)
            throw e;
        })
    },
}