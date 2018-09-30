<template lang="jade">
  .tradeList-container
    h1 交易列表
    .select
      el-select( v-model="selectExchange" placeholder="请选择交易所")
        el-option(v-for="exchange in exchanges", :key="exchange.id", :label="exchange.name", :value="exchange.id")
      el-select( v-model="selectSide" placeholder="请选择交易行为")
        el-option(v-for="side in sides", :key="side", :label="side", :value="side")
      el-date-picker(type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="dateRange")
      el-button.fetch(type='primary' v-on:click="fetchData") 搜索
    el-table.listTable(:data="list"  border fit highlight-current-row v-loading.body='listLoading', element-loading-text='Loading')
      el-table-column(prop="_id", label="_id")
      el-table-column(prop="createdAt", label="创建时间")
      el-table-column(prop="userId", label="用户id")
      el-table-column(prop="side", label="side")
      el-table-column(prop="exchange", label="交易所")
      el-table-column(prop="currency", label="交易对")
      el-table-column(prop="cost", label="cost")
      el-table-column(prop="amount", label="amount")
      el-table-column(prop="status", label="交易状态")
      el-table-column(prop="price", label="price")
      el-table-column(prop="feeInfo.payFee", label="收款手续费")
      el-table-column(prop="feeInfo.systemFee", label="BKS手续费")
      el-table-column(prop="feeInfo.tradeFee", label="交易手续费")
    el-pagination(@size-change='handleSizeChange', @current-change='handleCurrentChange', :current-page='currentPageNumber', :page-sizes='[20, 100, 200, 300, 400]', :page-size='pageSize', layout='total, sizes, prev, pager, next, jumper', :total='totalCount')
</template>
<script src="./tradeList.js"></script>
<style src="./trade.css" lang="scss"></style>
