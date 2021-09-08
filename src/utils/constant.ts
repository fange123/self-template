export const MS_LOGIN_TOKEN = 'my_token'
export interface IMapItem {
  label: string
  value: string | number
  key?: string | number
}

type ExtractValue<T, K> = T extends { value: K; label: infer R } ? R : never
type ExtractLabel<T, K> = T extends { value: infer R; label: K } ? R : never

export const genMapObject = <T extends Readonly<IMapItem[]>>(originData: T) => {
  type IMapValue = {
    [TK in T[number]['value']]: ExtractValue<T[number], TK>
  }
  type IMapLabel = {
    [TK in T[number]['label']]: ExtractLabel<T[number], TK>
  }
  const valueObject: IMapValue = Object.create(null)
  const labelObject: IMapLabel = Object.create(null)
  originData.forEach(item => {
    // eslint-disable-next-line prettier/prettier
    valueObject[item.value as T[number]['value']] = item.label as ExtractValue<T[number], T[number]['value']>
    // eslint-disable-next-line prettier/prettier
    labelObject[item.label as T[number]['label']] = item.value as ExtractLabel<T[number], T[number]['label']>
  })
  return { ...valueObject, ...labelObject}
}

// example
export const MAP_LEVELS = [
  { label: '一般', value: 'custom' },
  { label: '低危', value: 'low' },
  { label: '中危', value: 'middle' },
  { label: '高危', value: 'high' },
  { label: '严重', value: 'serious' }
]

export const MAP_MAP_LEVELS = genMapObject(MAP_LEVELS)
export type T_MAP_MAP_LEVELS = keyof typeof MAP_MAP_LEVELS
// role
export const MAP_Role = [
  { label: '管理员', value: 'admin' },
  { label: '安全人员', value: 'security' },
  { label: '项目经理', value: 'manager' },
  { label: '审计人员', value: 'auditor' }
]

export const MAP_MAP_Role = genMapObject(MAP_Role)
export type T_MAP_MAP_Role = keyof typeof MAP_MAP_Role

export const REPORT_STATUS = [
  { label: '正在生成', value: 1 },
  { label: '已完成', value: 2 },
  { label: '生成失败', value: 3 }
]

export const MAP_REPORT_STATUS = genMapObject(REPORT_STATUS)
export type T_MAP_REPORT_STATUS = keyof typeof MAP_REPORT_STATUS
