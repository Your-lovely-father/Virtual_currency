<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="承兑商编号" prop="advertiseMemberId">
              <el-input v-model="queryParams.advertiseMemberId" placeholder="请输入承兑商编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="支付方式" prop="payModeIds">
              <el-select
                v-model="queryParams.payModeIds"
                placeholder="请选择支付方式"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in payInfo"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类型" prop="advertiseType">
              <el-select
                v-model="queryParams.advertiseType"
                placeholder="请选择类型"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in typeInfo"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="queryParams.status"
                placeholder="请选择状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in stateInfo"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否禁止交易" prop="prohibitedTransaction">
              <el-select
                v-model="queryParams.prohibitedTransaction"
                placeholder="请选择是否禁止交易"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in commonAllowOptions"
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
              prop="advertiseId"
              label="广告编号"
              >
            </el-table-column>
            <el-table-column
              prop="advertiseMemberId"
              label="广告者-编号"
              >
            </el-table-column>
            <el-table-column
              prop="memberName"
              label="广告者-用户名"
             >
            </el-table-column>
            <el-table-column
              prop="memberRole"
              label="角色"
            >
              <template slot-scope="scope">
                <span>{{scope.row.memberRole == 0 ? '普通会员' : '承兑商'}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="coinId"
              label="币种"
             >
            </el-table-column>
            <el-table-column
              prop="dealAmount"
              label="交易数量"
             >
            </el-table-column>
            <el-table-column
              prop="minLimit"
              label="最低单笔交易额"
              width="120">
            </el-table-column>
            <el-table-column
              prop="maxLimit"
              label="最高单笔交易额"
            >
            </el-table-column>
            <el-table-column
              prop="timeLimit"
              label="付款期限/单位分钟"
              >
            </el-table-column>
            <el-table-column
              prop="remainAmount"
              label="计划剩余数量"
              >
            </el-table-column>
            <el-table-column
              prop="orderCount"
              label="CTC订单"
            >
            </el-table-column>
            <el-table-column
              prop="advertiseType"
              label="广告类型"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.advertiseType == 0 ? 'success': 'danger' ">
                  {{scope.row.advertiseType === 0 ? '买入' : '卖出'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="viewClick(scope.row.advertiseId)" type="text" size="small">查看CTC订单</el-button>
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
  import { otcAdvertisingList } from '@/api/otc/advertising'
  export default {
    data() {
      return {
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100,
          advertiseMemberId:undefined,//承兑商编号
          payModeIds:undefined,//承兑商支持的付费方式
          advertiseType:undefined,//广告类型
          status:undefined,//状态
          prohibitedTransaction:undefined//是否禁止交易
        },
        advertisingInfo: [],//列表数据
        payInfo:[
          {
            value: '0',
            label: '微信'
          },
          {
            value: '1',
            label: '支付宝'
          },
          {
            value: '2',
            label: '银行卡'
          },
        ],
        typeInfo:[
          {
            value: '0',
            label: '买入'
          },
          {
            value: '1',
            label: '卖出'
          },
          {
            value: '',
            label: '全部'
          },
        ],
        stateInfo:[
          {
            value: '0',
            label: '上架'
          },
          {
            value: '1',
            label: '下架'
          },
          {
            value: '-1',
            label: '已关闭'
          },
          {
            value: '',
            label: '全部'
          },
        ],
        commonAllowOptions: [{ //通用允许/禁止
          value: '0',
          label: '允许'
        }, {
          value: '1',
          label: '禁止'
        }],
      }
    },
    methods: {
      //查看
      viewClick(row){
        this.$router.push('/otc/order')
        this.$store.commit('detailsFn', row);
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
        otcAdvertisingList(this.queryParams).then((res) => {
          this.advertisingInfo = res.rows
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
        if (row.advertiseType == 0 && columnIndex == 11) {
          return 'color: #0CB618'
        } else if (row.advertiseType == 1 && columnIndex == 11) {
          return 'color: #EA1B29'
        }
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
