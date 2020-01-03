import * as Koa from 'koa'
import { get, post } from '../utils/route-decorate'
import { validation, guard, middlewares } from '../middleware'

const users = [{ name: 'tom', age: 20 }, { name: 'tom', age: 20 }]

@middlewares([guard])
export default class User {
  @get('/users', {
    middlewares: [validation]
  })
  public list(ctx: Koa.Context) {
    ctx.body = {
      ok: 1,
      data: users
    }
  }

  @post('/users')
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body)
    ctx.body = { ok: 1 }
  }
}
