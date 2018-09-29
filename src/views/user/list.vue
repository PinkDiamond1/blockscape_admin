<template lang="jade">
.user-list-container
  .filter-container
    el-input.filter-item(@keyup.enter.native='handleFilter', style='width: 200px;', placeholder="搜索讲师名称", v-model='username')
    el-button.filter-item(type='primary', v-waves='true', icon='el-icon-search', @click='fetchData') 搜索
    el-button.filter-item(type='primary', :loading='downloadLoading', v-waves='', icon='el-icon-download', @click='handleDownload') 导出 Zip
    el-button.filter-item(type='primary', :loading='downloadLoading', v-waves='', icon='el-icon-download', @click='handleDownloadExport') 导出 Excel

  el-table(:data='users', v-loading.body='listLoading', element-loading-text='Loading', border='', fit='', highlight-current-row='')
    el-table-column(align='center', label='ID', width='80')
      template(slot-scope='scope')
        | {{scope.$index + 1}}
    el-table-column(align='center', label='名字', width='100')
      template(slot-scope='scope')
        router-link.user-name(v-bind:to="{path: '/user/create', query: {id: scope.row.id}}") {{scope.row.username}}

    el-table-column(align='center', label='头像地址', width='300')
      template(slot-scope='scope')
        | {{scope.row.profilePicUrl}}

    el-table-column(align='center', label='是否显示到首页', width='100')
      template(slot-scope='scope')
        | {{scope.row.recommendHomepage ? '是' : '否'}}
        
    el-table-column(align='center', label='显示顺序', width='100')
      template(slot-scope='scope')
        | {{scope.row.recommendHomepageSort}}

    el-table-column(align='center', label='工作', width='300')
      template(slot-scope='scope')
        | {{scope.row.job}}
    el-table-column(align='center', label='导师寄语视频地址', width='300')
      template(slot-scope='scope')
        | {{scope.row.videoUrl }}

    el-table-column(align='center', label='导师寄语视频地址', width='300')
      template(slot-scope='scope')
        | {{scope.row.videoCoverImgUrl }}

  el-pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='currentPageNumber', :page-sizes='[20, 100, 200, 300, 400]', :page-size='pageSize', layout='total, sizes, prev, pager, next, jumper', :total='totalCount')

</template>

<script src="./listJs.js"></script>

<style lang="scss">
.user-list-container{

  padding: 0px 80px;
  .user-name {
    color: #2093D1;
  }

  .el-pagination {
    margin: 100px 0px;
    text-align: center;
  }

  .filter-container {
    margin: 50px 0px;

    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
