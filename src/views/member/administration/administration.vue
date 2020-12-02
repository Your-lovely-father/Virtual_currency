<template>
  <div class="administration">
    <el-form :model="queryParams" ref="queryForm" :inline="true">
      <div class="search_box">
        <div class="search">
          <div>
            <el-form-item label="用户名" prop="memberName">
              <el-input v-model="queryParams.memberName" placeholder="请输入用户名" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="手机号" prop="phoneNumber">
              <el-input v-model="queryParams.phoneNumber" placeholder="请输入手机号" class="search_select"
                        @keyup.enter.native="handleQuery"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="实名认证状态" prop="realNameAuthenticationStatus">
              <el-select
                v-model="queryParams.realNameAuthenticationStatus"
                placeholder="请选择实名认证状态"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in commonYesOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="会员等级" prop="memberLevel">
              <el-select
                v-model="queryParams.memberLevel"
                placeholder="请选择会员等级"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in gradeOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="会员角色" prop="memberRole">
              <el-select
                v-model="queryParams.memberRole"
                placeholder="请选择会员角色"
                clearable
                size="small"
              >
                <el-option
                  v-for="itme in roleOptions"
                  :key="itme.value"
                  :label="itme.label"
                  :value="itme.value"
                />
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否允许发布广告" prop="allowAdvertising">
              <el-select
                v-model="queryParams.allowAdvertising"
                placeholder="请选择是否允许发布广告"
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
            :data="memberList"
            border
            style="width: 100%"
            :cell-style="cellStyle"
            :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
          >
            <el-table-column
              fixed
              prop="memberId"
              label="会员编号"
              width="150px"
              >
            </el-table-column>
            <el-table-column
              prop="memberName"
              label="会员用户名"
              width="130px"
              >
            </el-table-column>
            <el-table-column
              prop="phoneNumber"
              label="手机号"
              width="130px"
              >
            </el-table-column>
            <el-table-column
              prop="headPortrait"
              label="头像"
              width="130px"
              >
              <template slot-scope="scope">
                <el-popover placement="top-start" trigger="click">
                  <!--trigger属性值：hover、click、focus 和 manual-->
                  <a :href="scope.row.headPortrait" target="_blank" title="查看最大化图片">
                    <img :src="scope.row.headPortrait" style="width: 300px;height: 300px"/>
                  </a>
                  <img v-show="scope.row.headPortrait" slot="reference" :src="scope.row.headPortrait" style="width: 50px;height: 50px; cursor:pointer"/>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="memberLevel"
              label="会员等级"
              width="130px"
              >
            </el-table-column>
            <el-table-column
              prop="transactionNumber"
              label="交易次数"
              width="130px"
              >
            </el-table-column>
            <el-table-column
              prop="realNameAuthenticationStatus"
              label="实名认证状态"
              width="130px"
              >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.realNameAuthenticationStatus == 0 ? 'success': 'danger' ">
                  {{scope.row.realNameAuthenticationStatus == 0 ? '是' : '否'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="authenticationBusinessesStatus"
              label="认证商家状态"
              width="130px"
              >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.authenticationBusinessesStatus == 0 ? 'success': 'danger' ">
                  {{scope.row.authenticationBusinessesStatus === 0 ? '是' : '否'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="allowAdvertising"
              label="是否允许发布广告"
              width="130px"
              >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.allowAdvertising == 0 ? 'success': 'danger' ">
                  {{scope.row.allowAdvertising === 0 ? '允许' : '禁止'}}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="prohibitedTransaction"
              label="是否禁止交易"
              width="130px"
              >
              <template slot-scope="scope">
                <el-tag size="small" :type="scope.row.prohibitedTransaction == 0 ? 'success': 'danger' ">
                  {{scope.row.prohibitedTransaction === 0 ? '允许' : '禁止'}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              prop="param3"
              label="冻结/解封"
              width="130px"
            >
              <template slot-scope="scope">
                <el-tag @click="frozen(scope.row.memberId)" size="small" :type="scope.row.param3 == 0 ? 'success': 'danger' ">
                  {{scope.row.param3 == 0 ? '解封' : '冻结'}}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              prop="inviterId"
              label="邀请id"
              width="130px"
              >
            </el-table-column>
            <el-table-column
              prop="registrationDate"
              label="注册时间"
              :show-overflow-tooltip="true"
              width="130px"
            >
              <template slot-scope="scope">
                <span>{{scope.row.registrationDate | formatDate}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150px"
              >
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row.memberId)" type="text" size="small">升级商户</el-button>
                <el-button @click="thawingClick(scope.row)" type="text" size="small">
                  <el-tag size="small" :type="scope.row.param3 == 0 ? 'success': 'danger' ">
                    {{scope.row.param3 == 0 ? '解封' : '冻结'}}
                  </el-tag>
                </el-button>
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
    <!-- 冻结列表弹框 -->
    <el-dialog title="冻结/解封详情" :visible.sync="dialogFormVisible">
        <div class="frost_box">
            <el-table
              :data="freezeList"
              border
              style="width: 100%"
              :cell-style="frostStyle"
              :header-cell-style="{color: '#515a6e', fontSize: '12px'}"
            >
              <el-table-column
                fixed
                prop="userId"
                label="用户id"
              >
              </el-table-column>
              <el-table-column
                prop="freezeTime"
                label="/冻结/解封时间"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.freezeTime | formatDate}}</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="reason"
                label="原因"
              >
              </el-table-column>

              <el-table-column
                prop="type"
                label="冻结/解封"
              >
                <template slot-scope="scope">
                  <el-tag size="small" :type="scope.row.type == 0 ? 'success': 'danger' ">
                    {{scope.row.type == 0 ? '解封' : '冻结'}}
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column
                prop="operatorId"
                label="操作人"
              >
              </el-table-column>
            </el-table>
        </div>
    </el-dialog>
    <!-- 冻结/解封弹框操作 -->
    <el-dialog title="冻结/解冻操作" :visible.sync="freezeOperation">
      <el-form :model="form">
        <el-form-item label="原因:">
          <el-input type="textarea" v-model="form.reason"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="freezeOperation = false">取 消</el-button>
        <el-button size="small"  type="primary" @click="thawingAffirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { memberList, upgradeSet,freezeList ,addOperation} from '@/api/member/administration'

  export default {
    data() {
      return {
        dialogFormVisible:false,//冻结/解封列表控制弹窗
        freezeOperation:false,//冻结/解冻操作
        total: 0, // 总条数
        queryParams: {// 查询参数
          pageNum: 1,
          pageSize: 100,
          memberName: undefined,//用户名
          phoneNumber: undefined,//手机号
          realNameAuthenticationStatus: undefined,//实名认证状态
          memberLevel: undefined,//会员等级
          memberRole: undefined,//会员角色
          allowAdvertising: undefined,//是否允许发布广告
          prohibitedTransaction: undefined//是否禁止交易
        },
        form:{},//冻结解冻操作表单
        memberList: [],//列表数据
        freezeList: [],//冻结/解冻列表
        commonYesOptions: [{ //通用是/否
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }],
        commonAllowOptions: [{ //通用允许/禁止
          value: '0',
          label: '允许'
        }, {
          value: '1',
          label: '禁止'
        }],
        gradeOptions: [{ //等级
          value: '0',
          label: '0'
        }, {
          value: '1',
          label: '1'
        },
          {
            value: '2',
            label: '2'
          }
          ,
          {
            value: '3',
            label: '3'
          }
          ,
          {
            value: '4',
            label: '4'
          }
          ,
          {
            value: '5',
            label: '5'
          }
          ,
          {
            value: '6',
            label: '6'
          }
          ,
          {
            value: '7',
            label: '7'
          }
          ,
          {
            value: '8',
            label: '8'
          }
          ,
          {
            value: '9',
            label: '9'
          }
        ],
        roleOptions: [{ //角色
          value: '0',
          label: '普通会员'
        }, {
          value: '1',
          label: '承兑商'
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
      handleClick(row) {//升级商户
        upgradeSet({ memberId: row }).then((res) => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.administrationList()
          } else {
            this.$message.error(res.msg)
          }
        })
      },
      //冻结列表
      frozen(val){
        this.dialogFormVisible=true
        freezeList(val).then((res) => {
          if (res.code == 200) {
            this.freezeList=res.rows
          }
        })
      },
      //冻结解冻操作
      thawingClick(row){
        this.freezeOperation=true
        if(row.param3==0){
            this.form.type=1
        }else {
            this.form.type=0
        }
        this.form.userId=row.memberId
      },
      thawingAffirm(){
        this.freezeOperation=false
        addOperation(this.form).then((res) => {
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
        memberList(this.queryParams).then((res) => {
          this.memberList = res.rows
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
        if (row.realNameAuthenticationStatus == 0 && columnIndex == 6) {
          return 'color: #0CB618'
        }else if (row.realNameAuthenticationStatus == 1 && columnIndex == 6) {
          return 'color: #EA1B29'
        }if (row.authenticationBusinessesStatus == 0 && columnIndex == 7) {
          return 'color: #0CB618'
        }else if (row.authenticationBusinessesStatus == 1 && columnIndex == 7) {
          return 'color: #EA1B29'
        }if (row.allowAdvertising == 0 && columnIndex == 8) {
          return 'color: #0CB618'
        }else if (row.allowAdvertising == 1 && columnIndex == 8) {
          return 'color: #EA1B29'
        }if (row.prohibitedTransaction == 0 && columnIndex == 9) {
          return 'color: #0CB618'
        }else if (row.prohibitedTransaction == 1 && columnIndex == 9) {
          return 'color: #EA1B29'
        }if (row.param3 == 0 && columnIndex == 10) {
          return 'color: #0CB618'
        }else if (row.param3 == 1 && columnIndex == 10) {
          return 'color: #EA1B29'
        }
      },
      frostStyle({ row, column, rowIndex, columnIndex }) {
        // 状态列字体颜色
        if (row.type == 0 && columnIndex == 3) {
          return 'color: #0CB618'
        }else if (row.type == 1 && columnIndex ==3) {
          return 'color: #EA1B29'
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
    width: 164px;
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
    padding: 0 0 !important;
  }

  .tab >>> .el-table th.gutter {
    display: table-cell !important
  }

  .page {
    text-align: right;
    padding: 22px 0;
  }
  .frost_box>>> .el-table th > .cell {
    text-align: center;
  }
  .frost_box>>> .el-table .cell {
    text-align: center;
  }
  .frost_box>>> .el-table th.gutter {
    display: table-cell !important
  }
</style>
