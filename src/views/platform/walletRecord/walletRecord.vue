<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <!-- search搜索区域 -->
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="平台钱包编号" prop="coinPlatformWalletId">
              <el-input v-model="queryParams.coinPlatformWalletId" placeholder="请输入平台钱包编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否已清算完成" prop="liquidated">
              <el-select
                v-model="queryParams.liquidated"
                placeholder="请选是否已清算完成"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in clearingList"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态" prop="walletState">
              <el-select
                v-model="queryParams.walletState"
                placeholder="请选择状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in statusList"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="search_btn">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="addFormVisible = true">创建</el-button>
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          <!--          <el-button type="warning" icon="el-icon-download" size="mini">导出</el-button>-->
        </div>
      </div>
    </el-form>
    <!-- table区域 -->
    <div class="app-container">
      <div class="tab_box">
        <div class="tab">
          <el-table
            :data="informationList"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="coinPlatformWalletId"
              label="平台钱包编号"
            >
            </el-table-column>
            <el-table-column
              prop="walletAddress"
              label="钱包地址"
              width="280"
            >
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  width="300"
                  trigger="hover"
                >
                  <span slot="reference">
                    <!-- {{ scope.row.blockId.substr(0, 5) + "..." +''}}-->
                    <el-button type="text" @click="copyText(scope.row.tokenId)">{{ scope.row.walletAddress}}</el-button>
                  </span>
                  <div>
                    <qrcode :value="scope.row.walletAddress" :options="{ width: 150}"></qrcode>
                    <div style="font-size: 12px;">{{ scope.row.walletAddress}}</div>
                    <el-button type="text" @click="copyText(scope.row.tokenId)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletPrikey"
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
                    <el-button type="text" @click="copyText(scope.row.walletPrikey)">复制</el-button>
                  </span>
                  <div>
                    <div style="font-size: 14px">{{ scope.row.walletPrikey}}</div><br>
                    <el-button type="text" @click="copyText(scope.row.walletPrikey)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletTrx"
              label="TRX余额"
            >
            </el-table-column>
            <el-table-column
              prop="walletUse"
              label="钱包用途"
            >
            </el-table-column>
            <el-table-column
              prop="frozen"
              label="	冻结资产"
            >
            </el-table-column>
            <el-table-column
              prop="liquidated"
              label="是否已清算完成"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.liquidated == 1 ? 'success': 'danger' ">
                  {{ scope.row.liquidated == 1 ? '已清算' : '未清算' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="network"
              label="网络环境"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.liquidated == 0 ? '主网' : '测试网' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="walletState"
              label="状态"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.walletState == 0 ? 'success': 'danger' ">
                  {{ scope.row.walletState == 0 ? '启用' : '废用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="lastTradeTime"
              label="最后一次交易时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.lastTradeTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="assetFn">查看资产</el-button>
                <el-button type="text" size="small" @click="updInformation(scope.row)">修改</el-button>
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
    <!-- 创建表单区域 -->
    <div class="zujian">
      <el-dialog title="创建" :visible.sync="addFormVisible" width="500px">
        <div class="form_box">
          <el-form ref="form" :model="form" label-width="180px">
            <el-form-item label="钱包用途">
              <el-select v-model="form.walletUse" placeholder="请选择">
                <el-option v-for="dict in walletStatusList" :key="dict.value" :label="dict.label"
                           :value="dict.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否已清算完成">
              <el-switch
                v-model="form.liquidated"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0">
              </el-switch>
            </el-form-item>

            <el-form-item label="网络环境">
              <el-switch
                v-model="form.network"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1">
              </el-switch>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch
                v-model="form.walletState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1">
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addInformation">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 资产列表 -->
    <div class="upData">
      <el-dialog title="资产列表" :visible.sync="assetFormVisible" width="1000px">
        <div class="app-container">
          <div class="tab_box">
            <div class="tab">
              <el-table
                :data="assetlist"
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
                  prop="platformWalletTokenId"
                  label="钱包货币Token信息编号"
                >
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
                        <qrcode :value="scope.row.walletAddress" :options="{ width: 150}"></qrcode>
                        <div style="font-size: 12px;">{{ scope.row.walletAddress}}</div>
                        <el-button type="text" @click="copyText(scope.row.walletAddress)">复制</el-button>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="balance"
                  label="余额"
                >
                </el-table-column>
                <el-table-column
                  prop="createTime"
                  label="创建时间"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.createTime | formatDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="syncTime"
                  label="同步时间"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.syncTime | formatDate }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="remarks"
                  label="平台备注"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                >
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="dealFn(scope.row.platformWalletId)">查看交易记录</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="page">
              <pagination
                v-show="assetTotal>0"
                :total="assetTotal"
                :page.sync="assetQueryParams.pageNum"
                :limit.sync="assetQueryParams.pageSize"
                :page-sizes="[10, 15, 20]"
                @pagination="assetFn"
              />
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 修改 -->
    <div class="upData">
      <el-dialog title="修改" :visible.sync="updFormVisible" width="500px">
        <div class="form_box">
          <el-form ref="form" :model="updForm" label-width="180px">
            <el-form-item label="平台钱包编号" prop="coinPlatformWalletId">
              <el-input v-model="updForm.coinPlatformWalletId"
                        placeholder="请输入平台钱包编号"
                        class="search_select"
              ></el-input>
            </el-form-item>
            <el-form-item label="钱包用途">
              <el-select v-model="updForm.walletUse" placeholder="请选择"
                         @change="$forceUpdate()"
              >
                <el-option v-for="itme in UpdwalletStatusList"
                           :key="itme.value"
                           :label="itme.label"
                           :value="itme.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否已清算完成">
              <el-switch
                v-model="updForm.liquidated"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
                @change="$forceUpdate()"
              >
              </el-switch>
            </el-form-item>

            <el-form-item label="网络环境">
              <el-switch
                v-model="updForm.network"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
                @change="$forceUpdate()"
              >
              </el-switch>
            </el-form-item>

            <el-form-item label="状态">
              <el-switch
                v-model="updForm.walletState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="0"
                inactive-value="1"
                @change="$forceUpdate()"
              >
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updFormData">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import {platformInformationList,
  addInformation,
  updInformation,
  assetInformationList
} from '@/api/platform/walletRecord'
export default {
  data() {
    return {
      form: {},// add表单参数
      updForm: {},//upd表单参数
      addFormVisible: false,//创建控制
      updFormVisible: false,//修改控制
      assetFormVisible: false,//资产控制
      total: 0, // 总条数
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 100,
        coinPlatformWalletId: undefined,//平台钱包编号
        liquidated: undefined,//是否已清算完成
        walletState: undefined,//状态
      },
      informationList: [],//列表数据
      clearingList: [//是否已清算完成
        {
          value: '0',
          label: '未清算'
        },
        {
          value: '1',
          label: '已清算'
        },
      ],
      statusList: [//状态
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '废用'
        },
      ],
      walletStatusList: [//钱包状态
        {
          value: '0',
          label: '测试钱包'
        },
        {
          value: '1',
          label: '客服钱包'
        },
        {
          value: '2',
          label: '清算钱包'
        },
      ],
      UpdwalletStatusList: [//钱包状态
        {
          value: '0',
          label: '测试钱包'
        },
        {
          value: '1',
          label: '客服钱包'
        },
        {
          value: '2',
          label: '清算钱包'
        },
      ],
      //---------资产字段-----------
      assetTotal: 0, // 总条数
      assetlist:[],//资产列表数据
      assetQueryParams: {// 查询参数
        pageNum: 1,
        pageSize: 10,
      },

    }
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
  methods: {
    addInformation() {//创建
      this.addFormVisible = false
      addInformation(this.form).then((res) => {
        if (res.code == 200) {
          this.$message.success('添加成功')
          this.administrationList()
        } else {
          this.$message.error('添加失败')
        }
      })
    },
    updInformation(row) {//回显数据
      this.updFormVisible = true
      this.updForm.coinPlatformWalletId = row.coinPlatformWalletId
      this.updForm.walletUse = row.walletUse
      this.UpdwalletStatusList.forEach((item, index) => {
        if (row.walletUse == item.value) {
          this.updForm.walletUse = item.label
        }
      })
      this.updForm.liquidated = row.liquidated
      this.updForm.network = row.network
      this.updForm.walletState = row.walletState
    },
    updFormData() { //修改数据
      this.updFormVisible = false
      if (this.updForm.walletUse == '测试钱包') {
        this.updForm.walletUse = '0'
      } else if (this.updForm.walletUse == '客服钱包') {
        this.updForm.walletUse = '1'
      } else if (this.updForm.walletUse == '清算钱包') {
        this.updForm.walletUse = '2'
      }
      updInformation(this.updForm).then((res) => {
        if (res.code == 200) {
          this.$message.success('修改成功')
          this.administrationList()
        } else {
          this.$message.error('修改失败')
        }
      })
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
    //列表
    administrationList() {
      platformInformationList(this.queryParams).then((res) => {
        this.informationList = res.rows
        this.total = res.total
      })
    },
    /***表体字体颜色设置
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyle({row, column, rowIndex, columnIndex}) {
      // 状态列字体颜色
      if (row.liquidated == 1 && columnIndex == 6) {
        return 'color: #0CB618'
      } else if (row.liquidated == 0 && columnIndex == 6) {
        return 'color: #EA1B29'
      }
      if (row.walletState == 0 && columnIndex == 8) {
        return 'color: #0CB618'
      } else if (row.walletState == 1 && columnIndex == 8) {
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
    //---------资产function----------
    assetFn(){//查看资产
      this.assetFormVisible=true
      assetInformationList(this.assetQueryParams).then((res) => {
        this.assetlist = res.rows
        this.assetTotal = res.total
      })
    },
    dealFn(row){
      this.$router.push('/platform/information')
      this.$store.commit('tradingTradingFn', row);
    }
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
  width: 186px;
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

.page {
  text-align: right;
  padding: 22px 0;
}

.tab >>> .el-table th.gutter {
  display: table-cell !important
}
</style>
