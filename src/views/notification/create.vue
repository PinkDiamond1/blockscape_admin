<template lang="jade">
.create-noti-view
  el-form(ref='form', :model='noti', label-width='200px')

    el-form-item(label='推送类型')
      el-select(v-model='noti.pushType', placeholder='请选择推送类型')
        el-option(v-for='item in pushTypes', :key='item.key', :label='item.value', :value='item.key')

    el-form-item(label='userIds' v-if="noti.pushType === '1'")
      el-input(v-model='noti.userIds', type="textarea")

    div(v-if="noti.pushType === '5'")
      el-form-item(label='courseId')
        el-input(v-model='noti.pushCourseId')
      el-form-item(label='时间')
        el-date-picker(v-model='time', type='datetimerange', range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期', align='right')

    el-form-item(label='template_id（二选一）')
      el-input(v-model='noti.templateId')

    el-form-item(label='template_id（二选一）')
      el-select(v-model='noti.templateId', placeholder='请选择模板消息')
        el-option(v-for='item in templateIds', :key='item.key', :label='item.value', :value='item.key')

    el-form-item(label='url')
      el-input(v-model='noti.url')

    el-form-item(label='推送内容')
      el-input(v-model='noti.data' type="textarea")

    el-form-item(label='定时发送时间')
      el-date-picker(v-model='noti.pushScheduledTime', type='datetime', placeholder='选择日期时间')

    el-form-item
      el-button(type='primary', @click='save' v-bind:disabled="saving") 保存
</template>

<script src="./createJs.js"></script>
<style src="./createCss.css" lang="scss"></style>
