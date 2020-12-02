<template>
  <div class="app-container">
    <div class="progress_bar">
      <el-steps :active="status" align-center>
        <el-step title="创建时间" :description="basicInformation.createTime | formatDate"></el-step>
        <el-step title="已接单" :description="basicInformation.confirmTime | formatDate"></el-step>
        <el-step title="已付款" :description="basicInformation.payTime | formatDate"></el-step>
        <el-step title="已完成" :description="basicInformation.completeTime | formatDate"></el-step>
        <el-step title="已取消" :description="basicInformation.cancelTime | formatDate"></el-step>
      </el-steps>
    </div>
    <div class="operation_content">
      <div class="title">
        <div class="title_left">
          <i class="el-icon-warning"></i>
          当前订单状态：
          <span class="refund">{{basicInformation.status == 0 ? "未接单" : basicInformation.status == 1 ?'已接单':basicInformation.status == 2 ?'已付款':basicInformation.status == 3 ?'已完成':basicInformation.status == 4 ?'已取消':basicInformation.status}}</span>
          <div v-if="basicInformation.status == 4" style="margin-left: 5px">退款原因：<span style="margin-right: 5px">{{ basicInformation.cancelReason }}</span>
          退款时间：<span>{{ basicInformation.cancelTime | formatDate }}</span></div>
        </div>
        <div class="title_right">
          <el-button size="mini">立即退款</el-button>
          <el-button size="mini">备注订单</el-button>
        </div>
      </div>
      <div class="tab_box">
        <div class="tab_title">基本信息</div>
        <div class="tab_basic">
          <el-table
            :data="[basicInformation]"
            border
            :cell-style="cellStyleOne"
            style="width: 100%"
            :header-cell-style="{color: '#515a6e', fontSize: '12px',background: '#f2f6fc'}"
          >
            <el-table-column
              prop="ctcOrderId"
              label="广告CTC订单编号"
            >
            </el-table-column>
            <el-table-column
              prop="advertiseId"
              label="承兑商广告ID"
            >
            </el-table-column>
            <el-table-column
              prop="direction"
              label="订单类型"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.direction == 0 ? '买入' : '卖出' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="userId"
              label="订单发起用户ID"
            >
            </el-table-column>
            <el-table-column
              prop="acceptor"
              label="承兑商用户ID"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="交易价格"
            >
            </el-table-column>
          </el-table>
          <el-table
            :data="[basicInformation]"
            border
            :cell-style="cellStyleTow"
            style="width: 100%"
            :header-cell-style="{color: '#515a6e', fontSize: '12px',background: '#f2f6fc'}"
          >
            <el-table-column
              prop="money"
              label="交易金额"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="交易数量"
            >
            </el-table-column>
            <el-table-column
              prop="unit"
              label="币种单位"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.status == 0 ? '未接单' : scope.row.status == 1 ? '已接单' : scope.row.status == 2 ? '已付款' : scope.row.status == 3 ? '已完成' : scope.row.status == 4 ? '已取消' : scope.row.status }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="platformRemark"
              label="平台备注"
            >
            </el-table-column>
            <el-table-column
              prop="cancelReason"
              label="取消原因"
            >
            </el-table-column>
          </el-table>
          <el-table
            :data="[basicInformation]"
            border
            style="width: 100%"
            :header-cell-style="{color: '#515a6e', fontSize: '12px',background: '#f2f6fc'}"
          >
            <el-table-column
              prop="timeLimit"
              label="付款期限/分钟"
              width="217px"
            >
            </el-table-column>
            <el-table-column
              prop="confirmTime"
              label="接单时间"
              width="215px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.confirmTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="cancelTime"
              label="取消时间"
              width="213px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cancelTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="payTime"
              label="付款时间"
              width="214px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.payTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="completeTime"
              label="完成时间"
              width="425px"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.completeTime | formatDate }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tab_box">
        <div class="tab_title">广告信息</div>
        <div class="tab_advertising">
          <el-table
            :data="[advertisingInformation]"
            border
            :cell-style="cellStyleThree"
            style="width: 100%"
            :header-cell-style="{color: '#515a6e', fontSize: '12px',background: '#f2f6fc'}"
          >
            <el-table-column
              prop="advertiseType"
              label="广告类型"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.advertiseType == 0 ? '买入' : '卖出' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="minLimit"
              label="最低单笔交易额"
            >
            </el-table-column>
            <el-table-column
              prop="maxLimit"
              label="最高单笔交易额"
            >
            </el-table-column>
            <el-table-column
              prop="timeLimit"
              label="付款期限/分钟"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="广告上下架状态"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.status == 0 ? '下架' : scope.row.status == 1 ? '上架' : scope.row.status == -1 ? '已关闭' : scope.row.status }}</span>
              </template>
            </el-table-column>
          </el-table>
          <el-table
            :data="[advertisingInformation]"
            border
            :cell-style="cellStyleFour"
            style="width: 100%"
            :header-cell-style="{color: '#515a6e', fontSize: '12px',background: '#f2f6fc'}"
          >
            <el-table-column
              prop="amount"
              label="计划数量"
            >
            </el-table-column>
            <el-table-column
              prop="dealAmount"
              label="交易中数量"
            >
            </el-table-column>
            <el-table-column
              prop="remainAmount"
              label="计划剩余数量"
            >
            </el-table-column>
            <el-table-column
              prop="auto"
              label="是否开启自动回复"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.auto == 0 ? '是' : '否' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="autoword"
              label="自动回复内容"
            >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="both_box">
        <div class="subscript" superscript-title="买方用户信息">
          <div class="content-box">
            <div class="img-head">
              <img :src="buyInformation.headPortrait" alt="">
            </div>
            <div class="content">
              <div>用户ID: <span>{{ buyInformation.userId }}</span></div>
              <div>手机号: <span>{{ buyInformation.phoneNumber }}</span></div>
              <div>邮箱号: <span>{{ buyInformation.email }}</span></div>
              <div>会员用户名: <span>{{ buyInformation.memberName }}</span></div>
              <div>交易次数: <span>{{ buyInformation.transactionNumber }}</span></div>
              <div>申诉次数: <span>{{ buyInformation.appealNumber }}</span></div>
              <div>胜诉次数: <span>{{ buyInformation.recoverNumber }}</span></div>
              <div>会员角色: <span>{{ buyInformation.memberRole == 0 ? '普通会员' : '承兑商' }}</span></div>
              <div>实名认证状态: <span
                :style="{'color': (buyInformation.realNameAuthenticationStatus==2 ? '#0CB618':buyInformation.realNameAuthenticationStatus==0 ?'#EA1B29':'#000')}"
              >
                {{buyInformation.realNameAuthenticationStatus == 0 ? '未提交' : buyInformation.realNameAuthenticationStatus == 1 ? '审核中' : buyInformation.realNameAuthenticationStatus == 2 ? '已认证' : buyInformation.realNameAuthenticationStatus
                }}</span></div>
              <div>认证商家状态: <span
                :style="{'color': (buyInformation.authenticationBusinessesStatus==0 ? '#0CB618':'#EA1B29')}"
              >{{ buyInformation.authenticationBusinessesStatus == 0 ? '已认证' : '未认证' }}</span></div>
              <div>是否禁止交易: <span
                :style="{'color': (buyInformation.prohibitedTransaction==0 ? '#0CB618':'#EA1B29')}"
              >{{ buyInformation.prohibitedTransaction == 0 ? '允许' : '禁止' }}</span></div>
              <div>在线状态: <span
                :style="{'color': (buyInformation.onLineStatus==true ? '#0CB618':'#EA1B29')}"
              >{{ buyInformation.onLineStatus== false ? '否': '是' }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="both_box">
        <div class="subscript" superscript-title="卖方用户信息">
          <div class="content-box">
            <div class="img-head">
              <img :src="sellInformation.headPortrait" alt="">
            </div>
            <div class="content">
              <div>用户ID: <span>{{ sellInformation.userId }}</span></div>
              <div>手机号: <span>{{ sellInformation.phoneNumber }}</span></div>
              <div>邮箱号: <span>{{ sellInformation.email }}</span></div>
              <div>会员用户名: <span>{{ sellInformation.memberName }}</span></div>
              <div>交易次数: <span>{{ sellInformation.transactionNumber }}</span></div>
              <div>申诉次数: <span>{{ sellInformation.appealNumber }}</span></div>
              <div>胜诉次数: <span>{{ sellInformation.recoverNumber }}</span></div>
              <div>会员角色: <span>{{ sellInformation.memberRole == 0 ? '普通会员' : '承兑商' }}</span></div>
              <div>实名认证状态: <span
                :style="{'color': (sellInformation.realNameAuthenticationStatus==2 ? '#0CB618':sellInformation.realNameAuthenticationStatus==0 ?'#EA1B29':'#000')}"
              >
                {{sellInformation.realNameAuthenticationStatus == 0 ? '未提交' : sellInformation.realNameAuthenticationStatus == 1 ? '审核中' : sellInformation.realNameAuthenticationStatus == 2 ? '已认证' : sellInformation.realNameAuthenticationStatus
                }}</span></div>
              <div>认证商家状态: <span
                :style="{'color': (sellInformation.authenticationBusinessesStatus==0 ? '#0CB618':'#EA1B29')}"
              >{{ sellInformation.authenticationBusinessesStatus == 0 ? '已认证' : '未认证' }}</span></div>
              <div>是否禁止交易: <span
                :style="{'color': (sellInformation.prohibitedTransaction==0 ? '#0CB618':'#EA1B29')}"
              >{{ sellInformation.prohibitedTransaction == 0 ? '允许' : '禁止' }}</span></div>
              <div>在线状态: <span
                :style="{'color': (sellInformation.onLineStatus==true ? '#0CB618':'#EA1B29')}"
              >{{ sellInformation.onLineStatus== false ? '否': '是' }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {operation} from '@/api/otc/operation'

export default {
  data() {
    return {
      basicInformation: {},//基本信息
      advertisingInformation: {},//广告信息
      buyInformation: {},//买家信息
      sellInformation: {},//卖家信息
      status: undefined,//状态码
    }
  },
  methods: {
    //列表
    administrationList() {
      var ctcOrderIdthis = this.$store.state.details.operationId
      operation(ctcOrderIdthis).then((res) => {
        this.basicInformation = res.data
        this.advertisingInformation = res.data.advertise
        this.buyInformation = res.data.buyer
        this.sellInformation = res.data.seller
        this.status = Number(res.data.status) + 1
      })
    },
    /***表体字体颜色设置
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyleOne({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.direction == 0 && columnIndex == 2) {
        return 'color: #0CB618;fontWeight:700'
      } else if (row.direction == 1 && columnIndex == 2) {
        return 'color: #EA1B29;fontWeight:700'
      }
    },
    cellStyleTow({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.status == 1 && columnIndex == 3) {
        return 'color: #0CB618'
      } else if (row.status == 0 && columnIndex == 3) {
        return 'color: #EA1B29'
      } if (row.status == 2 && columnIndex == 3) {
        return 'color: #0CB618'
      } if (row.status == 3 && columnIndex == 3) {
        return 'color: #0CB618'
      } if (row.status == 4 && columnIndex == 3) {
        return 'color: #EA1B29'
      } if (row.status == 5 && columnIndex == 3) {
        return 'color: #FFFFCC'
      }
    },
    cellStyleThree({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.advertiseType == 0 && columnIndex == 0) {
        return 'color: #0CB618;fontWeight:700'
      } else if (row.advertiseType == 1 && columnIndex == 0) {
        return 'color: #EA1B29;fontWeight:700'
      }
    },
    cellStyleFour({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.auto == 0 && columnIndex == 3) {
        return 'color: #0CB618'
      } else if (row.auto == 1 && columnIndex == 3) {
        return 'color: #EA1B29'
      }
    },
  },
  filters: {//13位时间搓转标准时间
    formatDate: function (value) {
      if (value) {
        let date = new Date(parseInt(value))
        let y = date.getFullYear()
        let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let m = date.getMinutes()
        m = m < 10 ? ('0' + m) : m
        let s = date.getSeconds()
        s = s < 10 ? ('0' + s) : s
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
      } else {
        return ''
      }
    }
  },
  created() {//初始化数据
    this.administrationList()
  },
}
</script>

<style scoped>
.progress_bar >>> .el-step__title {
  font-size: 14px !important;
}

.title {
  display: flex;
  background: #f2f6fc;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}

.operation_content {
  border: 1px solid #f2f6fc;
  border-top: 0;
  margin-top: 10px;
}

.title_left {
  font-size: 14px;
  display: flex;
}

.refund {
  color: #f124c7;
}

.tab_box {
  padding: 0 20px;
  box-sizing: border-box;
}

.tab_title {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
}

.tab_box >>> .el-table th > .cell {
  text-align: center;
}

.tab_box >>> .el-table .cell {
  text-align: center;
}

.tab_box >>> .el-table--medium td {
  padding: 5px 0 !important;
}

.tab_box >>> .el-table th.gutter {
  display: table-cell !important
}

.tab_basic >>> .el-table__empty-block {
  text-align: left;
}

/*左上角标签，父元素必须设置position: relative;overflow: hidden;height: 大于150;width: 大于150px;，同时，角标标签内加入属性superscript-title="左上角标签文字内容"*/
.subscript:after {
  position: absolute;
  top: 15px;
  left: -45px;
  width: 150px;
  height: 30px;
  content: attr(superscript-title);
  text-align: center;
  font-size: 11px;
  color: white;
  line-height: 30px;
  font-family: 'Microsoft YaHei', 'PingFangSC-Regular', 'sans-serif', 'San Francisco', 'Microsoft Sans Serif', 'Arial'; /*背景旋转角度渐变*/
  background: -webkit-linear-gradient(90deg, blue 0%, #238aea 100%); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(90deg, blue 0%, #238aea 100%); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(90deg, blue 0%, #238aea 100%); /* Firefox 3.6 - 15 */
  background: linear-gradient(90deg, blue 0%, #238aea 100%); /* 标准的语法（必须放在最后） *//*旋转角标*/
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

/*时下流行的风格--【新拟态】________________________*/
.subscript {
  position: relative;
  overflow: hidden;
  margin: 17px;
  border-radius: 5px;
  background: #f2f6fc;
  padding: 15px;
}

.content-box {
  width: 100%;
}

.img-head {
  width: 8%;
  float: left;
  margin-left: 50px;
}

.img-head > img {
  width: 100%;
  border-radius: 50%;
}

.content {
  width: 85%;
  float: left;
  margin-top: 5px;
}

.content > div {
  width: 23%;
  float: left;
  height: 30px;
  line-height: 30px;
  margin-left: 20px;
  border-right: 1px solid #eee;
  overflow: hidden; /*内容超出后隐藏*/
  text-overflow: ellipsis; /* 超出内容显示为省略号*/
  white-space: nowrap; /*文本不进行换行*/
}
.content > div>span {
 font-size: 14px;
}
</style>
