import { getList } from '@/api/table'
import utils from '@/utils/util'
export default {
  data() {
    return {
      list: [],
      listLoading: true,
      userName: '',
      wxUsername: '',
      userId: '',
      courseName: '',
      orderId: '',
      status: [{
        value: '选项1',
        label: 'pending'
      }, {
        value: '选项2',
        label: 'complete'
      }],
      payWays: [{
        label: '微信',
        value: 'wxTransactionId'
      }, {
        label: '支付宝',
        value: 'aliPayTransactionId'
      }],
      payWay: '',
      selectStatus: '',
      time: '',
      count: 0,
      pagecount: 0,
      currentPage: 1,
      pagesize: 50,
      selectTime: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      downloadLoading: false,
      filename: '',
      userListOptions: [],
      isSuperAdmin: utils.getRole() === 'superAdmin'
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    userStatusFilter(status) {
      const statusMap = {
        2: 'success',
        0: 'info',
        201: ''
      }
      return statusMap[status]
    }

  },
  created() {
    this.fetchData()
  },
  methods: {
    // 查询函数
    fetchData() {
      this.listLoading = true
      for (var key in this.time) {
        this.selectTime.push(Date.parse(this.time[key]))
      }
      const filter = {
        productType: 'Course'
      }
      if (this.orderId) {
        filter.id = this.orderId
      }
      if (this.userName) {
        filter.userId = this.userName
      }
      if (this.wxUsername) {
        filter.userId = this.wxUsername
      }
      if (this.courseName) {
        filter.name = { $like: `%${this.courseName}%` }
      }
      if (this.selectStatus) {
        filter.status = this.selectStatus
      }
      if (this.payWay) {
        filter[this.payWay] = { $ne: null }
      }

      if (this.selectTime.length !== 0) {
        filter.createdAt = {
          $gt: this.selectTime[0],
          $lt: this.selectTime[1]
        }
      }

      const page = {
        number: this.currentPage,
        size: this.pagesize
      }
      let type
      if (type === 1) {
        filter.status = 'complete'
      } else if (type === 2) {
        filter.status = { $ne: 'complete' }
      }
      const param = `query orders ($filter: JSON, $page: JSON) {
        ordersCount(filter: $filter)
        orders(filter: $filter, page: $page) {
          id,
          userId,
          user {
            username, wxUsername, phone
          },
          name,
          description,
          status,
          cashFee,
          productId,
          productType,
          createdAt,
          updatedAt,
          userCourse{
            id,
            role,
            courseId
          },
          completedAt,
          course {
            price,id
          },
          totalFee,
          aliPayTransactionId,
          wxTransactionId
        }
      }`
      utils.request(param, { filter, page }).then(res => {
        const result = res.data.data.orders
        this.list = result
        this.listLoading = false
        this.count = res.data.data.ordersCount
        result.map(obj => {
          obj.createdAtString = utils.convertTime(obj.createdAt)
          obj.updateAtString = utils.convertTime(obj.updatedAt)
          obj.completedAtString = utils.convertTime(obj.completedAt)
          obj.course = obj.course || {}
          obj.user = obj.user || {}
          if(obj.userCourse) {
            if(obj.userCourse.role === 201) {
              obj.userCourseRole = '拼团中'
            }else if(obj.userCourse.role === 2) {
              obj.userCourseRole = '完成'
            }else {
              obj.userCourseRole = '未解锁'
            }
          }
          return obj
        })
      })

      this.selectTime = []
    },

    // 清空输入框
    reset() {
      this.courseName = ''
      this.userName = ''
      this.orderId = ''
      this.wxUsername = ''
    },

    // 全部订单数
    all() {
      this.fetchData()
    },

    keyup(e) {
      var keyCode = window.event ? e.keyCode : e.which
      if (keyCode == 13) {
        this.fetchData()
      }
    },

    // 一页显示多少条数
    handleSizeChange: function(size) {
      this.pagesize = size
      this.fetchData()
    },

    // 当前页数
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.fetchData()
    },

    totalFee(v) {
      return (parseInt(v)) / 100
    },

    price(v) {
      return (parseInt(v)) / 100
    },

    handleDownload() {
      this.downloadLoading = true
      const tHeader = ['用户ID', '用户名', '课程名称', '实际交易价格(元)', '课程ID', '交易时间', '原价(元)', '拼团状态', '状态']
      const filterVal = ['userId', 'user', 'name', 'totalFee', 'productId', 'createdAtString', 'price', 'userCourseRole', 'status']
      if(utils.getRole() === 'superAdmin') {
        tHeader.unshift('手机号')
        filterVal.unshift('phone')
      }
      import('@/vendor/Export2Zip').then(zip => {
        const list = this.list
        const data = this.formatJson(filterVal, list)
        zip.export_txt_to_zip(tHeader, data, this.filename, this.filename)
        this.downloadLoading = false
      })
    },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    handleDownloadExport() {
      this.downloadLoading = true
      const tHeader = ['用户ID', '用户名', '课程名称', '实际交易价格(元)', '课程ID', '交易时间', '原价(元)', '拼团状态', '状态']
      const filterVal = ['userId', 'user', 'name', 'totalFee', 'productId', 'createdAtString', 'price', 'userCourseRole', 'status']
      if(utils.getRole() === 'superAdmin') {
        tHeader.unshift('手机号')
        filterVal.unshift('phone')
      }
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else if (j === 'totalFee') {
          return this.totalFee(v[j])
        } else if (j === 'price') {
          return this.price(v['course'][j])
        } else if (j === 'user') {
          return v[j]['wxUsername'] || v[j]['username']
        } else if (j === 'phone') {
          return v['user'][j]
        } else {
          return v[j]
        }
      }))
    },
    getRemoteUserList(query) {
      this.loading = true
      const param = `query users($filter: JSON){
        users(filter: $filter) {
          id,username,wxUsername
        }
      }`
      utils.request(param, { filter: { $or: [{ username: { $like: `%${query}%` }}, { wxUsername: { $like: `%${query}%` }}] }}).then(response => {
        this.loading = false
        if (!response.data.data.users) return
        this.userListOptions = response.data.data.users
      })
    }
  }
}
