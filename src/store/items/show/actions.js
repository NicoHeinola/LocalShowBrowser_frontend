import axios from "axios";

export default {
    searchShows({ commit }, params) {
        let term = params.searchTerm;
        return axios.get("/shows", { "params": { "searchTerm": term } }).then((response) => {
            console.log("AAAA");
            console.log(response);
        })
    }
}