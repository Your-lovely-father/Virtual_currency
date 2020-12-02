<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="用户编号" prop="memberId">
              <el-input v-model="queryParams.memberId" placeholder="请输入用户编码" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="币种" prop="coinId">
              <el-select
                v-model="queryParams.coinId"
                placeholder="请选择币种"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in currencyList"
                  :key="itme.coinId"
                  :label="itme.coinName"
                  :value="itme.coinId"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="钱包是否锁定" prop="memberWalletLock">
              <el-select
                v-model="queryParams.memberWalletLock"
                placeholder="请选择钱包是否锁定"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in walletOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态" prop="memberWalletStatus">
              <el-select
                v-model="queryParams.memberWalletStatus"
                placeholder="请选择状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in stateOptions"
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
            :data="memberWalletList"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="memberWalletId"
              label="钱包id"
            >
            </el-table-column>
            <el-table-column
              prop="memberId"
              label="会员id"
            >
            </el-table-column>
            <el-table-column
              prop="coinName"
              label="币种名称"
            >
            </el-table-column>
            <el-table-column
              prop="availableBalance"
              label="可用余额"
            >
            </el-table-column>
            <el-table-column
              prop="blockedBalances"
              label="冻结余额"
            >
            </el-table-column>
            <el-table-column
              prop="releasedAmounts"
              label="待释放总量"
            >
            </el-table-column>
            <el-table-column
              prop="memberWalletLock"
              label="钱包是否锁定"
            >
              <template slot-scope="scope">
                <el-tag  size="small" :type="scope.row.memberWalletLock == 0 ? 'success': 'danger' ">
                  {{scope.row.memberWalletLock == 0 ? '锁定' : '未锁定'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="memberWalletStatus"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag  size="small" :type="scope.row.memberWalletStatus == 0 ? 'success': 'danger' ">
                  {{scope.row.memberWalletStatus == 0 ? '启用' : '平台冻结'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="rechargeAddress"
              label="充值地址"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.rechargeAddress)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.rechargeAddress}}
                    <el-button type="text" @click="copyText(scope.row.rechargeAddress)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="memberWalletPrivateKey"
              label="钱包私钥"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.memberWalletPrivateKey)">复制</el-button>
                  </span>
                  <div>
                    {{ scope.row.memberWalletPrivateKey}}
                    <el-button type="text" @click="copyText(scope.row.memberWalletPrivateKey)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="memberWalletSynchronizationTime"
              label="钱包同步时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.memberWalletSynchronizationTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="viewClick(scope.row.memberWalletId)" type="text" size="small">查看交易记录</el-button>
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
  import { memberWalletList, memberCurrencyList } from '@/api/member/wallet'

  export default {
    data() {
      return {
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100,
          memberId: undefined,//用户编码
          memberWalletLock: undefined,//钱包是否锁定
          memberWalletStatus: undefined,//状态
          coinId: undefined//币种
        },
        memberWalletList: [],//列表数据
        currencyList: [],//币种数据
        walletOptions: [{ //钱包
          value: '0',
          label: '锁定'
        }, {
          value: '1',
          label: '未锁定'
        }],
        stateOptions: [{ //状态
          value: '0',
          label: '启用'
        }, {
          value: '1',
          label: '平台冻结'
        }]
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
      //查看
      viewClick(row){
        this.$router.push('/member/record')
        this.$store.commit('recordFn', row);
      },
      //搜索按钮操作
      handleQuery() {
        this.queryParams.pageNum = 1
        this.administrationList()
      },
      //重置按钮操作
      resetQuery() {
        this.resetForm('queryForm')
        this.handleQuery()
      },
      //tab'列表
      administrationList() {
        memberWalletList(this.queryParams).then((res) => {
          this.memberWalletList = res.rows
          this.total = res.total
          res.rows.forEach((itme, val) => {
            let coinName = '未知'
            this.currencyList.forEach((el, val) => {
              if (itme.coinId == el.coinId) {
                coinName = el.coinName
              }
            })
            itme.coinName = coinName
          })
        })
      },
      //币种列表
      getCurrencyList() {
        memberCurrencyList().then((res) => {
          this.currencyList = res.rows
        })
      },
      /***表体字体颜色设置
       * row为某一行的除操作外的全部数据
       * column为某一列的属性
       * rowIndex为某一行（从0开始数起）
       * columnIndex为某一列（从0开始数起）
       */
      cellStyle({ row, column, rowIndex, columnIndex }) {
        // 状态列字体颜色
        if (row.memberWalletLock == 0 && columnIndex == 7) {
          return 'color: #0CB618'
        } else if (row.memberWalletLock == 1 && columnIndex == 7) {
          return 'color: #EA1B29'
        }
        if (row.memberWalletStatus == 0 && columnIndex == 6) {
          return 'color: #0CB618'
        } else if (row.memberWalletStatus == 1 && columnIndex == 6) {
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
      this.getCurrencyList()
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
    width: 193px;
  }

  .search_btn {
    padding: 0 20px 0 20px;
    box-sizing: border-box;
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
    padding: 0 0 !important;
  }

  .tab >>> .el-table th.gutter {
    display: table-cell !important
  }

  .page {
    text-align: right;
    padding: 22px 0;
  }
</style>
