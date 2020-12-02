<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="币种编号" prop="coinId">
              <el-input v-model="queryParams.coinId" placeholder="请输入币种编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="平台钱包编号" prop="platformWalletId">
              <el-input v-model="queryParams.platformWalletId" placeholder="请输入平台钱包编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="钱包交易记录编号" prop="platformWalletTradeId">
              <el-input v-model="queryParams.platformWalletTradeId" placeholder="请输入钱包交易记录编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="订单是否返还" prop="tradeRevert">
              <el-select
                v-model="queryParams.tradeRevert"
                placeholder="请选择订单是否返还"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in returnOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态" prop="tradeState">
              <el-select
                v-model="queryParams.tradeState"
                placeholder="请选择状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in statusOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类型" prop="type">
              <el-select
                v-model="queryParams.type"
                placeholder="请选择类型"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in typeOptions"
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
            :data="tisinglist"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="coinId"
              label="币种编号"
            >
            </el-table-column>
            <el-table-column
              prop="platformWalletId"
              label="平台钱包编号"
            >
            </el-table-column>
            <el-table-column
              prop="platformWalletTradeId"
              label="钱包交易记录编号"
            >
            </el-table-column>
            <el-table-column
              prop="blockId"
              label="交易发生区块"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.blockId}}
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="fromAddress"
              label="发送人地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.fromAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.fromAddress}}
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="toAddress"
              label="收款人地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.toAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.toAddress}}
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="tokenId"
              label="合约地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.tokenId)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.tokenId}}
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              label="钱包地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.walletAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.walletAddress}}
                    <el-button type="text" @click="copyText(scope.row.blockId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="tokenTreaty"
              label="交易货币类型"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="交易金额"
            >
            </el-table-column>
            <el-table-column
              prop="tradeRevert"
              label="订单是否返还"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.tradeRevert == 1 ? 'success': 'danger' ">
                  {{scope.row.tradeRevert == 1 ? '已返还' : '未返还'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="tradeState"
              label="状态"
            >
              <template slot-scope="scope">
                <span>
                  </span>
                <el-tag size="small" :type="scope.row.tradeState == 1 ? 'success':scope.row.tradeState == 2 ? 'danger':'' ">
                  {{scope.row.tradeState === 0 ? '交易中' :scope.row.tradeState == 1 ? '成功' :scope.row.tradeState == 2 ? '失败' :scope.row.tradeState}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="type"
              label="类型"
            >
              <template slot-scope="scope">
                <span>{{scope.row.type === 1 ? '转账手续费' :scope.row.type === 2 ? '客服主动转账' :scope.row.type === 3 ? '转入' :scope.row.type === 4 ? '清算' :scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="confirmTime"
              label="交易确认时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.confirmTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              :show-overflow-tooltip="true"
            >
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
import { platformWalletList } from '@/api/platform/information'
export default {
  data() {
    return {
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 100,
        coinId:undefined,//币种编号
        platformWalletId:this.$store.state.details.platformWalletId,//平台钱包编号
        platformWalletTradeId:undefined,//钱包交易记录编号
        tradeRevert:undefined,//订单是否返还
        tradeState:undefined,//状态
        type:undefined,//类型
      },
      tisinglist: [],//列表数据
      returnOptions:[//订单是否返还
        {
          value: '0',
          label: '未返还'
        },
        {
          value: '1',
          label: '已返还'
        },
      ],
      statusOptions:[//状态
        {
          value: '0',
          label: '交易中'
        },
        {
          value: '1',
          label: '成功'
        },
        {
          value: '2',
          label: '失败'
        }
      ],
      typeOptions:[//类型
        {
          value: '1',
          label: '转账手续费'
        },
        {
          value: '2',
          label: '客服主动转账'
        },
        {
          value: '3',
          label: '转入'
        },
        {
          value: '4',
            label: '清算'
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
      this.$store.commit('tradingResetFn','');
      this.queryParams.platformWalletId=''
    },
    //列表
    administrationList() {
      platformWalletList(this.queryParams).then((res) => {
        this.tisinglist = res.rows
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
      if (row.tradeRevert == 1 && columnIndex == 10) {
        return 'color: #0CB618'
      } else if (row.tradeRevert == 0 && columnIndex == 10) {
        return 'color: #EA1B29'
      } if (row.tradeState == 1 && columnIndex == 11) {
        return 'color: #0CB618'
      } else if (row.tradeState == 2 && columnIndex == 11) {
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
