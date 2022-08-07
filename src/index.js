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
// app.get("/api/tasks", async (req, res) => {
//     const tasks = await getAllTasks()
//      res.json(tasks)
// })
app.get("/api/lists", async (req, res) => {
    const lists = await getAllLists()
     res.json(lists)
})
app.post("/api/lists", async (req, res) => {
    const newList = await createList(req.body.title)
    res.json(newList)
})
// app.post("/api/tasks", async (req, res) => {
//     const { name } = req.body
//     if(!name) {
//         return res.status(400).json({
//             error: "task name is missing"
//         })
//     }
//     const newTask = await addNewTask(name)
//     res.json(newTask)
// })
app.post("/api/lists/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const task = await newListTask(id, name);
    res.json(task);
})
// app.get("/api/tasks/:id", async (req, res, next) => {
//     const { id } = req.params
//     try {
//         const task = await getSingleTask(id)
//         if(task) {
//             res.json(task)
//         } else {
//             res.status(404).end()
//         }
        
//     } catch(error) {
//         next(error)
//     }
// })
// app.delete("/api/tasks/:id", async (req, res, next) => {
//     const { id } = req.params
//     try {
//         await deleteTask(id)
//         return res.status(204).end()
//     } catch(error)  {
//         next(error) 
//     }
// })
app.use(errorHandler)
const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
