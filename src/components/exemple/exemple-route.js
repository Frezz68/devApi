import Router from '@koa/router'
import * as ExempleControllers from '#components/exemple/exemple-controllers.js'

const exemples = new Router()

exemples.get('/', ExempleControllers.index)


exemples.post('/', ExempleControllers.create)

export default exemples