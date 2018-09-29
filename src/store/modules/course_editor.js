import utils from '@/utils/util';
import course_child_video from './course_child_video.js';
import course_open_class from './course_open_class.js';
import course_study_background from './course_study_background.js';
import course_train from './course_train.js';

const state = {
  // 设置属性
  deleteCourseMessage: null,
  saveCourseMessage: null,
  saveCourseEnglishMessage: null,
  daCallMessage: null,
  qrcodesMessage: null,
  checkCouponId: false,
  courseDropDowns: {
    attachments: [],
    courseCategories: [],
    courseTypes: [],
    courses: [],
    surveyQuestions: [],
    users: [],
    videoCourse: []
  },
  editorTypeOptions: [
    {
      value: 'app-child-video',
      label: '子视频课程',
      course_type: '100',
    },
    {
      value: 'app-open-class',
      label: '公开课',
      course_type: '300',
    },
    {
      value: 'app-train',
      label: '求职训练营',
      course_type: '301',
    },
    {
      value: 'app-studybackground',
      label: '留学背景提升',
      course_type: '302',
    }
  ],
  is_component_value: '',
  course_id: null,
  course_en_id: null,
  course_additional_id: null,
  course_type: null,
  course_language: 'CHINESE',
  course_saving: false,


  course_lecturers: {
    data: [{
      id: null,
      username: null
    }],
    state: false
  },
  buyChecked: false,
  buySuccessInfo: false,
  readingGuide: false,
  pushInfo: false,
  curriculumSharingSettings: false,
  courseCollageSetting: false,
  trainingProject: false,
  SeriesOfCourses: false,
  daCall: false,
  tutorMessage: false,
  courseExtension: false,
  recommendHomepage: false
}


const getters = {
  // 获取属性的状态
  course_id: state => state.course_id,
  saveCourseMessage: state => state.saveCourseMessage,
  deleteCourseMessage: state => state.deleteCourseMessage,
  saveCourseEnglishMessage: state => state.saveCourseEnglishMessage,
  daCallMessage: state => state.daCallMessage,
  qrcodesMessage: state => state.qrcodesMessage,
  checkCouponId: state => state.checkCouponId,
  editorTypeOptions: state => state.editorTypeOptions,
  is_component_value: state => state.is_component_value,
  courseDropDowns: state => state.courseDropDowns,
  course_language: state => state.course_language,
  course_saving: state => state.course_saving,
  course_type: state => state.course_type,
  course_lecturers: state => state.course_lecturers,

  buyChecked: state => state.buyChecked,
  buySuccessInfo: state => state.buySuccessInfo,
  readingGuide: state => state.readingGuide,
  pushInfo: state => state.pushInfo,
  curriculumSharingSettings: state => state.curriculumSharingSettings,
  courseCollageSetting: state => state.courseCollageSetting,
  trainingProject: state => state.trainingProject,
  SeriesOfCourses: state => state.SeriesOfCourses,
  daCall: state => state.daCall,
  tutorMessage: state => state.tutorMessage,
  courseExtension: state => state.courseExtension,
  recommendHomepage: state => state.recommendHomepage,
}

