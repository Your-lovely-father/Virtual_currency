<template>
  <div class="administration">
    <div class="app-container">
      <div class="tab_box">
        <div class="tab_btn">
          <el-button
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="dialogFormVisible = true"
          >新增
          </el-button>
        </div>
        <div class="tab">
          <el-table
            :data="CurrencyInfo"
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
              prop="coinName"
              label="币种名称"
            >
            </el-table-column>
            <el-table-column
              prop="unit"
              label="货币单位"
            >
            </el-table-column>
            <el-table-column
              prop="minTxFee"
              label="交易手续费"
            >
            </el-table-column>
            <el-table-column
              prop="tokenAddress"
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
                    <el-button type="text" @click="copyText(scope.row.tokenAddress)">复制</el-button>
                  </span>
                  <div>
                    <qrcode :value="scope.row.tokenAddress" :options="{ width: 150}"></qrcode>
                    <div style="font-size: 12px;">{{ scope.row.tokenAddress}}</div>
                    <el-button type="text" @click="copyText(scope.row.tokenAddress)">复制</el-button>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="withdrawScale"
              label="提币精度"
            >
            </el-table-column>
            <el-table-column
              prop="accountType"
              label="账户类型"
            >
              <template slot-scope="scope">
                <span>{{scope.row.accountType === 1 ? 'ETH' : scope.row.accountType === 2 ? 'TRX' :scope.row.accountType === 3 ? 'EOS' :scope.row.accountType}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="isPlatformCoin"
              label="是否是平台币"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.isPlatformCoin == 0 ? 'success': 'danger' ">
                  {{scope.row.isPlatformCoin == 0 ? '是' : '否'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="delClick(scope.row.coinId)" type="text" size="small">删除</el-button>
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
    <!-- 添加表单区域   -->
    <div class="zujian">
      <el-dialog title="新增" :visible.sync="dialogFormVisible" width="850px">
        <div class="form_box">
          <el-form ref="form" :model="form"  label-width="180px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="对人民币汇率">
                  <el-input v-model="form.cnyRate" placeholder="请输入对人民币汇率"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="币种名称">
                  <el-input v-model="form.coinName" placeholder="请输入币种名称"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="币种资料链接">
                  <el-input v-model="form.infoLink" placeholder="请输入币种资料链接"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最大提币手续费">
                  <el-input v-model="form.maxTxFee" placeholder="请输入最大提币手续费"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最大提币数量">
                  <el-input v-model="form.maxWithdrawAmount" placeholder="请输入最大提币数量"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="充币阈值">
                  <el-input v-model="form.minRechargeAmount" placeholder="请输入充币阈值"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最小提币手续费">
                  <el-input v-model="form.minTxFee" placeholder="请输入最小提币手续费"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最小提币数量">
                  <el-input v-model="form.minWithdrawAmount" placeholder="请输入最小提币数量"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="12">
                <el-form-item label="转账时付给矿工的手续费">
                  <el-input v-model="form.minerFee" placeholder="请输入转账时付给矿工的手续费"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="钱包地址">
                  <el-input v-model="form.tokenAddress" placeholder="请输入钱包地址"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="单位缩写">
                  <el-input v-model="form.unit" placeholder="请输入单位缩写"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="对美元汇率">
                  <el-input v-model="form.usdRate" placeholder="请输入对美元汇率"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="提币精度">
                  <el-input v-model="form.withdrawScale" placeholder="请输入提币精度"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="提币阈值">
                  <el-input v-model="form.withdrawThreshold" placeholder="请输入提币阈值"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="排序">
                  <el-input v-model="form.sort" placeholder="请输入排序"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="账户类型">
                  <el-select v-model="form.accountType" placeholder="请选择">
                    <el-option v-for="dict in accountList" :key="dict.value" :label="dict.label"
                               :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="币种简介">
              <el-input v-model="form.infoRmation" type="textarea" placeholder="请输入币种简介"></el-input>
            </el-form-item>

            <el-row>
              <el-col :span="8">
                <el-form-item label="是否能提币">
                  <el-switch
                    v-model="form.canWithdraw"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否能充币">
                  <el-switch
                    v-model="form.canRecharge"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否能转账">
                  <el-switch
                    v-model="form.canTransfer"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="是否是平台币">
                  <el-switch
                    v-model="form.isPlatformCoin"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否支持rpc接口">
                  <el-switch
                    v-model="form.enableRpc"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否是合法币种(平台认证)">
                  <el-switch
                    v-model="form.hasLegal"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-value="0"
                    inactive-value="1">
                  </el-switch>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCurrency">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import { otcCurrencyList, delCurrency, addCurrency } from '@/api/otc/currency'

  export default {
    data() {
      return {
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100
        },
        CurrencyInfo: [],//币种数据
        // 表单参数
        form: {},
        dialogTableVisible: false,
        dialogFormVisible: false,
        accountList: [{
          value: '1',
          label: 'ETH'
        }, {
          value: '2',
          label: 'TRX'
        }, {
          value: '3',
          label: 'EOS'
        }]
      }
    },
    methods: {
      addCurrency() {//添加币种
        this.dialogFormVisible = false
        addCurrency(this.form).then((res) => {
          if (res.code == 200) {
            this.$message.success('添加成功')
            this.administrationList()
          } else {
            this.$message.error('添加失败')
          }
        })
      },
      delClick(row) {//删除
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCurrency(row).then(res => {
            if (res.code == 200) {
              this.$message.success('删除成功')
              this.administrationList()
            } else {
              this.$message.error('删除失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //列表
      administrationList() {
        otcCurrencyList(this.queryParams).then((res) => {
          this.CurrencyInfo = res.rows
          this.total = res.total
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
        if (row.isPlatformCoin == 0 && columnIndex == 7) {
          return 'color: #0CB618'
        } else if (row.isPlatformCoin == 1 && columnIndex == 7) {
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
    }
  }
</script>

<style scoped>
  .tab_btn {
    margin-bottom: 20px;
  }

  .tab >>> .el-table th > .cell {
    text-align: center;
  }

  .tab >>> .el-table .cell {
    text-align: center;
  }

  .page {
    text-align: right;
    padding: 22px 0;
  }

  .form_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .tab >>> .el-table th.gutter {
    display: table-cell !important
  }
</style>
