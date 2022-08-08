const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const logger = require("./utils/logger")
const { getAllTasks, getSingleTask, addNewTask, deleteTask, getAllLists,createList, newListTask } = require("./services/tasks")
const errorHandler = require("./utils/errorHandler")
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use(logger)
app.get("/", (req, res) => {
    res.send("<h1>Todo app</h1>")
})
app.get("/api/lists", async (req, res) => {
    const lists = await getAllLists()
     res.json(lists)
})
app.post("/api/lists", async (req, res) => {
    const newList = await createList(req.body.title)
    res.json(newList)
})
app.post("/api/lists/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const task = await newListTask(id, name);
    res.json(task);
})
app.use(errorHandler)
const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
