import Router from 'koa-router'

import { apiPrefix } from '@config/settings'
import { findUsers } from './controllers/Users'
import serverRenderer from './serverRenderer'

const router = new Router()

router
  .post(`${apiPrefix}/users`, findUsers)
  .get('/*', serverRenderer)

export default router
