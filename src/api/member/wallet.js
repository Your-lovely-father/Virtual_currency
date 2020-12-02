/*
    author: ZhiYuanWang
    describe：钱包管理接口
    time: 2020-31-20 10:31:16
*/
import request from '@/utils/request';

//查询钱包列表
export function memberWalletList(query) {
  return request({
    url: '/member/wallet/list',
    method: 'get',
    params: query
  })
}
//查询币种信息列表
export function memberCurrencyList() {
  return request({
    url:'/coin/coin/list',
    method: 'get',
  })
}
