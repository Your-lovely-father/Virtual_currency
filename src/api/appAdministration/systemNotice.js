/*
    author: ZhiYuanWang
    describe:App管理接口
    time: 2020-32-20 10:32:32
*/
import request from '@/utils/request';
//app管理查询列表
export function appList(query) {
  return request({
    url: '/app/appNotice/list',
    method: 'get',
    params: query
  })
}
//app管理删除
export function appDel(appNoticeIds) {
  return request({
    url: '/app/appNotice/' + appNoticeIds,
    method: 'delete'
  })
}
//app管理添加
export function appAdd(data) {
  return request({
    url: '/app/appNotice',
    method: 'post',
    data: data
  })
}
