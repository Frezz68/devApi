import Router from '@koa/router'
import * as TaskControllers from '#components/tasks/task-controllers.js'

const tasks = new Router()

tasks.get('/', TaskControllers.index)
.get('/:id', TaskControllers.findOne)
.put('/:id', TaskControllers.updateOne)
.delete('/:id', TaskControllers.deleteOne)
.post('/', TaskControllers.create)

export default tasks