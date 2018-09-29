import utils from '@/utils/util'
import GecUploader from '@/utils/upload'

let id
export default {
  name: 'createUser',
  data() {
    return {
      user: {},
      listLoading: true,
      savingZh: false,
      deleteing: false,
      imageUrl: '',
      boolOptions: [
        { value: true, label: 'true' },
        { value: false, label: 'false' }
      ]
    }
  },
  created() {
    id = this.$route.query.id
    if (id) {
      this.fetchData(id)
    }
  },
  mounted () {
    // 上传
    setTimeout(() => {
      const uploader = GecUploader(this.user, 'user_img', 'profilePicUrl')
      uploader.init()
    }, 1000)
  },
  methods: {
    fetchData(id) {
      this.listLoading = true
      const param = `{
        users(id: "${id}") {
          id,
          username,
          job,
          description,
          profilePicUrl,
          label,
          jobEn,
          descriptionEn,
          videoUrl,
          videoCoverImgUrl,
          recommendHomepage,
          recommendHomepageSort
        }
      }`
      utils.request(param).then(res => {
        this.listLoading = false
        const result = res.data.data
        this.user = result.users.length > 0 ? result.users[0] : {}
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    save() {
      let str = ''
      if (id) {
        str = `id: "${id}", `
      } else {
        this.user.role = 'teacher'
      }
      const param = ` mutation user($data: JSON) {
        user(${str}data: $data) {
          id
        }
      }`

      this.user.recommendHomepageSort = parseInt(this.user.recommendHomepageSort)
      return utils.request(param, { data: this.user }).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        return response
      })
    },
    deleteUser() {
      this.$confirm('此操作将永久删除讲师, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteing = true
        const param = ` mutation {
          user(id: "${id}", toDelete: true) {
            id
          }
        }`
        utils.request(param).then(response => {
          this.deleteing = false
          this.$router.push({ path: '/user/list' })
          this.$message({
            type: 'success',
            message: '删除成功! 跳转回列表页'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
