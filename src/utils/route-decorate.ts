import * as glob from 'glob'
import * as Koa from 'koa'
import * as KoaRouter from 'koa-router'

type HTTPMethod = 'get' | 'put' | 'del' | 'post' | 'patch'

type LoadOptions = {
  /**
  * 路由文件扩展名，默认值是`.{js,ts}` 
  */
  extname?: string;
}

type RouteOptions = {
  /**
  * 适用于某个请求比较特殊，需要单独制定前缀的情形
  */
  prefix?: string;
  /**
  * 给当前路由添加一个或多个中间件
  */
  middlewares?: Array<Koa.Middleware>;
}

const router = new KoaRouter()

const decorate = (method: HTTPMethod, path: string, options: RouteOptions ={}, router: KoaRouter) => {
  return (target, property: string) => {
    // 装饰器的正常执行顺序：先执行方法装饰器，后执行类装饰器
    // 用process.nextTick的原因是：想让类装饰器先执行，方法装饰器后执行
    process.nextTick(() => {
      // 添加中间件数组
      const middlewares = []

      // 类装饰器传入的中间件
      if (target.middlewares) {
        middlewares.push(...target.middlewares)
      }

      // 若设置了中间件选项则加入到中间件数组
      if (options.middlewares) {
        middlewares.push(...options.middlewares);
      }
      // 添加路由处理器
      middlewares.push(target[property])
      const url = options.prefix ? options.prefix + path : path
      // router[method](url, target[property])
      router[method](url, ...middlewares)
    })
  }
}

const method = method => (path: string, options?: RouteOptions) => decorate(method, path, options, router)

export const get = method('get')
export const post = method('post')
export const put = method('put')
export const del = method('del')
export const patch = method('patch')

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || '.{js,ts}'
  glob.sync(require('path').join(folder, `./**/*${extname}`)).forEach((item) => require(item))
  return router
}