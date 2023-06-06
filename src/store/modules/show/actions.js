import axios from "axios";

export default {
    watchEpisode({ commit }, params) {
        return axios.get(`/shows/${params.showId}/${params.seasonId}/${params.episodeId}/watch`).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    latestWatched({ commit }, params) {
        return axios.get(`/shows/latest_watched`).then((response) => {
            commit('SET_LATEST_WATCHED', response.data)
            return response;
        }).catch(e => {
            commit('SET_LATEST_WATCHED', [])
            throw e;
        })
    },
    latestUploaded({ commit }, params) {
        return axios.get(`/shows/latest_uploaded`).then((response) => {
            commit('SET_LATEST_UPLOADED', response.data)
            return response;
        }).catch(e => {
            commit('SET_LATEST_UPLOADED', [])
            throw e;
        })
    },
    watchSeason({ commit }, params) {
        return axios.get(`/shows/${params.showId}/${params.seasonId}/watch`).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
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
    deleteShow({ commit }, showId) {
        return axios.delete("/shows/" + showId).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    watchedEpisode({ commit }, params) {
        let showId = params.showId;
        let seasonId = params.seasonId;
        let episodeId = params.episodeId;
        let watched = params.watched;
        return axios.post("/shows/" + showId + "/watched-episode", { season_id: seasonId, episode_id: episodeId, watched: watched }).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    getWatchedEpisodes({ commit }, showId) {
        return axios.get("/shows/" + showId + "/watched-episodes").then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    }
}