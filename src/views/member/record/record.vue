<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="交易记录编号" prop="memberTransactionRecordId">
              <el-input v-model="queryParams.memberTransactionRecordId" placeholder="请输入交易记录编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="钱包编号" prop="memberWalletId">
              <el-input v-model="queryParams.memberWalletId" placeholder="请输入钱包编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="会员编号" prop="memberId">
              <el-input v-model="queryParams.memberId" placeholder="请输入会员编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="币种名称" prop="coinName">
              <el-input v-model="queryParams.coinName" placeholder="请输入币种名称" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="交易Hash" prop="txHash">
              <el-input v-model="queryParams.txHash" placeholder="请输入交易Hash" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="发起地址" prop="originatorAddress">
              <el-input v-model="queryParams.originatorAddress" placeholder="请输入发起地址" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="收款地址" prop="collectionAddress">
              <el-input v-model="queryParams.collectionAddress" placeholder="请输入发起地址" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="交易类型" prop="transactionType">
              <el-select
                v-model="queryParams.transactionType"
                placeholder="请选择交易类型"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in tradingType"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="交易状态" prop="status">
              <el-select
                v-model="queryParams.status"
                placeholder="请选择交易状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in tradingStatus"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="search_btn">
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
      </div>
    </el-form>
    <div class="app-container">
      <div class="tab_box">
        <div class="tab">
          <el-table
            :data="advertisingInfo"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="memberTransactionRecordId"
              label="交易记录编号"
            >
            </el-table-column>
            <el-table-column
              prop="memberWalletId"
              label="钱包编号"
            >
            </el-table-column>
            <el-table-column
              prop="memberId"
              label="会员编号"
            >
            </el-table-column>
            <el-table-column
              prop="transactionType"
              label="交易类型"
            >
              <template slot-scope="scope">
                <span>
                  {{scope.row.transactionType == 0 ? '充值' :scope.row.transactionType == 1 ? '提现' :scope.row.transactionType == 2 ? '转账' :scope.row.transactionType == 3 ? '活动奖励' :scope.row.transactionType == 4 ? '推广奖励' :scope.row.transactionType == 5 ? '人工充值' :scope.row.transactionType == 6 ? 'ctc买入' :scope.row.transactionType == 7 ? 'ctc卖出' :scope.row.transactionType}}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="coinName"
              label="币种名称"
            >
            </el-table-column>
            <el-table-column
              prop="txHash"
              label="交易Hash"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.txHash)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.txHash}}
                    <el-button type="text" @click="copyText(scope.row.txHash)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="originatorAddress"
              label="发起地址"
              width="120">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.originatorAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.originatorAddress}}
                    <el-button type="text" @click="copyText(scope.row.originatorAddress)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="collectionAddress"
              label="收款地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.collectionAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.collectionAddress}}
                    <el-button type="text" @click="copyText(scope.row.collectionAddress)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="transactionAmount"
              label="交易金额"
            >
            </el-table-column>
            <el-table-column
              prop="transactionServiceCharge"
              label="交易手续费"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="交易状态"
            >
              <template slot-scope="scope">
                <el-tag  size="small" :type="scope.row.status == 1 ? 'success':scope.row.status == -1 ? 'danger':'' ">
                  {{scope.row.status == -1 ? '交易失败' : scope.row.status == 0 ? '交易中' :scope.row.status == 1 ? '交易成功' :scope.row.status == 2 ? '交易返还' :scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="ctcOrderId"
              label="CTC订单编号"
            >
            </el-table-column>
            <el-table-column
              prop="transactionTime"
              label="交易时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.transactionTime | formatDate}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            :page-sizes="[100, 300, 500]"
            @pagination="administrationList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { memberRecordList } from '@/api/member/record'
export default {
  data() {
    return {
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 100,
        memberTransactionRecordId:undefined,//交易记录编号
        memberWalletId:this.$store.state.details.memberWalletId,//钱包编号
        memberId:undefined,//会员编号
        coinName:undefined,//币种名称
        txHash:undefined,//交易Hash
        originatorAddress:undefined,//发起地址
        collectionAddress:undefined,//收款地址
        transactionType:undefined,//交易类型
        status:undefined//交易状态
      },
      advertisingInfo: [],//列表数据
      tradingType:[
        {
          value: '0',
          label: '充值'
        },
        {
          value: '1',
          label: '提现'
        },
        {
          value: '2',
          label: '转账'
        },
        {
          value: '3',
          label: '活动奖励'
        },
        {
          value: '4',
          label: '推广奖励'
        },
        {
          value: '5',
          label: '人工充值'
        },
        {
          value: '6',
          label: 'ctc买入'
        },
        {
          value: '7',
          label: 'ctc卖出'
        }
      ],
      tradingStatus:[
        {
          value: '-1',
          label: '交易失败'
        },
        {
          value: '0',
          label: '交易中'
        },
        {
          value: '1',
          label: '交易成功'
        },
        {
          value: '2',
          label: '交易返还'
        }
      ],
    }
  },
  filters: {//13位时间搓转标准时间
    formatDate: function(value) {
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
  methods: {
    //搜索按钮操作
    handleQuery() {
      this.queryParams.pageNum = 1
      this.administrationList()
    },
    //重置按钮操作
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
      this.$store.commit('recordResetFn','');
      this.queryParams.memberWalletId=''
    },
    //列表
    administrationList() {
      memberRecordList(this.queryParams).then((res) => {
        this.advertisingInfo = res.rows
        this.total = res.total
      })
    },
    /**表体字体颜色设置
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // 状态列字体颜色
      if (row.status == 1 && columnIndex == 10) {
        return 'color: #0CB618'
      } else if (row.status == -1 && columnIndex == 10) {
        return 'color: #EA1B29'
      }
    },
    copyText(data) {//复制方法
      let url = data
      let oInput = document.createElement('input')
      oInput.value = url
      document.body.appendChild(oInput)
      oInput.select() // 选择对象
      document.execCommand("Copy") // 执行浏览器复制命令
      oInput.style.display='none';
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
  },
  created() {//初始化数据
    this.administrationList()
  },
}
</script>

<style scoped>
.search {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px 20px 0 20px;
}
.search_select {
  width: 172px;
}
.search_btn {
  padding: 0 20px 0 20px;
}
.search >>> .el-input--medium .el-input__inner {
  height: 32px;
  line-height: 32px;
}

.tab >>> .el-table th > .cell {
  text-align: center;
}

.tab >>> .el-table .cell {
  text-align: center;
}
.tab >>> .el-table--medium td {
  padding: 5px 0 !important;
}
.tab>>> .el-table th.gutter {
  display: table-cell !important
}
.page {
  text-align: right;
  padding: 22px 0;
}
</style>
