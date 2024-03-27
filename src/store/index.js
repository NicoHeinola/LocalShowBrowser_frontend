import { createStore } from 'vuex'

import show from './modules/show/index';
import auth from './modules/auth/index';
import user from './modules/user/index';
import mediaPlayer from './modules/mediaPlayer/index';
import ffmpeg from './modules/ffmpeg/index';
import setting from './modules/setting/index';
import blacklistedFolder from './modules/blacklistedFolder/index';

export default createStore({
  modules: {
    show,
    auth,
    user,
    mediaPlayer,
    setting,
    blacklistedFolder,
    ffmpeg
  },
})
