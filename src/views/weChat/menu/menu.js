import utils from '@/utils/util'
import constants from '@/utils/constants'
let messageArray = ['text','image','voice','video']
export default {
	inject: ['reload'],
	data() {
		return {
			Data: { button:[{}], replies:[]},
			childrenData: [],
			titles: [],
			titlesArr:[],
			types: ['click','view','miniprogram'],
			menu: '',
			type: 'click',
			selectedMenuIndex: 0,
			editableTabsValue: '0',
			addEditableTabsValue: '0',
			childrenTabsValue: [],
			replyId: '',
			strObj: {},
			childrenObj: [{}],
			text: '',
			image: '',
			voice: '',
			video: '',
			addText: '',
			addImage: '',
			addVoice: '',
			addVideo: '',
			childrenText: [],
			childrenImage: [],
			childrenVoice: [],
			childrenVideo: [],
			xcxDisabled: false,
			parentMenu: true,
			childrenMenu: true,
			dialogFormVisible: false,
			addMessage:{},
			addMessageObj: {},
			subButton: [],
		}
	},
	created() {
		this.fetchData(this.selectedMenuIndex)
	},
	mounted() {
	},
	methods: {
		fetchData(index) {
			this.titlesArr = []
			this.childrenObj = [{}]
			this.$http.get(`${constants.AINTEREST_API_ENDPOINT}/api/v1/wechat/menu/getMenu`)
			.then(res => {
				this.Data.button = res.data.data.button 
				this.Data.button.map(obj => {
					this.titlesArr.push(obj.name)
				})
				this.titles = this.titlesArr
				if(this.Data.button[index].sub_button) {
					this.childrenData = this.Data.button[index].sub_button
					for(let i=0;i<this.childrenData.length;i++) {
						this.childrenObj.push({})
					}
					this.parentMenu = false
					this.childrenMenu = true
				}else {
					this.childrenData = []
					this.parentMenu = true
					this.childrenMenu = false
				}
			})
			let filter = {}
			filter.type = 'menuReply'
			const param = `query wechatReplies($filter: JSON){
				wechatReplies(filter: $filter){
					id,
					reply,
					msgtype,
					keyword
				}
			}`
			utils.request(param, {filter}).then(res => {
				this.result = res.data.data.wechatReplies
				this.result.map(obj => {
					if(obj.keyword === this.Data.button[index].key) {
						this.strObj.id = obj.id
						this.strObj.keyword = obj.keyword
						if(obj.msgtype === 'text') {
							this.text = obj.reply
							this.editableTabsValue = '0'
						}
						if(obj.msgtype === 'image') {
							this.image = obj.reply
							this.editableTabsValue = '1'
						}
						if(obj.msgtype === 'voice') {
							this.voice = obj.reply
							this.editableTabsValue = '2'
						}
						if(obj.msgtype === 'video') {
							this.video = obj.reply
							this.editableTabsValue = '3'
						}
					}
				})
			})
			//type为click 给子菜单赋值
			if(this.Data.button[index].sub_button) {
				this.Data.button[index].sub_button.map((obj,idx) => {
					if(obj.type === 'click') {
						this.result.map(object => {
							if(object.keyword === obj.key) {
								this.childrenObj[idx] = {}
								this.childrenObj[idx].id = object.id
								this.childrenObj[idx].keyword = object.keyword
								if(object.msgtype === 'text') {
									this.childrenTabsValue[idx] = '0'
									this.childrenText[idx] = object.reply
								}
								if(object.msgtype === 'image') {
									this.childrenTabsValue[idx] = '1'
									this.childrenImage[idx] = object.reply
								}
								if(object.msgtype === 'voice') {
									this.childrenTabsValue[idx] = '2'
									this.childrenVoice[idx] = object.reply
								}
								if(object.msgtype === 'video') {
									this.childrenTabsValue[idx] = '3'
									this.childrenVideo[idx] = object.reply
								}
							}
						})
					}
				})
			}
		},
		selectedMenu(index) {
			if(this.Data.button[index].type === 'miniprogram') {
				this.xcxDisabled = true
			}
			this.fetchData(index)
			this.selectedMenuIndex = index
		},
		save() {
			this.Data.replies = []
			if(!(JSON.stringify(this.addMessageObj) === '{}')) {
				this.Data.replies.push(this.addMessageObj)
			}
			// 父菜单已有key(编辑添加)
			this.result.map(obj => {
				if(obj.keyword === this.Data.button[this.selectedMenuIndex].key && this.Data.button[this.selectedMenuIndex].type === 'click') {
					if(this.editableTabsValue === '0') {
						this.strObj.reply = this.text
						this.strObj.msgtype = 'text'
					}else if(this.editableTabsValue === '1') {
						this.strObj.reply = this.image
						this.strObj.msgtype = 'image'
					}else if(this.editableTabsValue === '2') {
						this.strObj.reply = this.voice
						this.strObj.msgtype = 'voice'
					}else if(this.editableTabsValue === '3') {
						this.strObj.reply = this.video
						this.strObj.msgtype = 'video'
					}
					this.Data.replies.push(this.strObj)
				}
			})
			//父菜单没有key(添加保存)
			if(!this.Data.button[this.selectedMenuIndex].key && this.Data.button[this.selectedMenuIndex].type === 'click') {
				let str = 'key_' + Math.random().toString(36).substr(2,8)
				this.Data.button[this.selectedMenuIndex].key = str
				this.strObj.keyword = str
				if(this.editableTabsValue === '0') {
					this.strObj.reply = this.text
					this.strObj.msgtype = 'text'
				}else if(this.editableTabsValue === '1') {
					this.strObj.reply = this.image
					this.strObj.msgtype = 'image'
				}else if(this.editableTabsValue === '2') {
					this.strObj.reply = this.voice
					this.strObj.msgtype = 'voice'
				}else if(this.editableTabsValue === '3') {
					this.strObj.reply = this.video
					this.strObj.msgtype = 'video'
				}
				this.Data.replies.push(this.strObj)
			}
			//子菜单已有key(编辑保存)
			if(this.Data.button[this.selectedMenuIndex].sub_button) {
				this.Data.button[this.selectedMenuIndex].sub_button.map((obj,index) => {
					if(obj.key) {
						if(obj.type === 'click') {
							if(this.childrenTabsValue[index] === '0') {
								this.childrenObj[index].msgtype = 'text'
								this.childrenObj[index].reply = this.childrenText[index]
							}else if(this.childrenTabsValue[index] === '1') {
								this.childrenObj[index].msgtype = 'image'
								this.childrenObj[index].reply = this.childrenImage[index]
							}
							else if(this.childrenTabsValue[index] === '2') {
								this.childrenObj[index].msgtype = 'voice'
								this.childrenObj[index].reply = this.childrenVoice[index]
							}else {
								this.childrenObj[index].msgtype = 'video'
								this.childrenObj[index].reply = this.childrenVideo[index]
							}
						}
					}else {
						if(obj.type === 'click' && !obj.key) {
							let str = 'key_' + Math.random().toString(36).substr(2,8)
							obj.key = str
							this.childrenObj[index].keyword = str
							if(this.childrenTabsValue[index] === '0') {
								this.childrenObj[index].msgtype = 'text'
								this.childrenObj[index].reply = this.childrenText[index]
							}else if(this.childrenTabsValue[index] === '1') {
								this.childrenObj[index].msgtype = 'image'
								this.childrenObj[index].reply = this.childrenImage[index]
							}
							else if(this.childrenTabsValue[index] === '2') {
								this.childrenObj[index].msgtype = 'voice'
								this.childrenObj[index].reply = this.childrenVoice[index]
							}else {
								this.childrenObj[index].msgtype = 'video'
								this.childrenObj[index].reply = this.childrenVideo[index]
							}
						}
					}
				})
			}
			this.childrenObj.map(obj => {
				if(obj.msgtype) {
					this.Data.replies.push(obj)
				}
			})
			this.Data.replies.map((obj,index) => {
				if(!obj.keyword) {
					this.Data.replies.splice(index,1)
				}
			})
			this.$http.post(`${constants.AINTEREST_API_ENDPOINT}/api/v1/wechat/menu/createMenu`,this.Data)
			.then(res => {
				this.$message({
					type: 'success',
					message: '操作成功'
				});
				this.selectedMenu(this.selectedMenuIndex)
				this.reload()
			})
		},
		addChildrenMenu() {
			this.dialogFormVisible = true
		},
		deleteChildrenMenu(val) {
			this.$confirm('此操作将永久删除该子菜单, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.Data.button[this.selectedMenuIndex].sub_button.splice(val,1)
				if(this.Data.button[this.selectedMenuIndex].sub_button.length === 0) delete this.Data.button[this.selectedMenuIndex].sub_button
				this.save()
				this.$message({
					type: 'success',
					message: '删除成功!'
				});
			}).catch(() => {
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
			
		},
		addDialog() {
			this.dialogFormVisible = false
			if(this.addMessage.type === 'click') {
				let str = 'key_' + Math.random().toString(36).substr(2,8)
				this.addMessage.key = str
				this.addMessageObj.keyword = str
				if(this.addEditableTabsValue === '0') {
					this.addMessageObj.reply = this.addText
					this.addMessageObj.msgtype = 'text'
				}else if(this.addEditableTabsValue === '1') {
					this.addMessageObj.reply = this.addImage
					this.addMessageObj.msgtype = 'image'
				}else if(this.addEditableTabsValue === '2') {
					this.addMessageObj.reply = this.addVoice
					this.addMessageObj.msgtype = 'voice'
				}else if(this.addEditableTabsValue === '3') {
					this.addMessageObj.reply = this.addVideo
					this.addMessageObj.msgtype = 'video'
				}
			}
			if(this.Data.button[this.selectedMenuIndex].sub_button) {
				this.Data.button[this.selectedMenuIndex].sub_button.push(this.addMessage)
			}else {
				this.Data.button[this.selectedMenuIndex].sub_button = [this.addMessage]
			}
			this.save()
		},
		parentRadioChang(val) {
		// 如果切换菜单内容会把该type对应的数据删除
			if(val === 'miniprogram') {
				this.xcxDisabled = true
				delete this.Data.button[this.selectedMenuIndex].url
				delete this.Data.button[this.selectedMenuIndex].key
			}else if(val === 'view') {
				delete this.Data.button[this.selectedMenuIndex].key
			}else {
				delete this.Data.button[this.selectedMenuIndex].url
			}
		}
	}
}
