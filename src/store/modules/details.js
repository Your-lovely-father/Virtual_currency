import Cookies from 'js-cookie'
const state = {
  advertiseId:undefined,
  memberWalletId:undefined,
  platformWalletId:undefined,
  operationId:Cookies.get('operationId')
}
const mutations = {
  detailsFn: ((state, data) => {
    state.advertiseId = data
  }),
  resetFn: ((state, data) => {
    state.advertiseId = data
  }),
  recordFn: ((state, data) => {
    state.memberWalletId = data
  }),
  recordResetFn: ((state, data) => {
    state.memberWalletId = data
  }),
  tradingTradingFn:((state,data)=>{
    state.platformWalletId = data
  }),
  tradingResetFn:((state,data)=>{
    state.platformWalletId = data
  }),
  operationFn:((state,data)=>{
    state.operationId = data
    Cookies.set('operationId',  state.operationId = data)
  })
}
export default {
  state,
  mutations,
}
