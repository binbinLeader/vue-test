/**
 * 防抖动工具类
 * @param func
 * @param delay
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log(func)
      func.apply(this, args)
    }, delay)
  }
}

