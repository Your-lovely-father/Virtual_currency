/*
    author: ZhiYuanWang
    describe：订单记录接口
    time: 2020-30-20 10:30:41
*/
import request from '@/utils/request';

//交易记录列表
export function memberRecordList(query) {
  return request({
    url:'/member/record/list',
    method: 'get',
    params: query
  })
}
