import axios from "axios";

export default {
    isDownloaded({ commit }, params) {
        return axios.get("download/ffmpeg/is-downloaded").then((response) => {
            commit('SET_FFMPEG_DOWNLOADED', response.data)
            return response;
        }).catch(e => {
            commit('SET_FFMPEG_DOWNLOADED', false)
            throw e;
        })
    },
    download({ commit }, params) {
        return axios.get("download/ffmpeg/download").then((response) => {
            commit('SET_FFMPEG_DOWNLOADED', true)
            return response;
        }).catch(e => {
            commit('SET_FFMPEG_DOWNLOADED', false)
            throw e;
        })
    },
}