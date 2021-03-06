import jsonp from '@/common/js/jsonp';
import {
  commonParams,
  options
} from '@/api/config';

/**
 * jsonp 抓取排行页数据
 * 接口（pc端）：https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg
 * 接口（移动端）：https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
 * 提供方：https://y.qq.com/n/yqq/toplist/4.html
 */
export function getRankList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  let data = Object.assign({}, commonParams, {
    uin: 0,
    format: 'h5',
    needNewCode: 1
  });
  return jsonp(url, data, options);
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';
  const data = Object.assign({}, commonParams, {
    topid,
    platform: 'h5',
    page: 'detail',
    type: 'top',
    tpl: 3,
    needNewCode: 1
  });
  return jsonp(url, data, options);
}
