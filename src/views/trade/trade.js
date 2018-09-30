import utils from '@/utils/util'
import waves from '@/directive/waves'

export default {
  data() {
    return {
      time: utils.convertTime(new Date().getTime()),
      tradeData: {
        totalTradeVolume: 0,
        totalFee: 0,
        totalTradeCount: 0,
        userBalance: 0,
        userCount: 0,
      },
      balanceData: [],
      loading: false,
    }
  },
  directives: {
    waves
  },
  created() {
    this.fetchData();
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
    }
  }
}
