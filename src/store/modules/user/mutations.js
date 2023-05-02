export default {
    SET_CURRENT_USER(state, currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        state.currentUser = currentUser;
    },
    REMOVE_CURRENT_USER(state) {
        localStorage.removeItem('currentUser');
        state.currentUser = currentUser;
    }
}