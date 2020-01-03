import * as Koa from 'koa'
import * as bodifiy from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'

const app = new Koa()

app.use(timing())

app.use(serve(`${__dirname}/public`))

app.use(bodifiy())

// app.use((ctx: Koa.Context) => {
//   ctx.body = 'Hello Ts'
// })

import { load } from './utils/route-decorate'
import { resolve } from 'path'
const router = load(resolve(__dirname, './routes'))
app.use(router.routes())

app.listen(3000, () => {
  console.log('server is running at 3000 port')
})
