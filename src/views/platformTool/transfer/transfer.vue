<template>
  <div class="transfer">
      <el-form ref="form" :model="form" label-width="180px">
        <el-form-item label="发送者地址" prop="fromAddress">
          <el-input v-model="form.fromAddress" placeholder="请输入发送者地址" class="int"></el-input>
        </el-form-item>
        <el-form-item label="私钥" prop="priKey">
          <el-input v-model="form.priKey" placeholder="请输入私钥" class="int"></el-input>
        </el-form-item>
        <el-form-item label="转账者地址" prop="toAddress">
          <el-input v-model="form.toAddress" placeholder="请输入转账者地址" class="int"></el-input>
        </el-form-item>
        <el-form-item label="交易金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入交易金额" class="int"></el-input>
        </el-form-item>
        <el-form-item label="货币编号" prop="tokenId">
          <el-input v-model="form.tokenId" placeholder="请输入货币编号" class="int"></el-input>
        </el-form-item>
          <el-form-item label="合约类型">
            <el-select v-model="form.tronType" placeholder="请选择合约类型" class="select_"   @change="$forceUpdate()">
              <el-option v-for="dict in contractOptions" :key="dict.value" :label="dict.label"
                         :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <div class="tow">
            <el-form-item label="是否为主网">
              <el-switch
                v-model="form.isMainnet"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="true"
                inactive-value="false">
              </el-switch>
            </el-form-item>
            <div class="btn">
              <el-button type="primary" size="mini" @click="transferAdd">发送</el-button>
            </div>
          </div>
        <div class="code_data">
            <p>响应结果: <span>{{code}}</span> </p>
            <p>{{codeContent}}</p>
        </div>
      </el-form>
  </div>
</template>

<script>
import { transferAdd } from '@/api/platformTool/transfer'
export default {
  data() {
    return {
      form: {
        tronType:'TRC20合约'
      },// add表单参数
      codeContent:undefined,//code返回值
      code:undefined,//code值
      contractOptions: [//合约类型
        {
          value: '10',
          label: 'TRC10合约'
        },
        {
          value: '20',
          label: 'TRC20合约'
        },
      ],
      tronType:'TRC20合约'
    }
  },
  methods: {
    transferAdd() {
      let copy={...this.form}//解构赋值不修改原来数据
      if(this.form.tronType=='TRC20合约'){
        copy.tronType=20
      }
      transferAdd(copy).then((res) => {
        let result = res.data;
        this.codeContent = result;
        this.code=result.code;
        if(res.data.code==200){
          this.$message.success(result.msg)
        }else {
          this.$message.error(result.msg)
        }
      })
    }
  },
}
</script>

<style scoped>
.transfer{
  padding: 20px;
  box-sizing: border-box;
}
.tow{
  display: flex;
}
.btn{
  margin-left: 73px;
  margin-top: 4px;
}
.code_data{
  width: 80%;padding-left: 7.5%
}
.code_data>p:nth-child(1){
  font-size: 16px;color: #606266;
  font-weight: bold;
}
.code_data>p:nth-child(2){
  background: #e6ebf5;
  width: 100%;
  border-radius: 10px;
  padding:30px 20px;box-sizing: border-box
}

</style>
