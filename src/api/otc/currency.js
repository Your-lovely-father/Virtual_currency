/*
    author: ZhiYuanWang
    describe：币种管理接口
    time: 2020-32-20 10:32:32
*/
import request from '@/utils/request';
//查询币种信息列表
export function otcCurrencyList(query) {
  return request({
    url: '/coin/coin/list',
    method: 'get',
    params: query
  })
}
//币种删除
export function delCurrency(coinIds) {
  return request({
    url: '/coin/coin/' + coinIds,
    method: 'delete'
  })
}
//币种添加
export function addCurrency(data) {
  return request({
    url: '/coin/coin',
    method: 'post',
    data: data
  })
}
