<template lang="jade">
  .tradeInfo-container
    .totalInfo(v-loading="loading")
      h1 实时统计
      p.time
        span 时间:
        span   {{time}}
        el-button.refreshButton(type='primary' v-on:click="refresh") 刷新
      p.totalVlome
        span 总交易额:
        span  ${{tradeData.totalTradeVolume}}
      p.totalFee
        span 手续费收入:
        span  ${{tradeData.totalFee}}
      p.totalTradeCount
        span 交易笔数:
        span {{tradeData.totalTradeCount}}
      p.userBalance
        span 用户法币余额:
        span ${{tradeData.userBalance}}
      p.userCount
        span 交易人数:
        span {{tradeData.userCount}}
      p.balance
        p 交易所剩余USDT
        el-table(:data="balanceData"  border fit highlight-current-row)
          el-table-column(prop="exchangeId", label="交易所")
          el-table-column(prop="balance", label="USDT剩余量")
    h1 图表展示
    .selectExchange
      el-select( v-model="selectExchange" placeholder="请选择交易所")
        el-option(v-for="exchange in exchanges", :key="exchange.id", :label="exchange.name", :value="exchange.id")
      el-select( v-model="selectType" placeholder="请选择数据类型")
        el-option(v-for="type in types", :key="type.id", :label="type.name", :value="type.id")
      el-select( v-model="selectCurrency" placeholder="请选择货币对")
        el-option(v-for="currency in currencys", :key="currency", :label="currency", :value="currency")
      .inputDays
        el-input( v-model="days" placeholder="请输入天数，以数字为准")
      el-button.fetch(type='primary' v-on:click="fetchChartData") 查询
    ve-line(:data="chartData", :settings="chartSettings", width="80%", :loading="chartLoading")
</template>
<script src="./trade.js"></script>
<style src="./trade.css" lang="scss"></style>
