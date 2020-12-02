/*
    author: ZhiYuanWang
    describe：实名管理接口
    time: 2020-30-20 10:30:41
*/
import request from '@/utils/request';

//查询会员审核信息列表
export function memberAuditList(query) {
  return request({
    url: '/member/audit/list',
    method: 'get',
    params: query
  })
}
// 通过审核驳回审核
export function memberApply(query) {
  return request({
    url: '/member/audit/audit',
    method: 'post',
    params: query
  })
}
