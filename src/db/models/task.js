const mongoose = require("../config")
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    }
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