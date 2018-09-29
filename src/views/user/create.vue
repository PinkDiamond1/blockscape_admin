<template lang="jade">
.create-user-view
  el-button.delete-button(type='primary', @click='deleteUser' v-bind:disabled="deleteing") 删除讲师
  el-form(ref='form', :model='user', label-width='120px')
    el-form-item(label='讲师名称')
      el-input(v-model='user.username')

    el-form-item(label='是否显示到首页')
      el-select(v-model='user.recommendHomepage', placeholder='请选择')
        el-option(v-for='item in boolOptions', :key='item.value', :label='item.label', :value='item.value')
    el-form-item(label='显示顺序')
      el-input(v-model='user.recommendHomepageSort')

    el-form-item(label='上传头像:（注：与头像地址二选一！）' , label-width='300px')
      .flex-row
        #oss-container.flex-column
          .tip.text-color3.font-size-14
          .flex-row
            #selectfiles.btn.yello-button 选择文件
          #ossfile
    el-form-item(label='头像地址')
      el-input#upload-url(v-model='user.profilePicUrl')

    el-form-item(label='工作（英文）')
      el-input(v-model='user.jobEn')

    el-form-item(label='简介（英文）')
      el-input(v-model='user.descriptionEn' type='textarea')

    el-form-item(label='工作（中文）')
      el-input(v-model='user.job')

    el-form-item(label='简介（中文）')
      el-input(v-model='user.description' type='textarea')

    el-form-item(label='视频地址')
      el-input(v-model='user.videoUrl' type='input')

    el-form-item(label='视频封面图片地址')
      el-input(v-model='user.videoCoverImgUrl' type='input')
    el-form-item(label='label')
      el-input(v-model='user.label' type='input')

    el-form-item
      el-button(type='primary', @click='save' v-bind:disabled="savingZh") 保存
</template>

<script src="./createJs.js"></script>
<style src="./createCss.css" lang="scss"></style>
