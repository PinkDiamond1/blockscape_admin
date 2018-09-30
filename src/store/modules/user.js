import { logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import utils from '@/utils/util'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        // const param = `{
        //   adminLogin(username: "${username}", password: "${userInfo.password}") {
        //     id,username,phone,wxGecFWHOpenId,wxUsername,profilePicUrl,role,accessToken
        //   }
        // }`
        const url = 'auth/superAdmin';
        const param = { username, password: userInfo.password };
        utils.requestRestful(url, param).then(res => {
          const data = res.data;
          if (data) {
            commit('SET_ROLES', data.role)
            commit('SET_NAME', data.username)
            commit('SET_AVATAR', data.profilePicUrl)
            setToken(data.accessToken)
            commit('SET_TOKEN', data.accessToken)
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // commit('SET_ROLES', data.roles)
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
