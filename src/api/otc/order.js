/*
    author: ZhiYuanWang
    describe：CTC订单管理接口
    time: 2020-32-20 10:32:56
*/
import request from '@/utils/request';
//查询广告CTC订单列表
export function otcCtcList(query) {
  return request({
    url: '/order/order/list',
    method: 'get',
    params: query
  })
}
