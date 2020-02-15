import Router from 'koa-router'

import { findUsers } from './controllers/Users'
import serverRenderer from './serverRenderer'

const { APP_API_PREFIX } = process.env

const router = new Router()

router
  .post(`${APP_API_PREFIX}/users`, findUsers)
  .get('/*', serverRenderer)

export default router
