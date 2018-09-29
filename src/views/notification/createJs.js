import utils from '@/utils/util'
import GecUploader from '@/utils/upload'

let id
export default {
  name: 'createNotification',
  data() {
    return {
      noti: {
        // pushType: '0',
        data: '{"first": {"value": "Hi, 直播将在1小时后开始\n"},"keyword1": {"value": "--第1行请修改此处--", "color": "#173177"},"keyword2": {"value": "--第2行请修改此处--", "color": "#173177"},"remark": {"value": "\n直播ID: 225 669 464\n直播链接: https://zoom.us/j/225669464\nZoom直播间19:30开放，可以提前进场和小伙伴们熟悉一下~\n\n等你来哦~"}}',
        url: '',
        templateId: '',
        pushAlbumId: '1feb6610-f419-11e7-a81c-ad2ed65aa5bd'
      },
      time: {},
      selectTime: [],
      saving: false,
      pushTypes: [
        { key: '1', value: '某些人' },
        { key: '2', value: 'admin用户' },
        { key: '3', value: '所有用户' },
        //{ key: '4', value: 'albumId 购买用户' },
        { key: '5', value: 'courseId 购买用户' }
      ],
      templateIds: [
        { key: 'MwdoL8ygvws8aRzsiv881_xX-4RJNEak8KDZuHOyif0', value: '上课提醒' },
        { key: 'a8ctI_mY7g3_qzOZGrLRBBG0F_Ol3BLFcbGmA0UTbGw', value: '课程状态变更通知' },
        { key: 'XS9PzKpuJXDuuc9YNA0DQiYMxihFg3wgQlYcXJdcLmA', value: '学习进度提醒' },
        { key: 'PwI_h_iVnE5pt7HDQhHLt-BHoqMAl0gJ87506pgm0H4', value: '申请结果通知' },
        { key: 'zjAWPiGlv5Vd8bjJkgLsPmzqz-1O_KgkPGrfzL8Jel8', value: '报名成功通知' },
        { key: 's0Vm0GZN7jqfySX1xd9MgUqrACkaZakZaX3Y9g7oKOk', value: '课程提醒' }
      ]
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    save() {
      this.saving = true
      for (var key in this.time) {
        this.selectTime.push(Date.parse(this.time[key]))
      }

      const startTime = this.selectTime.length > 0 ? this.selectTime[0] : 0
      const endTime = this.selectTime.length > 0 ? this.selectTime[1] : 0
      // debugger
      return utils.requestRestful('gec/notification_api', {
        pushType: this.noti.pushType,
        pushUserId: this.noti.userIds,
        pushCourseId: this.noti.pushCourseId,
        pushTimeStart: startTime,
        pushTimeEnd: endTime,
        templateId: this.noti.templateId,
        url: this.noti.url,
        data: JSON.parse(this.noti.data.replace(/\n/g, '\\n')),
        pushScheduledTime: this.noti.pushScheduledTime || undefined
      }).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.saving = false
        return response
      })
    },
    change() {
      if (this.noti.templateId === 'PwI_h_iVnE5pt7HDQhHLt-BHoqMAl0gJ87506pgm0H4') {
        this.noti.data = '{"first": {"value": "Hi, 直播将在1小时后开始\n"},"keyword1": {"value": "--第1行请修改此处--", "color": "#173177"},"keyword2": {"value": "--第2行请修改此处--", "color": "#173177"},"keyword3": {"value": "--第三行请修改此处--", "color": "#173177"},"remark": {"value": "\n直播ID: 225 669 464\n直播链接: https://zoom.us/j/225669464\nZoom直播间19:30开放，可以提前进场和小伙伴们熟悉一下~\n\n等你来哦~"}}'
      } else {
        this.noti.data = '{"first": {"value": "Hi, 直播将在1小时后开始\n"},"keyword1": {"value": "--第1行请修改此处--", "color": "#173177"},"keyword2": {"value": "--第2行请修改此处--", "color": "#173177"},"remark": {"value": "\n直播ID: 225 669 464\n直播链接: https://zoom.us/j/225669464\nZoom直播间19:30开放，可以提前进场和小伙伴们熟悉一下~\n\n等你来哦~"}}'
      }
    }
  }
}
