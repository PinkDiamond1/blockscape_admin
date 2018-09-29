import utils from '@/utils/util'
import waves from '@/directive/waves'

export default {
  data() {
    return {
      users: [],
      listLoading: true,
      currentPageNumber: 1,
      pageSize: 100,
      username: undefined,
      totalCount: 100,
      downloadLoading: false
    }
  },
  filters: {
  },
  directives: {
    waves
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPageNumber = val
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      const filter = { role: 'teacher' }
      const page = { number: this.currentPageNumber, size: this.pageSize }

      if (this.username) {
        filter.username = { $like: `%${this.username}%` }
      }
      let order = [['recommendHomepageSort', 'ASC']]
      const param = `query users($filter: JSON, $page: JSON, $order: JSON){
        usersCount(filter: $filter),
        users(filter: $filter, page: $page,order: $order) {
          id,username,job,description,profilePicUrl,videoUrl,videoCoverImgUrl,recommendHomepage,recommendHomepageSort
        }
      }`
      utils.request(param, { filter, page, order}).then(res => {
        const result = res.data.data
        this.totalCount = result.usersCount
        this.users = result.users
        this.listLoading = false
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Zip').then(zip => {
        const tHeader = ['Username', 'ProfilePicUrl', 'Job']
        const filterVal = ['username', 'profilePicUrl', 'job']
        const users = this.users
        const data = this.formatJson(filterVal, users)
        zip.export_txt_to_zip(tHeader, data, this.username, this.username)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    handleDownloadExport() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['Username', 'ProfilePicUrl', 'Job']
        const filterVal = ['username', 'profilePicUrl', 'job']
        const users = this.users
        const data = this.formatJson(filterVal, users)
        excel.export_json_to_excel(tHeader, data, this.username)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
