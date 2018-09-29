<template lang="jade">
  .app-container
    el-select.input(v-model='userName', multiple=false, remote=true, filterable=true, allow-create=true, placeholder='请输入用户名并选择', :remote-method="getRemoteUserList", style="width:180px")
      el-option(v-for='item in userListOptions', :key='item.id', :label='item.username', :value='item.id')
    el-select.input(v-model='wxUsername', multiple=false, remote=true, filterable=true, allow-create=true, placeholder='请输入微信昵称并选择', :remote-method="getRemoteUserList", style="width:200px")
      el-option(v-for='item in userListOptions', :key='item.id', :label='item.wxUsername', :value='item.id')
    el-input.input(v-model='courseName', placeholder='请输入课程名称' , style="width:180px;" @keyup.enter.native="keyup")
    el-input.input(v-model='orderId', placeholder='请输入订单号' , style="width:180px;" @keyup.enter.native="keyup")
    el-select.input(v-model='selectStatus', placeholder='请选择状态')
      el-option( v-for="item in status" , :key="item.value" , :label="item.label" , :value="item.label")

    el-select.input(v-model='payWay', placeholder='请选择支付方式')
      el-option( v-for="item in payWays" , :key="item.value" , :label="item.label" , :value="item.value")
    .block.timeBox
      span.demonstration
      el-date-picker(v-model='time', type='datetimerange', :picker-options='pickerOptions', range-separator='至', start-placeholder='开始日期', end-placeholder='结束日期', align='right')
    el-button.botton(type='success' v-on:click="fetchData" icon="el-icon-search") 搜索
    el-button(type='info' v-on:click="reset" icon="el-icon-delete") 清空输入框
    el-button(type='primary' v-on:click="all" icon="el-icon-refresh")  全部订单
    el-button.filter-item(type='primary', :loading='downloadLoading', icon='el-icon-download', @click='handleDownload') 导出 Zip
    el-button.filter-item(type='primary', :loading='downloadLoading', icon='el-icon-download', @click='handleDownloadExport') 导出 Excel
    .block
      span.demonstration
      el-pagination(layout="total, sizes, prev, pager, next, jumper", :total='count',:page-size="pagesize" ,:page-sizes="[10, 20, 50, 100, 500, 1000]" , v-on:size-change="handleSizeChange" , v-on:current-change="handleCurrentChange")
    el-table(:data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row)
      el-table-column(width="95" , label='ID' , align="center")
        template(slot-scope="scope")
          {{scope.$index + 1}}
      el-table-column(width="150" , label="订单号", align="center")
        template(slot-scope="scope")
          {{scope.row.id}}

      el-table-column(label='手机号' , width='120', align='center' v-if="isSuperAdmin")
        template(slot-scope='scope')
          {{scope.row.user.phone ? scope.row.user.phone : '暂无'}}
      el-table-column(width="150" , label="用户ID", align="center")
        template(slot-scope="scope")
          {{scope.row.userId}}
      el-table-column(width="130" , label="用户名", align="center" v-if="isSuperAdmin")
        template(slot-scope="scope")
          {{scope.row.user ? (scope.row.user.username) : '暂无'}}

      el-table-column(width="130" , label="微信昵称", align="center" )
        template(slot-scope="scope")
          {{scope.row.user ? (scope.row.user.wxUsername) : '暂无'}}
      el-table-column(label='课程名称' , width='450', align='center')
        template(slot-scope='scope')
          {{scope.row.name}}
      el-table-column(label='实际交易价格(元)', width='100', align='center')
        template(slot-scope='scope')
          {{scope.row.totalFee != 0 ? (scope.row.totalFee / 100) : scope.row.totalFee}}
      el-table-column(class-name='status-col', label='状态', width='110', align='center')
        template(slot-scope='scope')
          el-tag(:type='scope.row.status | statusFilter') {{scope.row.status}}
      el-table-column(class-name='status-col', label='拼团状态', width='110', align='center')
        template(slot-scope='scope')
          el-tag(v-if="scope.row.userCourse && scope.row.userCourse.role" ,:type='scope.row.userCourse.role | userStatusFilter') {{scope.row.userCourse.role ===201 ? '拼团中' : (scope.row.userCourse.role === 2 ? '完成' :'未解锁' )}}
      el-table-column(label='课程ID', width='400', align='center')
        template(slot-scope='scope')
          span {{scope.row.productId}}
      el-table-column(label='交易时间', width='150', align='center')
        template(slot-scope='scope')
          {{scope.row.createdAtString}}
      el-table-column(label='原价(元)', width='100', align='center')
        template(slot-scope='scope')
          {{scope.row.course ? (scope.row.course.price / 100) : '暂无'}}

    .block
      span.demonstration
      el-pagination(layout="total, sizes, prev, pager, next, jumper", :total='count',:page-size="pagesize" ,:page-sizes="[10, 20, 50, 100, 500, 1000]" , v-on:size-change="handleSizeChange" , v-on:current-change="handleCurrentChange")
</template>

<script src="./orderJs.js"></script>
<style src="./orderCss.css" lang="scss"></style>
