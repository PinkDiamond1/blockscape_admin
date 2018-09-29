import utils from '@/utils/util';

const state = {
  // 设置属性
  course_child_video_chinese: {
    type: '100',
    id: ''
  },
  course_child_video_english: {
    type: '100',
    id: '',
    name: null 
  },


}

const getters = {
  // 获取属性的状态
  course_child_video_chinese: state => state.course_child_video_chinese,
  course_child_video_english: state => state.course_child_video_english,
}

const mutations = {
  // 改变属性的状态
  INIT_CHILD_VIDEO (){
    state.course_child_video_chinese = {
      type: '100',
      id: ''
    };
    state.course_child_video_english = {
      type: '100',
      id: '',
      name: null 
    };
  },
  UPDATE_CHILD_VIDEO_CHINESE(state, {
    newProp,
    value
  }) {
    const { ...state_course_child_video_chinese
    } = state.course_child_video_chinese;
    state_course_child_video_chinese[newProp] = value;
    state.course_child_video_chinese = state_course_child_video_chinese;
  },
  UPDATE_CHILD_VIDEO_ENGLISH (state, {newProp, value}){
    state.course_child_video_english[newProp] = value;
  },
  UPDATE_FETCH_CHILD_VIDEO_CHINESE(state, course_data, ) {

    const { ..._state_child_video_chinese
    } = state.course_child_video_chinese
    for (let item in course_data) {
      if (_state_child_video_chinese.hasOwnProperty(item)) {
        _state_child_video_chinese[item] = course_data[item]
      }
    }
    state.course_child_video_chinese = _state_child_video_chinese

    console.log('子视频 中文- 数据更新成功！')
  },
  UPDATE_FETCH_CHILD_VIDEO_ENGLISH(state, course_data,) {
   
    const { ..._state_child_video_english
    } = state.course_child_video_english
    for (let item in course_data) {
      if (_state_child_video_english.hasOwnProperty(item)) {
        _state_child_video_english[item] = course_data[item]
      }
    }
    state.course_child_video_english = _state_child_video_english

    console.log('子视频 英文- 数据更新成功！')
  },
}
const actions = {
  fetchChildVideoChineseData({
    state,
    commit
  }, course_id) {
    const param = `{
      courses(id: "${course_id}"){
        id,
        type,
        name,
        videoType,
        metaData,
        startAt,
        endAt,
        videoDuration,
        videoUrl,
        en{
          id,
          name
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
  
      if(courses[0].en){

        commit('UPDATE_FETCH_CHILD_VIDEO_ENGLISH', courses[0].en);
      }
      if (courses[0]) {
        commit('UPDATE_FETCH_CHILD_VIDEO_CHINESE', courses[0]);
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