const mutations = {
  // 改变属性的状态
  CHANGE_CHECK_COUPOND_ID(state, bool) {
    state.checkCouponId = bool;
  },
  // 修改所有下拉选项
  UPDATE_DROP_DOWN(state, data) {
    // state.
    state.courseDropDowns = data;
  },
  // 修改课程类型
  UPDATE_IS_COMPONENT(state, value) {
    state.is_component_value = value;
  },
  // 更新 course_id
  RESET_COURSE_ID() {
    state.course_id = '';
  },
  // 更新 course_id 和 course_type ，更新组件
  UPDATE_ID_AND_TYPE(state, { course_id, course_type }) {
    state.course_id = course_id;
    state.course_type = course_type;
    state.editorTypeOptions.forEach(({
      course_type: type,
      value
    }) => {
      if (type == course_type) {
        state.is_component_value = value;
      }
    });
    if (course_type == '100') {
      state.course_child_video.course_child_video_chinese.id = course_id
    }
    if (course_type == '300') {
      state.course_open_class.course_open_class_chinese.id = course_id
    }
    if (course_type == '301') {
      state.course_train.course_train_chinese.id = course_id
    }
    if (course_type == '302') {
      state.course_study_background.course_study_chinese.id = course_id
    }
  },
  // 更新 课程类型
  UPDATE_COURSE_TYPE(state, value) {
    state.course_type = value
  },
  // 更新 课程语言
  UPDATE_COURSE_LANGUAGE(state, course_language) {
    state.course_language = course_language;
  },
  // 保存按钮状态
  SAVEING_BUTTON(state, bool) {
    state.course_saving = bool;
  },
  INIT_SHOW_OR_HIDE(state, show_hide) {
    for (let item of Object.keys(show_hide)) {
      state[item] = show_hide[item];
    }
  },
  // 组件控制， 隐藏 or 显示
  CHANGE_SHOW_OR_HIDE(state, { change_name, bool }) {
    state[change_name] = bool;
  },
  // 组件控制， 隐藏 or 显示
  UPDATE_CHECKED(state, { name, bool }) {
    state[name] = bool;
  },
  // 初始化 train ， 隐藏 or 显示
  INIT_TRAIN_SHOW_OR_HIDE(state) {
    // 数据更新之后，初始化 显示—— 隐藏按钮
    const course_train_chinese = state.course_train.course_train_chinese;
    const metaData = course_train_chinese.metaData;
    const additionalData = course_train_chinese.additionalData;
    state.buySuccessInfo = metaData['showCallSuccessQrcode'] ? true : false;
    state.readingGuide = (course_train_chinese['readingGuideTitle'] || course_train_chinese['readingGuideContent']) ? true : false;
    // state.pushInfo = course_train_chinese['buyMsgTemplates'] ? true : false;
    state.pushInfo = course_train_chinese['buyMsgTemplates']  && course_train_chinese['buyMsgTemplates'].length > 0 ? true : false;
    state.curriculumSharingSettings = metaData['shareTitle'] || metaData['shareDesc'] ||
      metaData['shareImg'] ? true : false;
    let courseCollageSetting = (!!metaData['courseQrcode'] || !!metaData['gecShareQrcode'] ||
      !!metaData['gecQrcode'] || !!metaData['groupQrcode']);
    if (courseCollageSetting) {
      state.courseCollageSetting = true;
    } else {
      if (!!additionalData['groupPrices'] && !!additionalData['groupPrices'].length > 0 && (!!additionalData['groupPrices'][0].pplCount || !!additionalData['groupPrices'][0].price || !!additionalData['groupPrices'][0].expirationTime)) {
        state.courseCollageSetting = true;
      }
    }

    state.trainingProject = (metaData['navBgColor'] ||
      metaData['navActiveTextColor'] ||
      metaData['bgColor'] ||
      metaData['banner_phone'] ||
      metaData['teacher_image'] ||

      additionalData['userCount'] ||
      additionalData['nextStageId'] ||


      course_train_chinese['trainTopThreeItems'] ? (course_train_chinese['trainTopThreeItems'].length > 0 ? true : false) : false ||
        course_train_chinese['trainPlain'] ? (course_train_chinese['trainPlain'].desc || course_train_chinese['trainPlain'].title) ? true : false : false ||

          course_train_chinese['trainPlainList'] ? (course_train_chinese['trainPlainList'].length > 0 ? true : false) : false ||


            course_train_chinese['features'] ? (course_train_chinese['features'].length > 0 ? true : false) : false ||
              course_train_chinese['contentText'] ? (course_train_chinese['contentText'].length > 0 ? true : false) : false ||
                course_train_chinese['projectText'] ? (course_train_chinese['projectText'].length > 0 ? true : false) : false ||
                  course_train_chinese['extraMessage'] ? (course_train_chinese['extraMessage'].length > 0 ? true : false) : false ||
                    course_train_chinese['prepareText'] ||
                    course_train_chinese['questions'] ? (course_train_chinese['questions'].length > 0 ? true : false) : false) ? true : false;

    state.daCall = (metaData['callShareTitle'] ||
      metaData['callShareDesc'] ||
      metaData['callShareImg'] ||

      additionalData['callData'].pplCount ||
      additionalData['callData'].expirationTime ||
      additionalData['couponIds'] ? (additionalData['couponIds'] > 0 ? true : false) : false) ? true : false;

  },
  // 初始化 公开课， 隐藏 or 显示
  INIT_OPEN_CLASS_SHOW_OR_HIDE(state) {
    // 数据更新之后，初始化 显示—— 隐藏按钮
    const course_open_class_chinese = state.course_open_class.course_open_class_chinese;
    const metaData = course_open_class_chinese.metaData;
    const additionalData = course_open_class_chinese.additionalData;
    state.buySuccessInfo = metaData['showCallSuccessQrcode'] ? true : false;
    state.buyChecked = metaData['showCallSuccessQrcode'] ? false : true;

    state.readingGuide = (course_open_class_chinese['readingGuideTitle'] || course_open_class_chinese['readingGuideContent']) ? true : false;
    state.pushInfo = course_open_class_chinese['buyMsgTemplates']   && course_open_class_chinese['buyMsgTemplates'].length > 0 ? true : false;
    state.curriculumSharingSettings = metaData['shareTitle'] || metaData['shareDesc'] ||
      metaData['shareImg'] ? true : false;

    let courseCollageSetting = (!!metaData['courseQrcode'] || !!metaData['gecShareQrcode'] ||
      !!metaData['gecQrcode'] || !!metaData['groupQrcode']);
    if (courseCollageSetting) {
      state.courseCollageSetting = true;
    } else {
      if (!!additionalData['groupPrices'] && !!additionalData['groupPrices'].length > 0 && (!!additionalData['groupPrices'][0].pplCount || !!additionalData['groupPrices'][0].price || !!additionalData['groupPrices'][0].expirationTime)) {
        state.courseCollageSetting = true;
      }
    }
    state.SeriesOfCourses = (metaData['backgroundImg'] ||
      metaData['seriesIntroductionImgPc'] ||
      metaData['seriesIntroductionImg']) ? true : false;

    state.daCall = (metaData['callShareTitle'] ||
      metaData['callShareDesc'] ||
      metaData['callShareImg'] ||

      additionalData['callData'].pplCount ||
      additionalData['callData'].expirationTime ||
      additionalData['couponIds'].some(item => item)) ? true : false;

  },
  // 初始化 study ， 隐藏 or 显示
  INIT_STUDY_SHOW_OR_HIDE(state) {
    // 数据更新之后，初始化 显示—— 隐藏按钮
    const course_study_chinese = state.course_study_background.course_study_chinese;
    const metaData = course_study_chinese.metaData;
    const additionalData = course_study_chinese.additionalData;
    // 购买成功页面的弹窗
    state.buySuccessInfo = metaData['showCallSuccessQrcode'] ? true : false;
    
    // 购买服务号推送的消息
    state.pushInfo = course_study_chinese['buyMsgTemplates'] && course_study_chinese['buyMsgTemplates'].length > 0 ? true : false;
    
    // 课程分享设置
    state.curriculumSharingSettings = metaData['shareTitle'] || metaData['shareDesc'] ||
      metaData['shareImg'] ? true : false;


    // 导师寄语
    state.tutorMessage = (course_study_chinese['lecturerMessage'].video_url ||
      course_study_chinese['lecturerMessage'].title ||
      course_study_chinese['lecturerMessage'].subtitle ||
      course_study_chinese['lecturerMessage'].summary) ? true : false;
    // 课程推广设置
    state.courseExtension = (metaData['forceShowApplicationButton'] ||
      metaData['html']) ? true : false;
  },

  UPDATE_LECTURERS_DATA(state, { lecturers_data, bool }) {
    state.course_lecturers = {
      data: lecturers_data,
      state: bool
    }
  },

  SAVE_COURSE_MESSAGE(state, message) {
    state.saveCourseMessage = message;
  },
  DELETE_COURSE_MESSAGE(state, message) {
    state.deleteCourseMessage = message;
  },
  DA_CALL_MESSAGE(state, message) {
    state.daCallMessage = message;
  },
  CHECK_QRCODES(state, message) {
    state.qrcodesMessage = message;
  },
  SAVE_COURSE_ENGLISH_MESSAGE(state, message) {
    state.saveCourseEnglishMessage = message;
  },

}

