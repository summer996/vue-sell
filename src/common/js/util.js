/*
* 解析url参数
* @example ?id=123&a=b
* @return Object {id: 123,a:b}
* */

export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let reg = /[?&][^?&]+=[^?&]+/g; // [?&]匹配的是?[^?&]匹配的是不是？&的字符即id，+表示连接=匹配id=的=，[^?&]匹配不是?&的字符即123,最后一个+表示多次的意思
  let arr = url.match(reg);
  // ['?id=12345','&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}
