import * as CryptoJS from "crypto-js";

// 动态加载style
export function loadStyle(url: string) {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len: number, date?: boolean) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len || 4);
  if (date) random = random + Date.now();
  return random;
};

/**
 *加密处理
 */
export const encryption = <T>(params: any): T => {
  let { data, type, param, key } = params;
  const result = JSON.parse(JSON.stringify(data));
  if (type === "Base64") {
    param.forEach((ele: string) => {
      result[ele] = btoa(result[ele]);
    });
  } else {
    param.forEach((ele: string) => {
      var data = result[ele];
      key = CryptoJS.enc.Latin1.parse(key);
      var iv = key;
      // 加密
      var encrypted = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
      });
      result[ele] = encrypted.toString();
    });
  }
  return result;
};


// 表单序列化
export const serialize = (data: Record<string, string>) => {
  let list: string[] = [];
  Object.keys(data).forEach(ele => {
    list.push(`${ele}=${data[ele]}`);
  });
  return list.join("&");
};

/**设置网页全屏 */
var document: any = window.document;
// 展开/全屏
export function requestFullScreen(element: any) {
  var document: any = window.document;
  var requestMethod = element.requestFullscreen || element.webkitRequestFullscreen || element.msRequestFullscreen || element.mozRequestFullScreen;
  if (requestMethod) {
    requestMethod.call(element);
  }
}
// 退出/全屏
export function exitFullScreen() {
  var exitMethod = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen;
  if (exitMethod) {
    exitMethod.call(document);
  }
}
// 判断是否全屏
export function isFullscreenElement() {
  var isFull = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement;
  return !!isFull;
}