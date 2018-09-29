import utils from '@/utils/util';

const state = {
  // 设置属性
  course_train_chinese: {
    type: '301',
    id: '',
    lecturers: [{
      id: null,
      username: null
    }],
    lecturersInfo: [{
      id: null,
      username: null
    }],

    trainNavImgs: [{
      imgUrl: ''
    }],
    trainTopThreeItems: [{
      imgUrl: null,
      title: null,
      subtitle: null
    }],
    trainPlain: {
      title: null,
      desc: null
    },
    trainPlainList: [{
      imgUrl: null,
      title: null,
      subtitle: null
    }],
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
    prepareText: null,
    questions: [{
      title: null,
      content: null
    }],
  },
  course_train_english: {
    type: '301',
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
      groupPrices: [
        {
          pplCount: null,
          price: null
        }
      ]
    },
  }


}

const getters = {
  // 获取属性的状态
  trainChinese: state => state.course_train_chinese,
  course_train_english: state => state.course_train_english,
}

const mutations = {
  INIT_TRAIN_STATE(state) {
    let course_train_chinese = {
      type: '301',
      lecturers: [{
        id: null,
        username: null
      }],
      lecturersInfo: [{
        id: null,
        username: null
      }],

      trainNavImgs: [{
        imgUrl: ''
      }],
      trainTopThreeItems: [{
        imgUrl: null,
        title: null,
        subtitle: null
      }],
      trainPlain: {
        title: null,
        desc: null
      },
      trainPlainList: [{
        imgUrl: null,
        title: null,
        subtitle: null
      }],
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
      prepareText: null,
      questions: [{
        title: null,
        content: null
      }],
    };
    state.course_train_chinese = course_train_chinese;
    state.course_train_english = {
      type: '301',
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
        groupPrices: [
          {
            pplCount: null,
            price: null
          }
        ]
      },
    }
  },
  // 改变属性的状态
  UPDATE_TRAIN_CHINESE(state, { newProp, value }) {
    const { ...state_course_train_chinese
    } = state.course_train_chinese;
    state_course_train_chinese[newProp] = value;
    state.course_train_chinese = state_course_train_chinese;

  },
  UPDATE_TRAIN_ENGLISH(state, { newProp, value }) {
    const { ...state_course_train_english
    } = state.course_train_english;
    state_course_train_english[newProp] = value;
    state.course_train_english = state_course_train_english;

  },
  UPDATE_FETCH_TRAIN_CHINESE(state, course_data, ) {

    const { ..._state_train_chinese
    } = state.course_train_chinese
    for (let item in course_data) {
      if (_state_train_chinese.hasOwnProperty(item)) {
        if (!course_data[item]) {
          continue
        }
        if (item === 'catalog') {
          course_data[item] = course_data[item].map((children) => {
            if (!children.hasOwnProperty('survey') || children.hasOwnProperty('survey') && !children['survey']) {
              children['survey'] = {
                title: null,
                titleEn: null,
                questionIds: []
              }
            } else if (children.hasOwnProperty('survey') && children['survey']) {
              children['survey'].questionIds ? '' : children['survey'].questionIds = [];
            }
            return children;
          });
        }

        if (item === 'additionalData') {
          if (!course_data[item].groupPrices || course_data[item].groupPrices.length === 0) {
            course_data[item].groupPrices = [{ pplCount: 0, price: 0, expirationTime: 0 }]
          }
          if (!course_data[item].callData) {
            course_data[item].callData = {
              pplCount: 0,
              expirationTime: 0
            }
          }
          if (!course_data[item].couponIds) {
            course_data[item].couponIds = []
          }
          if (!course_data[item].buttons) {
            course_data[item].buttons = []
          }
        }
        _state_train_chinese[item] = course_data[item]
      }
    }

    state.course_train_chinese = _state_train_chinese

    console.log('训练营中文 - 数据更新成功！')
  },
  UPDATE_FETCH_TRAIN_ENGLISH(state, course_data, ) {

    const { ..._state_train_english
    } = state.course_train_english
    for (let item in course_data) {
      if (_state_train_english.hasOwnProperty(item)) {
        if (!course_data[item]) {
          continue;
        }
        _state_train_english[item] = course_data[item]
      }
    }
    state.course_train_english = _state_train_english

    console.log('训练营英文 - 数据更新成功！')
  },

}
const actions = {
  fetchTrainChineseData({
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
          nextStageId,
          userCount,
          callData,
          couponIds,
          showCouponId,
          buttons,
          basePeopleCount
        },
        trainNavImgs,
        trainTopThreeItems,
        trainPlain,
        trainPlainList,
        features,
        contentText,
        projectText,
        extraMessage,
        prepareText,
        questions,
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
            nextStageId,
            userCount,
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
        commit('UPDATE_FETCH_TRAIN_CHINESE', courses[0]);
        if (courses[0].en) {
          commit('UPDATE_FETCH_TRAIN_ENGLISH', courses[0].en);
        }
        if (courses[0].hasOwnProperty('lecturers')) {
          commit('UPDATE_LECTURERS_DATA', { lecturers_data: courses[0].lecturers, bool: true })
        }
        commit('INIT_TRAIN_SHOW_OR_HIDE');
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