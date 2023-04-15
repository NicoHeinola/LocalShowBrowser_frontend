import actions from "./actions"
import getters from "./actions"
import mutations from "./actions"
import state from "./actions"

let allToExport = {
    actions: actions,
    getters: getters,
    mutations: mutations,
    state: state
}

export default {
    ...allToExport
}