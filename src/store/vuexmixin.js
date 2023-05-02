export default {
    methods: {
    },
    computed: {
        _isLoggedIn() {
            return this.$store.getters['auth/token'];
        },
        _currentUser() {
            return this.$store.getters['user/currentUser'];
        },
        _isAdmin() {
            let user = this._currentUser;
            return user && user.is_admin && this._isLoggedIn;
        },
        _notAddedShows() {
            let shows = this.$store.getters['show/notAddedShows'];
            if (!shows) return [];
            shows = shows.sort((a, b) => (a.full_path > b.full_path) ? 1 : ((b.full_path > a.full_path) ? -1 : 0))
            for (let show of shows) {
                show.episodes = show.episodes.sort((a, b) => (a.suggested_episode_number > b.suggested_episode_number) ? 1 : ((b.suggested_episode_number > a.suggested_episode_number) ? -1 : 0))
            }
            return shows
        }
    }
};