const express = require("express");
const morgan = require("morgan")
const logger = require("./utils/logger")
const app = express()

let todoList = [
    {
        id: 1,
        name: "clean the rooms",
        isDone: false
    },
    {
        id: 2,
        name: "take out the trash",
        isDone: false
    },
    {
        id: 3,
        name: "buy groceries",
        isDone: false
    }
]
app.use(express.json())

app.use(logger)
app.get("/", (req, res) => {
    res.send("<h1>Todo app</h1>")
})
app.get("/api/tasks", (req, res) => {
    res.json(todoList)
})
app.post("/api/tasks", (req, res) => {
    const { name } = req.body
    if(!name) {
        return res.status(400).json({
            error: "task name is missing"
        })
    }
    const maxId = todoList.length == 0 ? 0 : todoList.length
    const newTask = { name, id: maxId + 1, isDone: false}
    todoList = todoList.concat(newTask)
    res.json(newTask)
})
app.get("/api/tasks/:id", (req, res) => {
    const { id } = req.params
    const task = todoList.find(el => el.id === Number(id))
    if(task) {
        res.json(task)
    } else {
        res.status(404).end()
    }
})
app.delete("/api/tasks/:id", (req, res) => {
    const { id } = req.params
    const tasks = todoList.filter(el => el.id !== Number(id))
    todoList = tasks
    res.status(204).end()
})

app.listen(3045, () => {
    console.log("listening to port 3045");
})