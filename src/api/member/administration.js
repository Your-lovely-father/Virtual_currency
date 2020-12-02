/*
    author: ZhiYuanWang
    describe：会员管理接口
    time: 2020-30-20 10:30:03
*/
import request from '@/utils/request';
//查询会员信息列表
export function memberList(query) {
  return request({
    url: '/member/member/list',
    method: 'get',
    params: query
  })
}
//升级商户
export function upgradeSet(query) {
  return request({
    url: '/member/member/upgradeToMerchant',
    method: 'put',
    params: query
  })
}
//冻结/解封列表
export function freezeList(userId) {
  return request({
    url: '/member/freeze/userId/'+userId,
    method: 'get',
  })
}
//冻结解冻操作
export function addOperation(data) {
  return request({
    url: '/member/freeze/addUnsealOrFreeze',
    method: 'post',
    data: data
  })
}
