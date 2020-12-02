<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="订单编号" prop="acceptor">
              <el-input v-model="queryParams.acceptor" placeholder="请输入订单编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="广告编号" prop="advertiseId">
              <el-input v-model="queryParams.advertiseId" placeholder="请输入广告编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="发起用户" prop="userId">
              <el-input v-model="queryParams.userId" placeholder="请输入发起用户" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
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
                  v-for="itme in typeInfo"
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
            :data="ctcInfo"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="ctcOrderId"
              label="订单编号"
            >
            </el-table-column>
            <el-table-column
              prop="advertiseId"
              label="广告编号"
            >
            </el-table-column>
            <el-table-column
              prop="userId"
              label="订单发起用户-用户编号"
            >
            </el-table-column>
            <el-table-column
              prop="realName"
              label="订单发起用户-用户名"
            >
            </el-table-column>
            <el-table-column
              prop="acceptor"
              label="承兑商-用户名"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="交易数量"
            >
            </el-table-column>
            <el-table-column
              prop="money"
              label="交易金额"
              width="120">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="币种"
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
            >
              <template slot-scope="scope">
                <span></span>
                <el-tag size="small" :type="scope.row.status == 3 ? 'success':scope.row.status == 4 ? 'danger':'' ">
                  {{scope.row.status == 0 ? '未接单' : scope.row.status == 1 ? '已接单' : scope.row.status == 2 ? '已付款' :scope.row.status == 3 ? '已完成':scope.row.status == 4 ? '已取消':scope.row.status == 5 ? '仲裁中':scope.row.status}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="direction"
              label="订单类型[买入/卖出]"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.direction == 0 ? 'success': 'danger' ">
                  {{scope.row.direction === 0 ? '买入' : '卖出'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="operation(scope.row.ctcOrderId)" type="text" size="small">操作订单</el-button>
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
  import { otcCtcList } from '@/api/otc/order'

  export default {
    data() {
      return {
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100,
          acceptor: undefined,//订单编号
          advertiseId: this.$store.state.details.advertiseId,//广告编号
          userId: undefined,//发起用户
          status: undefined//状态
        },
        ctcInfo: [],//ctc订单数据
        typeInfo: [
          {
            value: '0',
            label: '未接单'
          },
          {
            value: '1',
            label: '已接单'
          },
          {
            value: '2',
            label: '已付款'
          },
          {
            value: '3',
            label: '已完成'
          },
          {
            value: '4',
            label: '已取消'
          },
          {
            value: '5',
            label: '仲裁中'
          }
        ]
      }
    },
    methods: {
      //操作订单
      operation(row){
        this.$router.push('/otc/operation')
        this.$store.commit('operationFn', row);
      },
      //搜索按钮操作
      handleQuery() {
        this.queryParams.pageNum = 1
        this.administrationList()
      },
      //重置按钮操作
      resetQuery() {
        this.resetForm('queryForm')
        this.$store.commit('resetFn','');
        this.queryParams.advertiseId=''
        this.handleQuery()
      },
      //列表
      administrationList() {
        otcCtcList(this.queryParams).then((res) => {
          this.ctcInfo = res.rows
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
        if (row.direction == 0 && columnIndex == 9) {
          return 'color: #0CB618'
        } else if (row.direction == 1 && columnIndex == 9) {
          return 'color: #EA1B29'
        } if (row.status == 1 && columnIndex == 8) {
          return 'color: #0CB618'
        } else if (row.status == 0 && columnIndex == 8) {
          return 'color: #EA1B29'
        } if (row.status == 2 && columnIndex == 8) {
          return 'color: #0CB618'
        } if (row.status == 3 && columnIndex == 8) {
          return 'color: #0CB618'
        } if (row.status == 4 && columnIndex == 8) {
          return 'color: #EA1B29'
        } if (row.status == 5 && columnIndex == 8) {
          return 'color: #FFFFCC'
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
