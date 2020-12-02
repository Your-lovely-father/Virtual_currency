import request from '@/utils/request'

// 获取路由信息
export const getRouters = () => {
  return request({
    url: '/getRouters',
    method: 'get'
  })
};