import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

import course_editor from './modules/course_editor.js'
// import course_train from './modules/course_train.js'

import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    course_editor,
  },
  getters
})

export default store
