import Task from '#components/tasks/task-model.js'
import Joi from 'joi'

export async function index( ctx){
    try{
        ctx.body = await Task.find({})
    }catch(e){
        ctx.badRequest({message: e.message})
    }
}
export async function create (ctx){
    try{
        const taskValidationSchema = Joi.object({
            task: Joi.string().required(),
            description: Joi.string()
        })

        const { error } = taskValidationSchema.validate(ctx.request.body)

        if ( error) throw new Error(error)
        let taskObj = ctx.request.body
        taskObj.doDate = Date.now();
        Task.create(taskObj)
    }catch(e){
        ctx.badRequest({message: e.message})
    }
}
export async function deleteOne(ctx) {
    try {
        await Task.findOneAndRemove(ctx.params.id)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function findOne(ctx) {
    try {
        ctx.body = await Task.findById(ctx.params.id)
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}

export async function updateOne(ctx) {
    try {
        console.log(ctx.params.id)
        await Task.findOneAndUpdate(ctx.params.id, ctx.request.body)
        ctx.status = 204
    } catch (e) {
        ctx.badRequest({message : e.message})
    }
}