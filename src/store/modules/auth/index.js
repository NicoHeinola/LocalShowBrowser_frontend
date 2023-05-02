import actions from "./actions"
import getters from "./getters"
import mutations from "./mutations"
import state from "./state"

let allToExport = {
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: state
}

export default {
    namespaced: true,
    ...allToExport
}