const mongoose = require("../config")
const taskSchema = new mongoose.Schema({
    name: String,
    isDone: Boolean
})
taskSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task