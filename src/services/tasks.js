const Task = require("../db/models/task")

const getAllTasks = () => {
    return Task.find({})
}
const getSingleTask = (id) => {
    return Task.findById(id)
}
const addNewTask = (name) => {
    const newTask = new Task({ name, isDone: false })
    return newTask.save()
}
const deleteTask = (id) => {
    return Task.findByIdAndDelete(id)
}

module.exports = { getAllTasks, getSingleTask, addNewTask, deleteTask }