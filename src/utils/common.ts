import { parse } from 'qs'
import md5 from 'md5'

// 简单判断一个对象是都为空对象（忽略不可枚举属性）
export const isEmptyObject = (obj: Record<string, any>): boolean => {
  if (!obj) return true
  return obj && Object.keys(obj).length === 0
}

// 获取 url 参数对象
export const getSearchParams = (search: string) => parse(search, { ignoreQueryPrefix: true })

// 获取请求参数的字符串形式
export const getSignString = (url: string, body: Record<string, any>) => {
  const keys = Object.keys(body).sort()
  const newArgs: Record<string, any>= {}
  let bodyString = url
  keys.forEach(key => {
    newArgs[key.toLowerCase()] = body[key]
  })
  for (const k in newArgs) {
    if (newArgs.hasOwnProperty(k)) {
      bodyString += `&${k}=${newArgs[k]}`
    }
  }

  return bodyString.substr(1)
}

// 根据接口请求body计算签名
export function getSign(url: string, body = {}) {
  return md5(getSignString(url, body))
}
/**
 * 验证数据类型。此方法作为最后一个可选择的判断数据类型的方法：
 * 比如对于字符串，可直接 typeof value === 'string'
 * 对于数组，可直接 Array.isArray(value)
 * @param value 任何数据
 */
function typeOf(value: any) {
  const maps = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Symbol]': 'symbol',
    '[object Set]': 'set',
    '[object Map]': 'map'
  }
  return maps[Object.prototype.toString.call(value)] as string
}

export { typeOf }


