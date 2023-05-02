import axios from "axios";

export default {
    SET_TOKEN(state, token) {
        localStorage.setItem('token', token);
        axios.defaults.headers.common["Authorization"] = token;
        state.token = token;
    },
    REMOVE_TOKEN(state) {
        localStorage.removeItem('token');
        axios.defaults.headers.common["Authorization"] = '';
        state.token = '';
    }
}