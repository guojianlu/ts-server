import * as Koa from 'koa'
import { get } from '../utils/route-decorate'

export default class User {
  @get('/')
  public index(ctx: Koa.Context) {
    ctx.body = '首页'
  }
}
