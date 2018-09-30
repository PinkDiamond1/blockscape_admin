const ENV = 'production' // production ，staging
const X_AILINGUAL_KEY = '@@ailingualKey'
const GAID = ENV === 'production' ? 'UA-112663793-2' : 'UA-112663793-1'
const AINTEREST_API_ENDPOINT = 'http://matrix-content-s.ailingual.cn'
// const AINTEREST_API_ENDPOINT = 'http://localhost:5000'
const WECHAT_APP_ID = 'wxac72a16e964c725f'
const WECHAT_APP_NAME = 'gecFuwuhao'
export default
{
  ENV,
  WECHAT_APP_NAME,
  X_AILINGUAL_KEY,
  GAID,
  AINTEREST_API_ENDPOINT,
  WECHAT_APP_ID
}
