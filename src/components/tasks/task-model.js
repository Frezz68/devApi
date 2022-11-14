import mongoose from "mongoose";

const { Schema } = mongoose

const taskSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    doDate: {
        type: Date,
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)


/*Task.create({
    task: 'Finir l\'api',
    description: 'Dev toute les methode de task',
    doDate: 1000
})*/
const findAll = async () => {
    const tasks = await Task.find({})
    console.log("FIND ALL ==================================",tasks)
}

const findById = async (id) => {
    const tasks = await Task.findById(id)
    console.log("FIND BY ID ==================================",tasks)
}
const updateById = async (id,task) => {
    const tasks = await Task.findByIdAndUpdate(id,{task: task},{runValidators: true,new: true})
    console.log("UPDATE BY ID ==================================",tasks)
}
const deleteById = async (id) =>{
    const task = await Task.findByIdAndDelete(id)
}
const insertOne = async (obj) => {
    const task = await Task.insertOne(obj)
    console.log("UPDATE BY ID ==================================",task)
}

export default Task