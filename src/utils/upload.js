import plupload from 'plupload'
import constants from './constants'
import Vue from 'vue';
let accessid = ''
let accesskey = ''
let host = ''
let policyBase64 = ''
let signature = ''
let filename = ''
let key = ''
let expire = 0
let now = Date.parse(new Date()) / 1000
let phpUrl = ''

function sendRequest () {
  var xmlhttp = null
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest()
  } else if (window.ActiveXObject) {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }

  if (xmlhttp != null) {
    xmlhttp.open('GET', phpUrl, false)
    xmlhttp.send(null)
    return xmlhttp.responseText
  } else {
    alert('Your browser does not support XMLHTTP.')
  }
}

function get_signature() {
  //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
  now = Date.parse(new Date()) / 1000
  console.log('get_signature ...')
  console.log('expire:' + expire.toString())
  console.log('now:' + now.toString())
  if (expire < now + 3) {
    console.log('get new sign')
    const body = sendRequest()
    var obj = eval('(' + body + ')')
    host = obj['host']
    policyBase64 = obj['policy']
    accessid = obj['accessid']
    signature = obj['signature']
    expire = parseInt(obj['expire'])
    key = obj['dir']
    return true
  }
  return false
}

function setUploadParam(up) {
  var ret = get_signature()
  if (ret === true) {
    const newMultipartParams = {
      'key': `${key}${filename}`,
      'policy': policyBase64,
      'OSSAccessKeyId': accessid,
      'success_action_status': '200', //让服务端返回200,不然，默认会返回204
      'signature': signature
    }

    up.setOption({
      'url': host,
      'multipart_params': newMultipartParams
    })

    console.log('reset uploader')
    //uploader.start()
  }
}

function GecUploader (obj, folder, property) {
  folder = folder || 'coupon_poster'
  phpUrl = `${constants.AINTEREST_API_ENDPOINT}/api/v1/oss/signature/${folder}`
  var uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: 'selectfiles',
    container: document.getElementById('oss-container'),
    flash_swf_url: './Moxie.swf',
    silverlight_xap_url: './Moxie.xap',
    url: 'https://oss.aliyuncs.com',
    filters : [ {
      title : 'Image files',
      extensions : 'jpg,gif,png'
    }],
    multi_selection: false,
    multiple_queues: false,
    init: {
      PostInit: function () {
        document.getElementById('ossfile').innerHTML = ''
        // document.getElementById('postfiles').onclick = function () {
        //   setUploadParam(uploader)
        //   uploader.start()
        //   return false
        // }
      },

      FilesAdded: function (up, files) {
        console.log(files)
        plupload.each(files, function (file) {
          filename = file.name
          document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
          + '<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
          + '</div>'
        })
        setUploadParam(uploader)
        uploader.start()
      },

      UploadProgress: function (up, file) {
        var d = document.getElementById(file.id)
        d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + '%</span>'

        var prog = d.getElementsByTagName('div')[0]
        var progBar = prog.getElementsByTagName('div')[0]
        progBar.style.width = 2 * file.percent + 'px'
        progBar.setAttribute('aria-valuenow', file.percent)
      },

      FileUploaded: function (up, file, info) {
        const imgUrl = `https://cdn.gecacademy.cn/${folder}/${filename}`
        if (folder === 'coupon_poster') {
          obj.posterConfig.backgroundImgPath = imgUrl
        } else {
          var uploadUrl = document.getElementById('upload-url')
          if(uploadUrl){
            uploadUrl.value = imgUrl
          }


          if (folder === 'admin_attachment') {
            obj.url = imgUrl
          }

          if (folder === 'user_img') {
            // obj.profilePicUrl = imgUrl
            obj[property] = imgUrl
          }

          if (folder === 'web_upload') {
            obj.coverImgUrl = imgUrl
            document.querySelector('#coverImgUrl').src = imgUrl
          }
        }

        console.log('uploaded')
        console.log(info.status)
        setUploadParam(up)
        if (info.status >= 200 || info.status < 200) {
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = 'success'
        } else {
          document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response
        }
      },

      Error: function (up, err) {
        // debugger
        setUploadParam(up)
        // document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response))
      }
    }
  })
  return uploader
}
// uploader.init();
export default GecUploader
