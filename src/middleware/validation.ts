import Koa from 'koa'

//异步校验接口 
const api = {
  findByName(name) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name === 'guo') {
          reject('用户名已存在') 
        } else {
          resolve() 
        }
      }, 500)
    })
  } 
}

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
  const name = ctx.request.body.name
  // 用户名必填
  if (!name) {
    throw '请输入用户名'
  }
  // 用户名不能重复
  try {
    await api.findByName(name)
    // 校验通过
    await next()
  } catch (error) {
    throw error
  }
}