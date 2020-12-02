<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="系统公告编号" prop="appNoticeId">
              <el-input v-model="queryParams.appNoticeId" placeholder="请输入系统公告编号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否热门" prop="whetherHot">
              <el-select
                v-model="queryParams.whetherHot"
                placeholder="请选择是否热门"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in hotOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否首页弹出" prop="whetherIndexPopup">
              <el-select
                v-model="queryParams.whetherIndexPopup"
                placeholder="请选择是否首页弹出"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in popupOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否显示在APP" prop="whetherShowApp">
              <el-select
                v-model="queryParams.whetherShowApp"
                placeholder="请选择是否显示在APP"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in appOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否置顶" prop="whetherTop">
              <el-select
                v-model="queryParams.whetherTop"
                placeholder="请选择是否置顶"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in topOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="search_btn">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="appAdd">创建</el-button>
          <el-button type="cyan" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
        </div>
      </div>
    </el-form>
    <div class="app-container">
      <div class="tab_box">
        <div class="tab">
          <el-table
            :data="appAdminlist"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="appNoticeId"
              label="系统公告编号"
            >
            </el-table-column>
            <el-table-column
              prop="noticeTitle"
              label="标题"
            >
            </el-table-column>
            <el-table-column
              prop="whetherHot"
              label="是否热门"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.whetherHot == 0 ? 'success': 'danger' ">
                  {{ scope.row.whetherHot == 0 ? '是' : '否' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="whetherIndexPopup"
              label="是否首页弹出"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.whetherIndexPopup == 0 ? 'success': 'danger' ">
                  {{ scope.row.whetherIndexPopup == 0 ? '是' : '否' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="whetherShowApp"
              label="是否显示在APP"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.whetherShowApp == 0 ? 'success': 'danger' ">
                  {{ scope.row.whetherShowApp == 0 ? '是' : '否' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="whetherTop"
              label="是否置顶"
            >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.whetherTop == 0 ? 'success': 'danger' ">
                  {{ scope.row.whetherTop == 0 ? '是' : '否' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="adminId"
              label="创建者id"
            >
            </el-table-column>
            <el-table-column
              prop="noticeContent"
              label="内容"
            >
              <template slot-scope="scope">
                <el-button type="text" @click="dialogSee(scope.row.noticeContent)">查看详情</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="author"
              label="作者"
            >
            </el-table-column>
            <el-table-column
              prop="creationTime"
              label="创建时间"
              :show-overflow-tooltip="true"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.creationTime | formatDate }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="appDelete(scope.row.appNoticeId)">删除</el-button>
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
        <el-dialog title="详情" :visible.sync="dialogFormVisible"  width="60%">
          <p v-html="content"></p>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {appList, appDel} from '@/api/appAdministration/systemNotice'
export default {
  data() {
    return {
      total: 0, // 总条数
      dialogFormVisible: false,
      content:undefined,//详情内容
      queryParams: {// 查询参数
        pageNum: 1,
        pageSize: 100,
        appNoticeId: undefined,//系统公告编号
        whetherHot: undefined,//是否热门
        whetherIndexPopup: undefined,//是否首页弹出
        whetherShowApp: undefined,//是否显示在APP
        whetherTop: undefined,//是否置顶
      },
      appAdminlist: [],//列表数据
      hotOptions: [//是否热门
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      popupOptions: [//是否首页弹出
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      appOptions: [//是否显示在APP
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
      topOptions: [//是否置顶
        {
          value: '0',
          label: '是'
        },
        {
          value: '1',
          label: '否'
        },
      ],
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
    //添加跳转新页面
    appAdd(){
      this.$router.push({path:'/appAdministration/appAdd'})
    },
    //删除操作
    appDelete(row) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        appDel(row).then(res => {
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
    dialogSee(row){//查看详情
      this.content=row
      this.dialogFormVisible=true
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
      appList(this.queryParams).then((res) => {
        this.appAdminlist = res.rows
        this.total = res.total
      })
    },
    /**表体字体颜色设置
     * row为某一行的除操作外的全部数据
     * column为某一列的属性
     * rowIndex为某一行（从0开始数起）
     * columnIndex为某一列（从0开始数起）
     */
    cellStyle({row, column, rowIndex, columnIndex}) {
      // 状态列字体颜色
      if (row.whetherHot == 0 && columnIndex == 2) {
        return 'color: #0CB618'
      } else if (row.whetherHot == 1 && columnIndex == 2) {
        return 'color: #EA1B29'
      }
      if (row.whetherIndexPopup == 0 && columnIndex == 3) {
        return 'color: #0CB618'
      } else if (row.whetherIndexPopup == 1 && columnIndex == 3) {
        return 'color: #EA1B29'
      }
      if (row.whetherShowApp == 0 && columnIndex == 4) {
        return 'color: #0CB618'
      } else if (row.whetherShowApp == 1 && columnIndex == 4) {
        return 'color: #EA1B29'
      }
      if (row.whetherTop == 0 && columnIndex == 5) {
        return 'color: #0CB618'
      } else if (row.whetherTop == 1 && columnIndex == 5) {
        return 'color: #EA1B29'
      }
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

.tab >>> .el-table th.gutter {
  display: table-cell !important
}

.page {
  text-align: right;
  padding: 22px 0;
}
</style>
