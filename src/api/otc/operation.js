/*
    author: ZhiYuanWang
    describe：操作订单接口
    time: 2020-32-20 10:32:32
*/
import request from '@/utils/request';
//操作订单
export function operation(ctcOrderId) {
  return request({
    url: '/order/order/' + ctcOrderId,
    method: 'get',
  })
}
