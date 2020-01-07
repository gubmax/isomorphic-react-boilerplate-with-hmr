import Router from 'koa-router'

import { findUsers } from './controllers/Users'
import serverRenderer from './serverRenderer'

const router = new Router()

router
  .post('/users', findUsers)
  .get('/*', serverRenderer)

export default router
