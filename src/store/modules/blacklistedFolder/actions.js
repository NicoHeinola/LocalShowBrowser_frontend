import axios from "axios";

export default {
    getBlacklistedFolders({ commit }, params) {
        return axios.get("/blacklisted_folder/all").then((response) => {
            commit("SET_BLACKLISTED_FOLDERS", response.data)
            return response;
        }).catch(e => {
            throw e;
        })
    },
    updateBlacklistedFolder({ commit }, params) {
        return axios.put("/blacklisted_folder/" + params.id, { path: params.path }).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    addBlacklistedFolder({ commit }, params) {
        return axios.post("/blacklisted_folder", { path: params.path }).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    deleteBlacklistedFolder({ commit }, params) {
        return axios.delete("/blacklisted_folder/" + params.id).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
}