// 防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。假如我们设置了一个等待时间 3 秒的函数，在这 3 秒内如果遇到函数调用请求就重新计时 3 秒，直至新的 3 秒内没有函数调用请求，此时执行函数，不然就以此类推重新计时。

export const debounce = (func, wait, options) => {
  let lastArgs, // 上一次执行 debounced 的 arguments
    lastThis, // 保存上一次 this
    maxWait, // 最大等待时间，数据来源于 options，实现节流效果，保证大于一定时间后一定能执行
    result, // 函数 func 执行后的返回值，多次触发但未满足执行 func 条件时，返回 result
    timerId, // setTimeout 生成的定时器句柄
    lastCallTime; // 上一次调用 debounce 的时间

  let lastInvokeTime = 0; // 上一次执行 func 的时间，配合 maxWait 多用于节流相关
  let leading = false; // 是否响应事件刚开始的那次回调，即第一次触发，false 时忽略
  let maxing = false; // 是否有最大等待时间，配合 maxWait 多用于节流相关
  let trailing = true; // 是否响应事件结束后的那次回调，即最后一次触发，false 时忽略

  // 判断是否为函数
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (options) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  const invokeFunc = (time) => {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  const leadingEdge = (time) => {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  const remainingWait = (time) => {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const result = wait - timeSinceLastCall;
    return maxing ? Math.min(result, maxWait - timeSinceLastInvoke) : result;
  }
  const shouldInvoke = (time) => {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
               (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }
  const timerExpired = () => {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  const trailingEdge = (time) => {
    timerId = undefined;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }
  const cancel = () => {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }
  const flush = () => {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }
  const debounced = (...args) => {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

export default debounce;
