import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios'
export  function getSingeList() {
  const url='https://szc.y.qq.com/v8/fcg-bin/v8.fcg'
  const data=Object.assign({},commonParams,{
    channel:"singer",
    page:"list",
    key:"all_all_all",
    pagesize:100,
    pagenum:1,
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    platform:"yqq",
    needNewCode:0
  })
  return jsonp(url,data,options)
}


  export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonParams, {
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      order: 'listen',
      begin: 0,
      num: 100,
      songstatus: 1,
      g_tk:5381,
      singermid: singerId
    })

    return jsonp(url, data, options)
  }

