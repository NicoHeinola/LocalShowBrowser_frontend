import { createStore } from 'vuex'

import show from './modules/show/index';
import auth from './modules/auth/index';
import user from './modules/user/index';
import mediaPlayer from './modules/mediaPlayer/index';

export default createStore({
  modules: {
    show,
    auth,
    user,
    mediaPlayer
  },
})
