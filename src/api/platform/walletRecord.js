/*
    author: ZhiYuanWang
    describe：平台交易钱包记录接口
    time: 2020-31-20 10:31:48
*/
import request from '@/utils/request';
//查询承兑商广告列表
export function platformInformationList(query) {
  return request({
    url: '/platform/platformWallet/list',
    method: 'get',
    params: query
  })
}
//创建交易信息
export function addInformation(data) {
  return request({
    url: '/platform/platformWallet',
    method: 'post',
    data: data
  })
}
//修改
export function updInformation(data) {
  return request({
    url: '/platform/platformWallet',
    method: 'put',
    data: data
  })
}
//资产列表
export function assetInformationList(query) {
  return request({
    url: '/platform/platformToken/list',
    method: 'get',
    params: query
  })
}
