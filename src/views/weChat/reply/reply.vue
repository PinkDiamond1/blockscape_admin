<template lang="jade">
	.app-container
		el-tabs(v-model='titleName', @tab-click='handleClick')
			el-tab-pane(label='关键字回复', name='first')
				el-card
					//- 上半部分
					.clearfix(slot='header')
						el-switch(v-model='elswitch', active-color='#13ce66', inactive-color='#ff4949', style='float: right; padding: 3px 0')
						span 自动回复
						p 通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。<a style="color: #8470FF">查看详情</a> <br/>关闭自动回复之后，将立即对所有用户生效。
					//- 下半部分
					el-input.elInput(v-model='keyword', placeholder='搜索关键字', style="width:200px;", v-show="uploadShow")
					el-button(type="success" icon="el-icon-search", v-show="uploadShow", @click="fetchData()") 搜索
					el-button(type='info', icon="el-icon-delete", @click="cleanInput", v-show="uploadShow") 清除输入框
					el-button(type='primary', icon="el-icon-refresh",  @click="fetchData()", v-show="uploadShow") 全部回复
					el-button(type="success", style="float: right; margin: 0 10px", v-show="uploadShow", @click="wxAdd") 添加回复
					//- 分页
					.block(v-show="uploadShow")
						el-pagination.pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='currentPage', :page-sizes='[20, 50, 100, 200]', :page-size='sizePage', layout='total, sizes, prev, pager, next, jumper', :total='wechatReplyCount')
					//- 回复列表
					el-table.elTable(:data='tableData', style='width: 100%', v-show="uploadShow")
						el-table-column(type='expand')
							template(slot-scope='props')
								el-form.demo-table-expand(label-position='left', inline='')
									el-form-item(label='关键字')
										span {{ props.row.keyword }}
									el-form-item(label='回复内容')
										span {{ props.row.reply }}
						el-table-column(label='Id')
							template(slot-scope='scope')
								{{scope.$index + 1}}
						el-table-column(label='规则名称', prop='name')
						el-table-column(label='关键字', prop='keyword')
						el-table-column(label='回复内容类型', prop='msgtype')
						el-table-column(label='操作', align="center")
							template(slot-scope='scope')
								span(@click="wxUpdata(scope.row.id)") 编辑
								span(@click="wxDelete(scope.row.id)") 删除
					//- 添加编辑回复
					el-form(ref='form', :model='addData', label-width='80px', v-show="addShow")
						el-form-item(label='规则名称')
							el-input(v-model='addData.keyword', placeholder="请输入规则名称", style="width: 1100px")
						.dialogDiv
							el-form-item(label='关键字')
								el-select(v-model='addData.region', placeholder="请选择匹配方式")
									el-option(label='半匹配', value='0')
									el-option(label='全匹配', value='1')
								el-input(v-model='addData.keyword', placeholder="请输入关键字", style="width: 900px")
								el-tooltip(content='添加', placement='top')
									i(@click="dialog").icon.el-icon-circle-plus-outline
						el-form-item(label='回复内容')
							//- el-input(type='textarea', autosize, v-model='addData.reply')
							el-radio(v-model='elRadio', label='1', @change="change") 文本
							el-radio(v-model='elRadio', label='2', @change="change") 图片
							el-input(type='textarea', autosize, v-model='addData.reply', placeholder='请输入文本内容', v-if="inputText")
							el-input(v-model='addData.reply', placeholder='请输入图片id', v-else)
						el-form-item(label='回复方式')
							el-radio-group(v-model='addData.resource')
								el-radio(label="all") 回复全部
								el-radio(label="random") 随机回复一条
						el-form-item
							el-button(type='success', @click='wxSave') 保存
							el-button(@click="wxUnSave") 取消
					//- 弹出框
					el-dialog(title='请填写关键字', :visible.sync='dialogTableVisible')
						el-select(v-model='addData.region', placeholder="请选择匹配方式")
							el-option(label='半匹配', value='0')
							el-option(label='全匹配', value='1')
						el-input(v-model='addData.keyword', placeholder="请输入关键字")
					//- 分页
					.block(v-show="uploadShow")
							el-pagination.pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='currentPage', :page-sizes='[20, 50, 100, 200]', :page-size='sizePage', layout='total, sizes, prev, pager, next, jumper', :total='wechatReplyCount')
			el-tab-pane(label='被关注回复', name='second')
				el-card
					.clearfix(slot='header')
						el-switch(v-model='elswitch', active-color='#13ce66', inactive-color='#ff4949', style='float: right; padding: 3px 0')
						span 自动回复
						p 通过编辑内容或关键词规则，快速进行自动回复设置。如具备开发能力，可更灵活地使用该功能。<a style="color: #8470FF">查看详情</a> <br/>关闭自动回复之后，将立即对所有用户生效。
					el-card
						div(slot='header')
							el-tabs.elTabs(type="border-card")
								el-tab-pane
									span(slot='label', class="iconfont") &#xe649; 文字
									el-input(v-model="addData.reply", type='textarea', :rows='10', placeholder='请输入内容',)
								el-tab-pane
									span(slot='label', class="iconfont") &#xe791; 图片
									.textarea
								el-tab-pane
									span(slot='label', class="iconfont") &#xe805; 语音
									.textarea
								el-tab-pane
									span(slot='label', class="iconfont") &#xe64e; 视频
									.textarea
						el-button(type="success", @click="wxSave(addData.id)") 保存
						el-button(type="danger", @click="wxDelete(addData.id)") 删除回复
						el-button(type="info", @click="wxUnSave") 取消
</template>
<script src="./reply.js"></script>
<style src="./reply.css" lang="scss"></style>
<style src="../font/fonts.css"></style>