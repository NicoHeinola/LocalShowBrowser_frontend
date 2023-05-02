import { createStore } from 'vuex'

import show from './modules/show/index';
import auth from './modules/auth/index';
import user from './modules/user/index';

export default createStore({
  modules: {
    show,
    auth,
    user,
  },
})
