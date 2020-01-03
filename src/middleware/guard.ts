import Koa from 'koa'

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
  if(ctx.header.token) {
      await next()
  } else {
    throw "请登录"
  }
}