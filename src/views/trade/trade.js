import utils from '@/utils/util'
import waves from '@/directive/waves'

export default {
  data() {
    return {
      time: utils.convertTime(new Date().getTime()),
      chartLoading: false,
      tradeData: {
        totalTradeVolume: 0,
        totalFee: 0,
        totalTradeCount: 0,
        userBalance: 0,
        userCount: 0,
      },
      balanceData: [],
      loading: false,
      selectExchange: 'huobipro',
      days: 30,
      exchanges: [
        {
          id: 'all',
          name: '全部',
        },
        {
          id: 'huobipro',
          name: '火币',
        },
        {
          id: 'binance',
          name: '币安',
        }
      ],
      selectType: 'totalCost',
      types: [
        {
          id: 'feeInfo.systemFee',
          name: '手续费收入',
        },
        {
          id: 'totalCost',
          name: '交易额',
        },
        {
          id: 'tradeCount',
          name: '交易笔数',
        },
        {
          id: 'userCount',
          name: '交易人数',
        },
      ],
      selectCurrency: 'ETH',
      currencys: [
        '全部', 'ETH', 'EOS', 'BTC', 'BCH', 'ETC', 'ONT', 'ADA', 'XLM', 'XRP'
      ],
      chartSettings: {
        metrics: [],
        dimension: ['日期'],
        yAxisType: ['normal'],
      },
      chartData: {
        columns: ['日期'],
        rows: []
      }
    }
  },
  directives: {
    waves
  },
  created() {
    this.fetchData();
    this.fetchChartData();
  },
  methods: {
    refresh() {
      this.fetchData();
    },
    fetchData() {
      const _self = this;
      _self.loading = true;
      this.time = utils.convertTime(new Date().getTime());
      const param = `query totalTradeInfo {
        totalTradeInfo 
      }`;
      utils.request(param).then(res => {
        if (res.data.data && res.data.data.totalTradeInfo) {
          const totalTradeInfo = res.data.data.totalTradeInfo;
          _self.tradeData = totalTradeInfo.tradeInfoData;
          _self.balanceData = totalTradeInfo.balanceData;
          _self.loading = false;
        }
      });
    },
    fetchChartData() {
      const _self = this;
      _self.chartLoading = true;
      if (!_self.selectExchange || !_self.selectType || !_self.selectCurrency) {
        alert('请输入完整的查询条件');
      }
      const exchange = _self.selectExchange === 'all' ? '' : _self.selectExchange;
      const currency = _self.selectCurrency === '全部' ? '' : _self.selectCurrency;
      const days = parseInt(_self.days);
      const dataType = _self.selectType;
      const param = `query tradeInfoByAggregate($exchange: String, $currency: String, $days: Int, $dataType: String){
        tradeInfoByAggregate(exchange: $exchange, currency: $currency, days: $days, dataType: $dataType)
      }`;
      _self.chartSettings.metrics = [];
      _self.chartData.columns = ['日期'];
      _self.chartData.rows = [];
      utils.request(param, { exchange, currency, days, dataType }).then(res => {
        if (res.data.data && res.data.data.tradeInfoByAggregate) {
          const tradeInfoByAggregate = res.data.data.tradeInfoByAggregate;
          _self.chartSettings.metrics.push(_self.selectType);
          _self.chartData.columns.push(_self.selectType);
          for (let i = 0; i < tradeInfoByAggregate.length; i++) {
            _self.chartData.rows.push({ '日期': tradeInfoByAggregate[i]._id, [_self.selectType]: tradeInfoByAggregate[i].total });
          }
          _self.chartLoading = false;
        }
      });
    }
  }
}
