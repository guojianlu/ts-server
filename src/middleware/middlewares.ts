import Koa from 'koa'

export default (middlewares: Koa.Middleware[]) => {
  return (target) => {
    target.prototype.middlewares = middlewares
  }
}