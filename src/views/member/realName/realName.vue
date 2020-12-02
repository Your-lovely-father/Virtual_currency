<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="会员编号" prop="memberId">
              <el-input v-model="queryParams.memberId" placeholder="请输入会员编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="会员用户名" prop="name">
              <el-input v-model="queryParams.name" placeholder="请输入会员用户名" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="审核状态" prop="auditStatus">
              <el-select
                v-model="queryParams.auditStatus"
                placeholder="请选择审核状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in auditOptions"
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
            :data="memberAuditList"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="memberAuditId"
              label="编号"
            >
            </el-table-column>
            <el-table-column
              prop="memberId"
              label="用户编号"
            >
            </el-table-column>
            <el-table-column
              prop="memberName"
              label="用户名"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="真实姓名"
            >
            </el-table-column>
            <el-table-column
              prop="handIdentityCard"
              label="身份证照片"
            >
              <template slot-scope="scope">
                <el-popover placement="top-start" trigger="click">
                  <!--trigger属性值：hover、click、focus 和 manual-->
                  <a :href="scope.row.handIdentityCard" target="_blank" title="查看最大化图片">
                    <img :src="scope.row.handIdentityCard" style="width: 300px;height: 300px" />
                  </a>
                  <img v-show="scope.row.handIdentityCard" slot="reference" :src="scope.row.handIdentityCard" style="width: 50px;height: 50px; cursor:pointer" />
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="auditStatus"
              label="状态"
            >
              <template slot-scope="scope">
                <span>
                  </span>
                <el-tag size="small" :type="scope.row.auditStatus == 2 ? 'success': scope.row.auditStatus == 1 ? 'danger':scope.row.auditStatus == 0 ? 'warning':''">
                  {{scope.row.auditStatus ==0 ?'待审核':scope.row.auditStatus ==1? '审核失败':scope.row.auditStatus==2? '审核成功':scope.row.auditStatus}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="creationTime"
              label="提交时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.creationTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="turnoverTime"
              label="更新时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{scope.row.turnoverTime | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button @click="auditClick(scope.row.memberAuditId)" type="text" size="small">通过审核</el-button>
                <el-button @click="refusedClick(scope.row.memberAuditId)" type="text" size="small">驳回审核</el-button>
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
  import { memberAuditList , memberApply} from '@/api/member/realName'
  export default {
    data() {
      return {
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100,
          memberId: undefined,//会员编号
          name: undefined,//用户名
          auditStatus:undefined//审核状态
        },
        memberAuditList: [],//列表数据
        auditOptions: [{ //审核状态
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核失败'
        },
          {
            value: '2',
            label: '审核成功'
          }
        ]
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
      auditClick(row){ //通过审核
        memberApply({auditStatus:2,memberAuditId: row }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.administrationList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      refusedClick(row){ //驳回审核
        memberApply({auditStatus:1,memberAuditId: row }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.administrationList()
          } else {
            this.$message.error(res.msg)
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
        memberAuditList(this.queryParams).then((res) => {
          this.memberAuditList = res.rows
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
        if (row.auditStatus == 0 && columnIndex == 5) {
          return 'color: #DBDB70'
        }else if (row.auditStatus == 1 && columnIndex == 5) {
          return 'color: #EA1B29'
        }if (row.auditStatus == 2 && columnIndex == 5) {
          return 'color: #0CB618'
        }
      }
    },
    created() {//初始化数据
      this.administrationList()
    }
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
  .tab>>> .el-table th.gutter {
    display: table-cell !important
  }
  .page {
    text-align: right;
    padding: 22px 0;
  }
</style>
