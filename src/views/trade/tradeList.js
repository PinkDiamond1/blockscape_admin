/**
 * Created by Gec on 2018/9/30.
 */
import utils from '@/utils/util'
import waves from '@/directive/waves'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      currentPageNumber: 1,
      pageSize: 20,
      selectExchange: '',
      exchanges: [
        {
          id: 'huobipro',
          name: '火币',
        },
        {
          id: 'binance',
          name: '币安',
        }
      ],
      selectSide: '',
      sides: ['buy', 'sell'],
      totalCount: 20,
      dateRange: [],
    }
  },
  directives: {
    waves
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPageNumber = val
      this.fetchData();
    },
    fetchData() {
      console.log(this.dateRange);
      this.listLoading = true;
      const _self = this;
      const filter = {};
      if (this.selectExchange) {
        filter.exchange = this.selectExchange;
      }
      if (this.selectSide) {
        filter.side = this.selectSide;
      }
      if (this.dateRange && this.dateRange.length === 2) {
        filter.createdAt = {
          $gte: new Date(this.dateRange[0]),
          $lte: new Date(this.dateRange[1]),
        };
      }
      const order = { createdAt: -1 };
      const page = { num: this.currentPageNumber, size: this.pageSize }
      const param = `query allTradeList($filter: JSON, $page: JSON, $order: JSON){
        tradeCount(filter: $filter),
        allTradeList(filter: $filter, page: $page,order: $order) {
          _id,createdAt,userId,side,exchange,currency,cost,amount,status,price,feeInfo
        }
      }`
      utils.request(param, { filter, page, order }).then(res => {
        const result = res.data.data;
        this.totalCount = result.tradeCount;
        for (let i = 0; i < result.allTradeList.length; i++) {
          result.allTradeList[i].createdAt = utils.convertTime( result.allTradeList[i].createdAt);
        }
        _self.list = result.allTradeList;
        _self.listLoading = false;
      })
    },
  }
}
