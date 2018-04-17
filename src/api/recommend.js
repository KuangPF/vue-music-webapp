import jsonp from '@/common/js/jsonp';
import axios from 'axios';
import {
  commonParams,
  opts
} from '@/api/common-query.js';
/**
 * jsonp 抓取推荐页轮播图数据
 * 接口：https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg
 */

export function getRecommend() {
  let url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  let data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });
  return jsonp(url, data, opts);
}

export function getList() {
  let url = '/api/getList';
  let data = Object.assign({}, commonParams, {
    rnd: Math.random(),
    hostUin: 0,
    format: 'json',
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  });
  /* eslint-disable*/
  return axios.get(url, {
      params: data
    })
    .then(function (response) {
      return Promise.resolve(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
