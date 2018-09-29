<template lang="jade">
	.menu-container
		.container.clearfix
			.aside.l
				div.title
					b.nickname BlockScape
					span.signal
					span.signal
					span.signal
					span.signal
					span.signal
				div.menus
					span(v-for="(ele,index) in titles", :key="index",  @click="selectedMenu(index)", :class=`selectedMenuIndex === index ? "click" : "unclick"`) {{ ele }}
						el-tooltip.childrenMenu(effect='dark', content='添加子菜单', placement='top')
							el-button(class='el-icon-circle-plus-outline', v-show="selectedMenuIndex === index", @click="addChildrenMenu")
			.main
				.subject
					.title.clearfix
						span.l {{ titles[selectedMenuIndex] }}
						a.r 删除菜单
					el-form(ref='form', :model='Data', label-width='90px')
						el-form-item(label='菜单名称')
							el-input(v-model='Data.button[selectedMenuIndex].name', style="width:300px")
							p 字数不超过4个汉字或8个字母
						el-form-item(label='菜单内容', v-show="parentMenu")
							el-radio-group(v-model='Data.button[selectedMenuIndex].type', @change="parentRadioChang")
								el-radio(v-for="(ele,index) in types", :key="index", :label="ele") {{ ele === 'click' ? "发送消息" : ele === 'miniprogram' ? "跳转小程序" : "跳转网页"  }}
						el-tabs.elTabs(type="border-card" v-if="Data.button[selectedMenuIndex].type === 'click'",v-model="editableTabsValue", v-show="parentMenu")
							el-tab-pane(name='0')
								span(slot='label', class="iconfont") &#xe649; 文字
								el-input(type='textarea', :rows='10', placeholder='请输入内容',v-model="text")
							el-tab-pane(name='1')
								span(slot='label', class="iconfont") &#xe791; 图片
								el-input(type='textarea', :rows='10', placeholder='请输入图片id',v-model="image")
							el-tab-pane(name='2')
								span(slot='label', class="iconfont") &#xe805; 语音
								el-input(type='textarea', :rows='10', placeholder='请输入语音id',v-model="voice")
							el-tab-pane(name='3')
								span(slot='label', class="iconfont") &#xe64e; 视频
								el-input(type='textarea', :rows='10', placeholder='请输入视频id',v-model="video")
						el-form-item(label='页面地址', v-if="Data.button[selectedMenuIndex].type === 'view'", v-show="parentMenu")
							el-input(v-model='Data.button[selectedMenuIndex].url', style="width:300px")
						el-form-item(label='小程序路径', v-if="Data.button[selectedMenuIndex].type === 'miniprogram'", v-show="parentMenu")
							el-input(v-model='Data.button[selectedMenuIndex].pagepath', style="width:300px", :disabled="xcxDisabled")
						el-form-item(label='小程序Id', v-if="Data.button[selectedMenuIndex].type === 'miniprogram'", v-show="parentMenu")
							el-input(v-model='Data.button[selectedMenuIndex].appid', style="width:300px", :disabled="xcxDisabled")
					el-button.saveBtn(type='success', @click="save", round='',  v-show="parentMenu") 保存并发布

					//子菜单信息
					el-form(ref='form', :model='Data', label-width='90px', v-show="childrenMenu", v-for="(ele,index) in childrenData", :key="index")
						.title.childrenMessage.clearfix(v-show="childrenMenu")
							span.l 子菜单 {{index + 1}}
							a.r(@click="deleteChildrenMenu(index)") 删除子菜单
						el-form-item(label='菜单名称')
							el-input(v-model='ele.name', style="width:300px")
							p 字数不超过4个汉字或8个字母
						el-form-item(label='菜单内容')
							el-radio-group(v-model='ele.type')
								el-radio(v-for="(i,indexs) in types", :key="indexs", :label="i") {{ i === 'click' ? "发送消息" : i === 'miniprogram' ? "跳转小程序" : "跳转网页"  }}
						el-tabs.elTabs(type="border-card" v-if="ele.type === 'click'",v-model="childrenTabsValue[index]")
							el-tab-pane(name='0')
								span(slot='label', class="iconfont") &#xe649; 文字
								el-input(type='textarea', :rows='10', placeholder='请输入内容',v-model="childrenText[index]")
							el-tab-pane(name='1')
								span(slot='label', class="iconfont") &#xe791; 图片
								el-input(type='textarea', :rows='10', placeholder='请输入图片id',v-model="childrenImage[index]")
							el-tab-pane(name='2')
								span(slot='label', class="iconfont") &#xe805; 语音
								el-input(type='textarea', :rows='10', placeholder='请输入语音id',v-model="childrenVoice[index]")
							el-tab-pane(name='3')
								span(slot='label', class="iconfont") &#xe64e; 视频
								el-input(type='textarea', :rows='10', placeholder='请输入视频id',v-model="childrenVideo[index]")
						el-form-item(label='页面地址', v-if="ele.type === 'view'")
							el-input(v-model='ele.url', style="width:300px")
						el-form-item(label='小程序路径', v-if="ele.type === 'miniprogram'")
							el-input(v-model='ele.pagepath', style="width:300px", :disabled="xcxDisabled")
						el-form-item(label='小程序Id', v-if="ele.type === 'miniprogram'")
							el-input(v-model='ele.appid', style="width:300px", :disabled="xcxDisabled")
					el-button.saveBtn(type='success', @click="save(index)", round='', v-show="childrenMenu") 保存并发布

			//添加子菜单消息
			el-dialog(title='子菜单消息', :visible.sync='dialogFormVisible')
				el-form(ref='form', :model='addMessage', label-width='90px')
						el-form-item(label='菜单名称')
							el-input(v-model='addMessage.name', style="width:300px")
							p 字数不超过4个汉字或8个字母
						el-form-item(label='菜单内容')
							el-radio-group(v-model='addMessage.type')
								el-radio(v-for="(ele,index) in types", :key="index", :label="ele") {{ ele === 'click' ? "发送消息" : ele === 'miniprogram' ? "跳转小程序" : "跳转网页"  }}
						el-tabs.elTabs(type="border-card" v-if="addMessage.type === 'click'",v-model="addEditableTabsValue")
							el-tab-pane(name='0')
								span(slot='label', class="iconfont") &#xe649; 文字
								el-input(type='textarea', :rows='10', placeholder='请输入内容',v-model="addText")
							el-tab-pane(name='1')
								span(slot='label', class="iconfont") &#xe791; 图片
								el-input(type='textarea', :rows='10', placeholder='请输入图片id',v-model="addImage")
							el-tab-pane(name='2')
								span(slot='label', class="iconfont") &#xe805; 语音
								el-input(type='textarea', :rows='10', placeholder='请输入语音id',v-model="addVoice")
							el-tab-pane(name='3')
								span(slot='label', class="iconfont") &#xe64e; 视频
								el-input(type='textarea', :rows='10', placeholder='请输入视频id',v-model="addVideo")
						el-form-item(label='页面地址', v-if="addMessage.type === 'view'")
							el-input(v-model='addMessage.url', style="width:300px")
						el-form-item(label='小程序路径', v-if="addMessage.type === 'miniprogram'")
							el-input(v-model='addMessage.pagepath', style="width:300px", :disabled="xcxDisabled")
						el-form-item(label='小程序Id', v-if="addMessage.type === 'miniprogram'")
							el-input(v-model='addMessage.appid', style="width:300px", :disabled="xcxDisabled")
				.dialog-footer(slot='footer')
					el-button(@click='dialogFormVisible = false') 取 消
					el-button(type='primary', @click='addDialog') 确 定
</template>
<script src="./menu.js"></script>
<style src="./menu.css" lang="scss"></style>
<style src="../font/fonts.css"></style>
