import axios from "axios";

export default {
    getSettings({ commit }, params) {
        return axios.get("/setting/all").then((response) => {
            commit("SET_SETTINGS", response.data)
            return response;
        }).catch(e => {
            throw e;
        })
    },
    updateSetting({ commit }, params) {
        return axios.put("/setting/" + params.name, { value: params.value }).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
    resetSetting({ commit }, params) {
        return axios.delete("/setting/" + params.name).then((response) => {
            return response;
        }).catch(e => {
            throw e;
        })
    },
}