export default {
    SET_SHOWS(state, shows) {
        state.shows = shows;
    },
    SET_LATEST_UPLOADED(state, shows) {
        state.latestUploaded = shows;
    },
    SET_LATEST_WATCHED(state, shows) {
        state.latestWatched = shows;
    },
    SET_SHOW(state, show) {
        state.show = show;
    },
    SET_NOT_ADDED_SHOWS(state, shows) {
        state.notAddedShows = shows;
    },
    SET_IMAGE_COVERS(state, covers) {
        state.imageCovers = covers;
    },
}