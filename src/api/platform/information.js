/*
    author: ZhiYuanWang
    describe：平台交易信息记录接口
    time: 2020-31-20 10:31:48
*/
import request from '@/utils/request';
//钱包交易记录列表
export function platformWalletList(query) {
  return request({
    url: '/platform/platformTrade/list',
    method: 'get',
    params: query
  })
}
