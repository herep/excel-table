import axios from 'axios';
// let base = 'http://127.0.0.1:8081';
let base = '';

//获取列表-消息信息列表
export const fGMessageGetList = params => {
  return axios.post(`${base}/efoApi/efo/fGMessageGetList`, params).then(res => res.data);
}

//修改信息-消息信息列表
export const fGMessageUp = params => {
  return axios.post(`${base}/efoApi/efo/fGMessageUp`, params).then(res => res.data);
}

//创建信息-消息信息列表
export const fGMessageCreate = params => {
  return axios.post(`${base}/efoApi/efo/fGMessageCreate`, params).then(res => res.data);
}

//备注车型 - 推单发货
export const fGMessageSendOrder = params => {
  return axios.post(`${base}/edoApi/edo/sendOrder`, params).then(res => res.data);
}

//修改备注 -- 打单备注
export const fGMessageBatchUpdateStarAndRemark = params => {
  return axios.post(`${base}/eoApi/egO/batchUpdateStarAndRemark`, params).then(res => res.data);
}

//获取列表-回访电话列表
export const HFOrderGetList = params => {
  return axios.post(`${base}/edoApi/edo/OrderBySellerMemoAndOrderStatusList`, params).then(res => res.data);
}

//修改列表-回访电话列表
export const HFOrderUpdate = params => {
  return axios.post(`${base}/edoApi/edo/UpSellerFlagTagOrOrderId`, params).then(res => res.data);
}

//修改列表-回访电话列表 - 分配
export const UpGroupHandleOrOrderArr = params => {
  return axios.post(`${base}/edoApi/edo/upGroupHandleOrOrderArr`, params).then(res => res.data);
}
