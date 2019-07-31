import debounce from './debounce.js'

export const throttle = (func, wait, options) => {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  if (options) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  })
}

export default throttle