const actions = {
  fetchAllDropDowns({ commit }) {
    // 获取所有下拉列表的数据
    const param = `query lists($filter: JSON, $filterCourse:JSON, $page: JSON, $filterQuestion:JSON){
        courseTypes {
          id, label, value
        },
        courseCategories {
          id,name
        },
        courses(page: $page) {
          id,name
        },
        videoCourse: courses(filter: $filterCourse, page: $page) {
          id,name
        },
        users(filter: $filter) {
          id,username
        },
        attachments(page: $page) {
          id,
          title
        },
        surveyQuestions(filter: $filterQuestion, page: $page) {
          id,content
        }
      }`;
    utils
      .request(param, {
        filter: {
          role: 'teacher'
        },
        filterCourse: {
          type: 100
        },
        page: {
          number: 1,
          size: 1000
        },
        filterQuestion: {
          category: 'Course'
        }
      })
      .then(({
        body: {
          data
        }
      }) => {
        data.courseCategories.unshift({
          id: 'wu',
          name: '无'
        });
        commit('UPDATE_DROP_DOWN', data);
      })
      .catch(error => console.log(error));
  },
  saveCourse({ dispatch, commit, state }) {
    let state_course_data;
    const locale = state.course_language === 'CHINESE' ? 'zh' : 'en';
    let course_id = state.course_id ? `id: "${state.course_id}",` : "";
    switch (state.is_component_value) {
      case 'app-child-video':
        state_course_data = locale === 'zh' ?
          JSON.parse(JSON.stringify(state.course_child_video.course_child_video_chinese))
          :
          JSON.parse(JSON.stringify(state.course_child_video.course_child_video_english));
        break;
      case 'app-open-class':
        state_course_data = locale === 'zh' ?
          JSON.parse(JSON.stringify(state.course_open_class.course_open_class_chinese))
          :
          JSON.parse(JSON.stringify(state.course_open_class.course_open_class_english));
        break;
      case 'app-train':
        state_course_data = locale === 'zh' ?
          JSON.parse(JSON.stringify(state.course_train.course_train_chinese))
          :
          JSON.parse(JSON.stringify(state.course_train.course_train_english));
        break;
      case 'app-studybackground':
        state_course_data = locale === 'zh' ?
          JSON.parse(JSON.stringify(state.course_study_background.course_study_chinese))
          :
          JSON.parse(JSON.stringify(state.course_study_background.course_study_english));
        break;
    }
    state_course_data.type = state.course_type;
    if (Object.is(locale, 'en') && !course_id) {
      commit('SAVE_COURSE_ENGLISH_MESSAGE', true)
      return;
    }
    if (Object.is(locale, 'en') && course_id) {
      state_course_data.courseId = state.course_id;
      // 注意， 这里是判读英文版的是否有英文的id，有就是修改，没有就是创建
      course_id = state_course_data.id ? `id: "${state_course_data.id}",` : "";
    }

    if (state_course_data.lecturerMessage && state_course_data.lecturerMessage.video_url) {
      state_course_data.lecturerMessage.video_url = utils.replaceOss(
        state_course_data.lecturerMessage.video_url
      );
    }
    if (state_course_data.videoUrl) {
      state_course_data.videoUrl = utils.replaceOss(state_course_data.videoUrl);
    }
    if (state_course_data.coverImgUrl) {
      state_course_data.coverImgUrl = utils.replaceOss(state_course_data.coverImgUrl);
    }
    if (state_course_data.metaData && state_course_data.metaData.docUrl) {
      state_course_data.metaData.docUrl = utils.replaceOss(state_course_data.metaData.docUrl);
    }

    // 隐藏显示信息判断
    if (state.buyChecked) {
      state_course_data.metaData.showCallSuccessQrcode = null;
    }
    console.log(state_course_data.metaData.showCallSuccessQrcode)
    // if(state_course_data.hasOwnProperty('buyMsgTemplates')){
    //   state_course_data.buyMsgTemplates = JSON.stringify(state_course_data.buyMsgTemplates);
    // }else{
    //   state_course_data.buyMsgTemplates = JSON.stringify([{"template_id":"wfV3U-bE_voh7auXkY9qzzZbcta3qWb_OrehwtMLvCY","url":"https://www.gecacademy.cn/#/review","data":{"first":{"value":"您好，您的课程购买成功","color":"#be1a1d"},"keyword1":{"value":"测试公开课123"},"keyword2":{"value":"点击查看开课详情"},"remark":{"value":"感谢您的购买。"}}}]);

    // }
   


    for (let key in state_course_data.metaData) {
      let value = state_course_data.metaData[key];
      if (typeof value === 'string') {
        value = utils.replaceOss(value);
      }

      if (typeof value === 'object') {
        for (let keySub in value) {
          let valueSub = value[keySub];
          if (typeof valueSub === 'string') {
            value[keySub] = utils.replaceOss(valueSub);
          }
        }
      }

      state_course_data.metaData[key] = value;
    }

    // 保存信息过滤
    for (let item of Object.keys(state_course_data)) {

      // debugger
      // console.log('course:', item + ' : ' + state_course_data[item]);
      if (Object.prototype.toString.call(state_course_data[item]) === '[object Object]') {
        if (item === 'additionalData') {
          for (let key of Object.keys(state_course_data[item])) {
            if (Object.prototype.toString.call(state_course_data[item][key]) === '[object Array]') {
              state_course_data[item][key].forEach(children => {
                const temp_arr = [];
                for (let child of Object.keys(children)) {
                  temp_arr.push(children[child]);
                }
                let output_bool = temp_arr.every((temp) => {
                  return !!temp === false
                })
                output_bool ? state_course_data[item][key] = [] : '';
              })
            }
            if (Object.prototype.toString.call(state_course_data[item][key]) === '[object Object]') {
              let temp_arr = [];
              for (let object_item of Object.keys(state_course_data[item][key])) {
                console.log('object_item', object_item)
                if (typeof object_item !== 'object') {
                  temp_arr.push(state_course_data[item][key][object_item]);
                }
              }
              let output_bool = temp_arr.every(temp => {
                return !!temp === false;
              })

              output_bool ? state_course_data[item][key] = null : '';
            }
          }
          // console.log('[object Object]', item + ':' + state_course_data[item])
        }
      }
      if (Object.prototype.toString.call(state_course_data[item]) === '[object Array]') {
        // console.log( '[object Array]', item + ':' + state_course_data[item])
        // 判断这个数组中的值是否为null 值都为null 则 这个对象为null
        state_course_data[item].forEach((children) => {
          let temp_arr = [];
          for (let key of Object.keys(children)) {

            if (typeof children[key] !== 'object') {
              temp_arr.push(children[key])
            }
            // item === 'catalog'
            if (key === 'courseIds') {
              temp_arr.push(children[key] && children[key].length > 0 ? true : false);
            }
            if (key === 'survey') {
              let survey_arrs = [];
              if (children[key]) {
                for (let survey of Object.keys(children[key])) {
                  if (typeof children[key][survey] !== 'object') {
                    survey_arrs.push(children[key][survey]);
                  }
                  if (survey === 'questionIds') {
                    children[key][survey] && children[key][survey].length > 0 ? survey_arrs.push(!!children[key][survey]) : survey_arrs.push(false);
                  }
                }
              }

              let survey_bool = survey_arrs.every(survey_arr => {
                return !!survey_arr === false;
              })
              if (survey_bool) {
                children[key] = null;
              }
              console.log('survey_arrs', survey_arrs)
              temp_arr = [...temp_arr, !survey_bool]
              // console.log('temp_arr...')
              // console.log(temp_arr)
            }
            // item === 'attachments'
            if (key === 'attachmentIds') {
              temp_arr.push(children[key].length > 0 ? true : false);
            }
          }
          // console.log('temp_arr:',  temp_arr)
          let output_bool = temp_arr.every((arrItem) => {
            return !!arrItem === false;
          })
          output_bool ? state_course_data[item] = [] : '';
        })
      }

    }

    if (locale === 'zh' && (state.daCall && !(state_course_data.additionalData && state_course_data.additionalData.couponIds && state_course_data.additionalData.couponIds.length > 0 && state_course_data.additionalData.couponIds[0])) || state.checkCouponId) {
      commit('DA_CALL_MESSAGE', true);
      return;
    }
    if (state.courseCollageSetting) {
      const qrcodes = [
        'gecShareQrcode',
        'gecQrcode',
        'groupQrcode',
        'courseQrcode'
      ];
      for (let item of qrcodes) {
        if (!state_course_data.metaData[item]) {
          commit('CHECK_QRCODES', { name: item, bool: true });
          return;
        }
      }
      // qrcodes.forEach((item)=>{

      //   console.log('item:', state_course_data.metaData[item]);
      // })
    }
    /*
    state.is_component_value
    
    */ 
    if(state.is_component_value !== 'app-child-video' && !state.pushInfo){
      state_course_data['buyMsgTemplates'] = [
        {
          template_id: 'wfV3U-bE_voh7auXkY9qzzZbcta3qWb_OrehwtMLvCY',
          url: 'https://www.gecacademy.cn/#/review',
          data: {
            first: {
              value: '您好，您的课程购买成功',
              color: '#be1a1d'
            },
            keyword1: {
              value: state_course_data.name
            },
            keyword2: {
              value: '点击查看开课详情'
            },
            remark: {
              value: '感谢您的购买。'
            }
          }
        }
      ]
    } 
    if (typeof (state_course_data['buyMsgTemplates']) === 'string') {
      state_course_data['buyMsgTemplates'] = JSON.parse(state_course_data['buyMsgTemplates'])
    }

    
    // console.log(state_course_data)
    // debugger
    // return 
      
    const param = ` mutation couse($data: JSON) {
            course(${course_id}locale: "${locale}", data: $data) {
              id
            }
          }`;
    commit('SAVEING_BUTTON', true)
    // this.saving = true;
    utils
      .request(param, {
        data: state_course_data
      })
      .then(({ data: { data: { course } } }) => {
        console.log('state_course_data', state_course_data)
        if (locale === 'zh') {
          commit('UPDATE_ID_AND_TYPE', {
            course_id: course['id'],
            course_type: state.course_type
          })
          if (state_course_data.hasOwnProperty('additionalData')) {
            dispatch('saveCourseAdditionalDataHandler', state_course_data)
          }
          // let course_id = course.id;
          // this.course.en.courseId = course_id;
          // this.$store.commit('setCourseId', course.id)
        }
        console.log('课程主要信息——保存成功')
        setTimeout(() => {
          commit('SAVEING_BUTTON', false)
        }, 500);
        commit('SAVE_COURSE_MESSAGE', true)
      })
      .catch(err => {
        console.log('err', err);
        setTimeout(() => {
          commit('SAVEING_BUTTON', false)
        }, 500);
        commit('SAVE_COURSE_MESSAGE', false)
      });
  },
  saveCourseAdditionalDataHandler({ state }, { additionalData }) {
    additionalData.courseId = state.course_id;

    // this.$store.commit('setCourse', this.course );

    const param = ` mutation courseAdditionalData($data: JSON) {
        courseAdditionalData( data: $data) {
          id
        }
      }`
    return utils.request(param, {
      data: additionalData
    }).then(res => {
      // console.log('additionData:', additionalData)
      // console.log('additionData——保存成功')
    }).catch(err => {
      // console.log(err)
      // console.log('additionData——保存失败')
    })
  },
  deleteCourse({ dispatch, commit, state }) {
    let course_id = state.course_id,
      course_en_id,
      course_additional_id,
      additionalData,
      varString = '';
    switch (state.is_component_value) {
      case 'app-child-video':
        course_en_id = state.course_child_video.course_child_video_english.id;
        break
      case 'app-open-class':
        course_en_id = state.course_open_class.course_open_class_english.id;
        additionalData = state.course_open_class.course_open_class_chinese.additionalData;
        if (additionalData) {
          course_additional_id = additionalData.id;
        }
        break
      case 'app-train':
        course_en_id = state.course_train.course_train_english.id;
        additionalData = state.course_train.course_train_chinese.additionalData;
        if (additionalData) {
          course_additional_id = additionalData.id;
        }
        break
      case 'app-studybackground':
        course_en_id = state.course_study_background.course_study_english.id;
        additionalData = state.course_study_background.course_study_chinese.additionalData;
        if (additionalData) {
          course_additional_id = additionalData.id
        }
        break
    }
    if (course_en_id) {
      varString = `
            courseen: course(id: "${course_en_id}", toDelete: true, locale: "en") {
              id
            }
          `;
    }
    if (additionalData && course_additional_id) {
      varString += `
            courseAdditionalData(id: "${course_additional_id}", toDelete: true) {
              id
            }
          `;
    }
    
    const param = ` mutation {
      ${varString}
      course(id: "${course_id}", toDelete: true, locale: "zh") {
        id
      }
    } `
    utils.request(param).then(response => {
      commit('DELETE_COURSE_MESSAGE', { bool: true, info: '删除成功' })

    }).catch(error => { commit({ bool: true, info: error }) })
  }
}
const modules = {
  course_child_video,
  course_open_class,
  course_study_background,
  course_train
}
export default {
  state,
  getters,
  mutations,
  actions,
  modules
}
