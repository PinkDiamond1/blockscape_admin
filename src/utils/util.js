import Vue from 'vue'
import VueResource from 'vue-resource'
import constants from './constants'
import { getToken } from './auth' // 验权
var _ = require('underscore')._
import { Loading, Message } from 'element-ui'
import store from '../store'

Vue.use(VueResource)

var vue = new Vue()
const namespace = 'gec_web'

var utils = {
  request: function(param, filter) {
    const Authorization = getToken() ? `Bearer ${getToken()}` : undefined
    return vue.$http.post(`${constants.AINTEREST_API_ENDPOINT}/graphql`, {
      operationName: null,
      query: param,
      variables: filter
    }, {
      headers: { Authorization }
    }).then(res => {

      if (res.data.errors) {
        Message.error(JSON.stringify(res.data.errors[0].message))
      }
      return res
    }).catch(e => {
      // debugger
      if (e.status === 401 || e.status === 403) {
        Message.error('权限不足，请重新登录')
        this.saveRole('')
        store.dispatch('FedLogOut').then(() => {
          location.href = '/'// 为了重新实例化vue-router对象 避免bug
        })
      }
    })
  },
  requestRestful: function(url, data) {
    const Authorization = getToken() ? `Bearer ${getToken()}` : undefined
    return vue.$http.post(`${constants.AINTEREST_API_ENDPOINT}/api/v1/${url}`, data, {
      headers: { Authorization }
    }).then(res => {
      return res
    }).catch(e => {
      // debugger
      if (e.status === 401 || e.status === 403) {
        debugger
        Message.error('权限不足，请重新登录')
        this.saveRole('')
        store.dispatch('FedLogOut').then(() => {
          location.href = '/'// 为了重新实例化vue-router对象 避免bug
        })
      }
    })
  },
  gaPageView: function(page, title) {
    window.ga('send', {
      hitType: 'pageview',
      page,
      title
    })
  },

  gaEvent: function(eventCategory, eventAction, eventLabel, eventValue = 1) {
    window.ga('send', {
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    })
  },
  replaceOss: function(url) {
    const oldUrl = 'https://gecacademy.oss-cn-beijing.aliyuncs.com'
    const oldUrl2 = 'http://gecacademy.oss-cn-beijing.aliyuncs.com'
    const newUrl = 'https://cdn.gecacademy.cn'
    let res = url.replace(oldUrl, newUrl)
    res = res.replace(oldUrl2, newUrl)
    return res
  },
  saveLocal: function(key, value, isObj) {
    let newValue = value
    if (isObj) {
      newValue = JSON.stringify(value)
    }
    localStorage.setItem(`${namespace}:${key}`, newValue)
  },
  getLocal: function(key, isObj) {
    if (isObj) {
      return JSON.parse(localStorage.getItem(`${namespace}:${key}`) || '{}')
    } else {
      return localStorage.getItem(`${namespace}:${key}`)
    }
  },
  saveRole: function(role) {
    localStorage.setItem(`${namespace}:role`, JSON.stringify(role))
  },
  getRole: function() {
    return JSON.parse(localStorage.getItem(`${namespace}:role`) || '{}')
  },
  saveUser: function(user) {
    localStorage.setItem(`${namespace}:currentUser`, JSON.stringify(user))
  },
  getUser: function() {
    return JSON.parse(localStorage.getItem(`${namespace}:currentUser`) || '{}')
  },
  getUserName: function() {
    return this.getUser().username || this.getUser().wxUsername || this.getUser().nickname
  },
  getUserId: function() {
    return this.getUser().id
  },
  getUserImage: function() {
    return this.getUser().profilePicUrl || this.getUser().headimgurl
  },
  getGALabel: function() {
    return `userId: ${this.getUserId()}, userName: ${this.getUserName()}`
  },
  updateUser: function(options) {
    const attrs = this.getUser()
    _.extend(attrs, options)
    localStorage.setItem(`${namespace}:currentUser`, JSON.stringify(attrs))
  },
  clearUser: function() {
    localStorage.removeItem(`${namespace}:currentUser`)
    alert('已登出')
  },
  showTip: function(message) {
    vue.$toast.success({
      title: '提示',
      message: message,
      // icon: require('../assets/info.jpg'),
      color: '#2093D1',
      position: 'top right'
    })
  },
  login: function(username, password) {
    const param = `{
      login(username: "${username}", password: "${password}") {
        id,username,phone,wxGecFWHOpenId,wxUsername,profilePicUrl,role
      }
    }`
    return utils.request(param).then(res => {
      const result = res.data.data
      if (result.login) {
        this.updateUser(result.login)
        return true
      } else {
        this.showTip('账号密码错误')
        return false
      }
    })
  },
  isPhone: function() {
    const ua = navigator.userAgent
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
    const isAndroid = ua.match(/(Android)\s+([\d.]+)/)
    const isMobile = isIphone || isAndroid
    if (isMobile) {
      return true
    } else {
      return false
    }
  },
  isIOSDevice: function() {
    const ua = navigator.userAgent
    const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
    const isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/)
    return isIphone
  },
  convertDate: function(timestamp) {
    const datetime = new Date()
    datetime.setTime(timestamp)
    return datetime.getFullYear() + '.' + (datetime.getMonth() + 1)
  },
  convertTime: function(timestamp) {
    const datetime = new Date()
    datetime.setTime(timestamp)
    return datetime.getFullYear() + '/' + this.fix2String(datetime.getMonth() + 1) + '/' + this.fix2String(datetime.getDate()) + ' ' + this.fix2String(datetime.getHours()) + ':' + this.fix2String(datetime.getMinutes()) + ':' + this.fix2String(datetime.getSeconds())
  },
  fix2String: function(number) {
    if (number < 10) {
      return '0' + number
    } else {
      return number
    }
  },
  getWxUser: function(userInfo) {
    const attributes = {
      wxUnionId: userInfo.unionid,
      wxUsername: userInfo.nickname,
      gender: userInfo.sex,
      profilePicUrl: userInfo.headimgurl
    }
    attributes.wxGecFWHOpenId = userInfo.openid

    console.log(`GECWECHAT_APP_NAME：gec , userInfo：${userInfo}, attributes: ${JSON.stringify(attributes)}`)
    return vue.$http.post(`${constants.AINTEREST_API_ENDPOINT}/api/v1/users/login`, {
      data: {
        attributes,
        id: this.getUser().id || undefined
      },
      meta: {
        loginType: 'wxUnionId'
      }
    }, {
      headers: { Authorization: undefined }
    }).then(result => {
      return result.data.data
    })
  },
  getCodeFromWX: function(redirectUri) {
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${constants.WECHAT_APP_ID}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
    console.log(`auth_url: ${authUrl}`)
    // debugger
    window.location.href = authUrl
  },
  loginWX: function(openid) {
    let userId = ''
    const that = this
    return vue.$http.get(`${constants.AINTEREST_API_ENDPOINT}/api/v1/wechat/${openid}/user-info?app_name=${constants.WECHAT_APP_NAME}`).then(result => {
      console.log(`userInfo: ${JSON.stringify(result.data)}`)
      this.updateUser(result.data)
      return that.getWxUser(result.data)
    }).then(user => {
      console.log(`user: ${JSON.stringify(user)}`)
      userId = user.id
      that.updateUser({ id: userId })
      this.updateUser(user.attributes)
      return new Promise(function(resolve, reject) {
        resolve(userId)
      })
    }).catch(err => {
      console.log(`error: ${JSON.stringify(err)}`)
    })
  }
}
export default utils
