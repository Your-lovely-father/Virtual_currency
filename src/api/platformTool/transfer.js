/*
    author: ZhiYuanWang
    describe：平台工具信息记录接口
    time: 2020-31-20 10:31:48
*/
import Axios from 'axios'
//转账交易
const instance = Axios.create();
instance.defaults.baseURL = process.env.VUE_APP_BASE_API;
export function transferAdd(query) {
  return instance({
    url: '/api/v1/transfer/to',
    method: 'get',
    params: query,
  })
}
