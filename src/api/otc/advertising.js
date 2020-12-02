/*
    author: ZhiYuanWang
    describe：广告大厅接口
    time: 2020-31-20 10:31:48
*/
import request from '@/utils/request';
//查询承兑商广告列表
export function otcAdvertisingList(query) {
  return request({
    url: '/order/advertise/list',
    method: 'get',
    params: query
  })
}
