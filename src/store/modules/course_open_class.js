import utils from '@/utils/util';

const state = {
    // 设置属性
    course_open_class_chinese: {
      type: '300',
      id: '',
      lecturers: [{
        id: null,
        username: null
      }],
      lecturersInfo: [{
        id: null,
        username: null
      }],
      additionalData:{
        callData: {
          pplCount: 0,
          expirationTime: 0
        },
        id: null,
        groupPrices: [{ pplCount: 0, price: 0,expirationTime: 0 }],
        couponIds: [],
        showCouponId: null,
        basePeopleCount: null,
        buttons: []
      }
    },
    course_open_class_english: {
      type: '300',
      id: null,
      name: null,
      timeTitle: null,
      timeSubtitle: null,
      languageTitle: null,
      summary: null,
      recommendHomepage: false,
      recommendHomepageSort: null,
      metaData: {
          shareTitle: null,
          shareDesc: null,
          shareImg: null,
          courseQrcode: null,
          gecShareQrcode: null,
          gecQrcode: null,
          groupQrcode: null,
          hidden: true
      },
      priorityLevel: null,
      relatedCourseIds: [],
      readingGuideTitle: null,
      readingGuideContent: null,
      additionalData: {
          id: null,
          groupPrices: [ {  pplCount: null, price: null ,expirationTime: null } ]
      }
    },


}

const getters = {
    // 获取属性的状态
    course_open_class_chinese : state => state.course_open_class_chinese,
    course_open_class_english : state => state.course_open_class_english,
}

const mutations = {
    CLEAR_OPEN_CLASS_STATE(){
      state.course_open_class_chinese = {
        type: '300',
        id: '',
        lecturers: [{
          id: null,
          username: null
        }],
        lecturersInfo: [{
          id: null,
          username: null
        }],
        additionalData:{
          callData: {
            pplCount: 0,
            expirationTime: 0
          },
          id: null,
          groupPrices: [{ pplCount: 0, price: 0,expirationTime: 0 }],
          couponIds: [],
          showCouponId: null,
          basePeopleCount: null,
          buttons: []
        }
      };
      state. course_open_class_english= {
        type: '300',
        id: null,
        name: null,
        timeTitle: null,
        timeSubtitle: null,
        languageTitle: null,
        summary: null,
        recommendHomepage: false,
        recommendHomepageSort: null,
        metaData: {
            shareTitle: null,
            shareDesc: null,
            shareImg: null,
            courseQrcode: null,
            gecShareQrcode: null,
            gecQrcode: null,
            groupQrcode: null,
            hidden: true
        },
        priorityLevel: null,
        relatedCourseIds: [],
        readingGuideTitle: null,
        readingGuideContent: null,
        additionalData: {
            id: null,
            groupPrices: [ {  pplCount: null, price: null ,expirationTime: null } ]
        }
      }
    },
    // 改变属性的状态
    UPDATE_OPEN_CLASS_CHINESE(state, { newProp, value }) {
      const { ...state_course_open_class_chinese
      } = state.course_open_class_chinese;
      state_course_open_class_chinese[newProp] = value;
      state.course_open_class_chinese = state_course_open_class_chinese;
    },

    UPDATE_OPEN_CLASS_ENGLISH(state, { newProp, value }) {
      const { ...state_course_open_class_english
      } = state.course_open_class_english;
      state_course_open_class_english[newProp] = value;
      state.course_open_class_english = state_course_open_class_english;
    },
    UPDATE_FETCH_OPEN_CLASS_CHINESE(state, course_data,) {

      const { ..._state_open_class_chinese
      } = state.course_open_class_chinese
      for (let item in course_data) {
        if (_state_open_class_chinese.hasOwnProperty(item)) {
          if(!course_data[item]){
            continue
          }
          if (item === 'catalog') {
            course_data[item] =  course_data[item].map((children) => {
              if (!children.hasOwnProperty('survey') || children.hasOwnProperty('survey') && !children['survey']) {
                children['survey'] = {
                  title: null,
                  titleEn: null,
                  questionIds: []
                }
              }else if(children.hasOwnProperty('survey') && children['survey']){
                children['survey'].questionIds ? '':children['survey'].questionIds =  [];
              }
              return children;
            });
          }
          if(item === 'additionalData'){
            if(!course_data[item].groupPrices || course_data[item].groupPrices.length === 0){
              course_data[item].groupPrices = [{ pplCount: 0, price: 0, expirationTime: 0 }]
            }
            if(!course_data[item].callData){
              course_data[item].callData = {
                pplCount: 0,
                expirationTime: 0
              }
            }
            if(!course_data[item].couponIds){
              course_data[item].couponIds = []
            }
            if(!course_data[item].buttons){
              course_data[item].buttons = []
            }
          }
          _state_open_class_chinese[item] = course_data[item]
        }
      }
      state.course_open_class_chinese = _state_open_class_chinese;
      // console.log('保存测试');
      // console.log(_state_open_class_chinese);
      console.log('公开课中文- 数据更新成功！')
    },
    UPDATE_FETCH_OPEN_CLASS_ENGLISH(state, course_data,) {

      const { ..._state_open_class_english
      } = state.course_open_class_english
      for (let item in course_data) {
        if (_state_open_class_english.hasOwnProperty(item)) {
          if(!course_data[item]){
            continue
          }
          _state_open_class_english[item] = course_data[item]
        }
      }
      state.course_open_class_english = _state_open_class_english;
  
      console.log('公开课英文- 数据更新成功！')
    },

}
const actions = {
  fetchOpenClassChineseData({
    state, commit
  }, course_id) {
    const param = `{
      courses(id: "${course_id}"){
        id,
        type,
        name,
        metaData,
        lecturers {
          id,username
        },
        startAt,
        endAt,
        description,
        lecturersInfo,
        timeTitle,
        timeSubtitle,
        languageTitle,
        summary,
        coverImgUrl,
        price,
        promotionPrice,
        catalogCourses,

        catalog,
        attachments,

        categoryId,
        recommendHomepage,
        recommendHomepageSort,
        priorityLevel,
        relatedCourseIds,
        
        readingGuideTitle,
        readingGuideContent,
        buyMsgTemplates,
        additionalData {
          id,
          groupPrices,
          callData,
          couponIds,
          showCouponId,
          basePeopleCount,
          buttons
        },
        en{
          id,
          name,
          timeTitle,
          timeSubtitle,
          languageTitle,
          summary,
          recommendHomepage,
          recommendHomepageSort, 
          priorityLevel,
          relatedCourseIds,
          readingGuideContent,
          metaData,
          additionalData {
            id,
            groupPrices,
            callData,
            couponIds 
          }
        }
      }
    }`;
    utils.request(param).then(({
      body: {
        data: {
          courses
        }
      }
    }) => {
      if (courses[0]) {
        commit('UPDATE_FETCH_OPEN_CLASS_CHINESE', courses[0]);
        if(courses[0].en){
          commit('UPDATE_FETCH_OPEN_CLASS_ENGLISH', courses[0].en);
        }
        if (courses[0].hasOwnProperty('lecturers')) {
          commit('UPDATE_LECTURERS_DATA', {lecturers_data:courses[0].lecturers, bool: true})
        }
        commit('INIT_OPEN_CLASS_SHOW_OR_HIDE');
      }
    })
  }
}

export default {
    state,
    getters,
    mutations,
    actions
}