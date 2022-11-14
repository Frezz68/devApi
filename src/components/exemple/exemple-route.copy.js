import Router from '@koa/router'
import * as ExempleControllers from '#components/exemple/exemple-controllers.js'

const exemples = new Router()

exemples.get('/controllers')

const todos = [
    {
        id: 1,
        title: 'Acheter des patates'
    },
    {
        id: 2,
        title: 'Acheter des pommes'
    },
    {
        id: 3,
        title: 'Acheter des poires'
    }
]

exemples.get('/', (ctx, next) =>{
    ctx.body = todos
})

exemples.get('/:id', (ctx)=>{
    ctx.body = todos.find(element => element.id == ctx.params.id)
})

exemples.post('/',(ctx)=>{
    const newTask = {
        id: todos.length+1,
        title: ctx.request.body.title
    }
    todos.push(newTask)
    console.log(todos)
    ctx.status = 202
})

exemples.put('/:id', (ctx)=>{
    const task = todos.find(element => element.id == ctx.params.id)
    task.title = 'modifie'
    ctx.body = todos
})

exemples.delete('/:id', (ctx)=>{
    const updatedTodos = todos.filter(t=> t.id != ctx.params.id)
    ctx.body = updatedTodos
})

export default exemples