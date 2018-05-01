import jsonp from '@/common/js/jsonp';
import {
  commonParams,
  options
} from '@/api/config';

/**
 * jsonp 抓取歌手页数据
 * 接口：https://c.y.qq.com/v8/fcg-bin/v8.fcg
 */
export function getSingerList() {
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
  let data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 1576475597,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  });
  return jsonp(url, data, options);
}
