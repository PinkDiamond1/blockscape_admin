<template lang="jade">
  .tradeInfo-container(v-loading="loading")
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
</template>
<script src="./trade.js"></script>
<style src="./trade.css" lang="scss"></style>
