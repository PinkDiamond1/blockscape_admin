import utils from '@/utils/util'

export default {
	data() {
		return {
			titleName: 'first',
			elswitch: true,
			keyword: '',
			listLoading: false,
			tableData: [],
			addData: {wechatName: 'gecFuwuhao'},
			wechatReplyCount: 0,
			currentPage: 1,
			sizePage: 20,
			uploadShow: true,
			addShow: false,
			deleteing: true,
			dialogTableVisible: false,
			upLoadId: '',
			addKeyword: {},
			beadded: {},
			elRadio: '1',
			inputText: true
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		handleClick(tab, event) {
			this.fetchData()
			if(this.titleName === 'second') {
				this.addData =  {wechatName: 'gecFuwuhao', type: 'beadded', keyword: ''}
				this.addShow = false
				this.uploadShow = true
			}
		},
		fetchData(val) {
			let strId
			strId = val == undefined ? '' : `id: ${val},`
			let page = {
				number: this.currentPage,
				size: this.sizePage
			}
			let filter = {}
			this.titleName === 'first' ? filter.type = 'smartReply' : filter.type = 'beadded'
			if(this.keyword) {
				filter.keyword = { $like: `%${this.keyword}%` }
			}
			this.listLoading = false
			const param = `query wechatReplies($filter: JSON, $page: JSON) {
				wechatReplyCount(filter: $filter)
				wechatReplies(${strId} filter: $filter, page: $page) {
					id,
					keyword,
					reply,
					msgtype,
					metaData,
					enabled
				}
			}`
			utils.request(param, {filter,page}).then(res => {
				const result = res.data.data.wechatReplies
				this.wechatReplyCount = res.data.data.wechatReplyCount
				this.tableData = result
				this.addData = result[0] 
        this.listLoading = true
      })
		},
		wxSave(val) {
			this.elRadio == 2 ? this.addData.msgtype = 'image' : this.addData.msgtype = 'text'
			let saveId,beaddedId
			if(this.titleName === 'first') {
				saveId = this.upLoadId == '' ? '' : `id: ${this.upLoadId},`
			}else {
				saveId = val === undefined ? '' : `id: ${val},`
			}
			let param = `mutation wechatReply($data: JSON) {
				wechatReply(${saveId}data: $data) {
					id
				}
			}`
			utils.request(param,{data: this.addData})
			.then(res => {
				this.wxUnSave()
				this.upLoadId = ''
				this.$message({
					showClose: true,
          message: '保存成功',
          type: 'success'
        });
			})
			.catch(
				this.$message({
          showClose: true,
          message: '保存失败',
          type: 'error'
        })
			)
		},
		wxUpdata(val) {
			let upLoadId = val
			this.uploadShow = false
			this.addShow = true
			this.fetchData(upLoadId)
			this.upLoadId = upLoadId
		},
		wxDelete(val) {
			let deleteId = val
			this.$confirm('此操作将永久删除该回复内容, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.deleteing = false
				let param = `mutation {
					wechatReply(id:"${deleteId}", toDelete: true) {
						id
					}
				}`
				utils.request(param).then(res => {
					this.deleteing = true
					this.fetchData()
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
		},
		//保存完后跳回列表页并重新刷新/取消按钮回列表也
		wxUnSave() {
			this.titleName = 'first'
			this.addShow = false
			this.uploadShow = true
			this.fetchData()
		},
		wxAdd() {
			this.addData = {wechatName: 'gecFuwuhao'}
			this.uploadShow = false
			this.addShow = true
		},
		dialog() {
			this.dialogTableVisible = true
		},
		cleanInput() {
			this.keyword = ''
		},
		handleSizeChange(val) {
			this.sizePage = val
			this.fetchData()
		},
		handleCurrentChange(val) {
			this.currentPage = val
			this.fetchData()
		},
		change() {
			this.elRadio == 1 ? this.inputText = true : this.inputText = false
		}
	}
}