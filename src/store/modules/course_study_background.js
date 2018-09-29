import utils from '@/utils/util';
const state = {
  course_study_chinese: {
    type: '302',
    id: '',
    lecturers: [{
      id: null,
      username: null
    }],
    lecturersInfo: [{
      id: null,
      username: null
    }]
  },
  course_study_english: {
    id: null,
    name: null,
    type: 302,
    description: null,
    timeTitle: null,
    timeSubtitle: null,
    languageTitle: null,
    languageSubtitle: null,
    priceSubtitle: null,
    location: null,
    price: null,
    promotionPrice: null,
    summary: null,
    features: [{
      title: null,
      subtitle: null
    }],
    contentText: [{
      week: null,
      title: null,
      subtitle: null
    }],
    projectText: [{
      week: null,
      title: null,
      subtitle: null
    }],
    extraMessage: [{
      imgUrl: null,
      title: null,
      subtitle: null
    }],
    metaData: {
      showPosition: null,
      prospect: null,
      costImplications: null,
      Accommodation: null,
      hidden: true,
      showBuyButton: null,
      showCallSuccessQrcode: null,
      shareTitle: null,
      shareDesc: null,
      shareImg: null,
      seriesTag: null,
      forceShowApplicationButton: null,
      html: null
    },
    prepareText: null,
    questions: [{
      title: null,
      content: null
    }],
    recommendHomepage: null,
    recommendHomepageSort: null,
    priorityLevel: null,
    recommendCourseIds: null,
    lecturerMessage: {
      video_url: null,
      title: null,
      subtitle: null,
      summary: null
    }

  },
  course_recommendCourseIds: {
    data: [{
      id: null,
      name: null
    }],
    state: false
  },

}


const getters = {
  course_study_chinese: state => state.course_study_chinese,
  course_study_english: state => state.course_study_english,
  course_recommendCourseIds: state => state.course_recommendCourseIds,

}
const mutations = {
  INIT_STUDY_BACKGROUND(state) {
    state.course_study_chinese = {
      type: '302',
      id: ''
    }
    state.course_study_english = {
      id: null,
      name: null,
      type: 302,
      description: null,
      timeTitle: null,
      timeSubtitle: null,
      languageTitle: null,
      languageSubtitle: null,
      priceSubtitle: null,
      location: null,
      price: null,
      promotionPrice: null,
      summary: null,
      features: [{
        title: null,
        subtitle: null
      }],
      contentText: [{
        week: null,
        title: null,
        subtitle: null
      }],
      projectText: [{
        week: null,
        title: null,
        subtitle: null
      }],
      extraMessage: [{
        imgUrl: null,
        title: null,
        subtitle: null
      }],
      metaData: {
        showPosition: null,
        prospect: null,
        costImplications: null,
        Accommodation: null,
        hidden: true,
        showBuyButton: null,
        showCallSuccessQrcode: null,
        shareTitle: null,
        shareDesc: null,
        shareImg: null,
        seriesTag: null,
        forceShowApplicationButton: null,
        html: null
      },
      prepareText: null,
      questions: [{
        title: null,
        content: null
      }],
      recommendHomepage: null,
      recommendHomepageSort: null,
      priorityLevel: null,
      recommendCourseIds: null,
      lecturerMessage: {
        video_url: null,
        title: null,
        subtitle: null,
        summary: null
      }
    }
    state.course_recommendCourseIds = {
      data: [{
        id: null,
        name: null
      }],
      state: false
    }
  },
  // 留学背景提升 中文
  UPDATE_COURSE_STUDY(state, { newProp, value }) {

    const { ...state_course_study_chinese
    } = state.course_study_chinese;
    state_course_study_chinese[newProp] = value;
    state.course_study_chinese = state_course_study_chinese;
  },
  // 留学背景提升 英文
  UPDATE_COURSE_STUDY_ENGLISH(state, { newProp, value }) {

    const { ...state_course_study_english
    } = state.course_study_english;
    state_course_study_english[newProp] = value;
    state.course_study_english = state_course_study_english;
  },
  UPDATE_FETCH_STUDY_CHINESE(state, course_data, ) {

    const { ..._state_study_chinese
    } = state.course_study_chinese
    for (let item in course_data) {
      //   if(item == 'metaData'){
      //       continue;
      //   }
      if (!course_data[item]) {
        continue
      }
      if (_state_study_chinese.hasOwnProperty(item)) {
        _state_study_chinese[item] = course_data[item]
      }
    }
    state.course_study_chinese = _state_study_chinese

    console.log('留学背景提升中文数据， 数据更新成功！')
  },
  UPDATE_FETCH_STUDY_ENGLISH(state, course_data, ) {
    const { ..._state_study_english
    } = state.course_study_english
    for (let item in course_data) {
      //   if(item == 'metaData'){
      //       continue;
      //   }

      if (_state_study_english.hasOwnProperty(item)) {
        _state_study_english[item] = course_data[item]
      }
    }
    state.course_study_english = _state_study_english

    console.log('留学背景提升英文数据， 数据更新成功！')
  },
  UPDATE_RECOMMENT_DATA(state, { recommendCourseIds_data, bool }) {
    state.course_recommendCourseIds = {
      data: recommendCourseIds_data,
      state: bool
    }
  },
}
const actions = {
  fetchStudyChineseData({
    state, commit
  }, course_id) {
    const param = `{
          courses(id: "${course_id}"){
            id,
            type,
            name,
            startAt,
            lecturers {
                id,username
            },
            lecturersInfo,
            description,
            timeTitle,
            timeSubtitle,
            languageTitle,
            languageSubtitle,
            priceSubtitle,
            location,
            metaData,
            summary,
            range,
            coverImgUrl,
            price,
            promotionPrice,
            catalogCourses,
            features,
            contentText,
            projectText,
            extraMessage,
            prepareText,
            questions,
            timeSubtitle,
            categoryId,
            recommendHomepage,
            recommendHomepageSort,
            application,
            priorityLevel,
            recommendCourseIds,
            buyMsgTemplates,
            lecturerMessage,
            en {
              id,
              name,
              description,
              timeTitle,
              timeSubtitle,
              languageTitle,
              languageSubtitle,
              priceSubtitle,
              location,
              price,
              promotionPrice,
              features,
              contentText,
              projectText,
              extraMessage,
              summary,
              metaData,
              prepareText,
              questions,
              recommendHomepage,
              recommendHomepageSort,
              priorityLevel,
              recommendCourseIds,
              lecturerMessage
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
        commit('UPDATE_FETCH_STUDY_CHINESE', courses[0]);
        if (courses[0].en) {
          commit('UPDATE_FETCH_STUDY_ENGLISH', courses[0].en);
        }
        if (courses[0].hasOwnProperty('lecturers')) {
          console.log('courses[0].lecturers')
          console.log(courses[0].lecturers)
          commit('UPDATE_LECTURERS_DATA', { lecturers_data: courses[0].lecturers, bool: true })
        }
        if (courses[0].hasOwnProperty('recommendCourseIds')) {
          console.log('courses[0].recommendCourseIds')
          console.log(courses[0].recommendCourseIds)
          commit('UPDATE_RECOMMENT_DATA', { recommendCourseIds_data: courses[0].recommendCourseIds, bool: true })
        }
        commit('INIT_STUDY_SHOW_OR_HIDE')
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
