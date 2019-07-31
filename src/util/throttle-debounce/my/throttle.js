/**
 * throttle -- 函数节流
 */

// 时间戳方法 不能调用最后一次
const throttle = (fn, wait = 100) => {
  console.log('init');
  let previous = 0;
  return function(...args) {
    // console.log(this);
    // console.log(args);
    let now = +new Date();
    if (now - previous >= wait) {
      previous = now;
      fn.apply(this, args);
    }
  }
}

// 定时器 无首次调用
export const throttleTimeOut = (fn, wait = 100) => {
  let timer = null;
  return function(...args) {
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
      }, wait);
    }
  }
}

export default throttle;
