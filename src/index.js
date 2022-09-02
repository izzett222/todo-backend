const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const logger = require("./utils/logger")
const { getAllLists, createList, newListTask, changeTitle } = require("./services/tasks")
const errorHandler = require("./utils/errorHandler");
const { encrypt, compare } = require("./utils/encryptPassword");
const { createUser, getUserByName } = require("./services/user");
const { create } = require("./utils/jwt");
const { isUserSignedUp } = require("./middlewares/authenticate")
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())

app.use(logger)
app.get("/", (req, res) => {
    res.send("<h1>Todo app</h1>")
})
app.get("/api/lists", isUserSignedUp, async (req, res) => {
    const { user } = req;
    const lists = await getAllLists(user)
    res.json(lists)
})
app.post("/api/lists", isUserSignedUp, async (req, res) => {
    const { user } = req;
    const newList = await createList(user, req.body.title)
    res.json(newList)
})
app.post("/api/lists/:id",isUserSignedUp, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const  { user } = req
    const task = await newListTask(user, id, name);
    res.json(task);
})
app.put('/api/lists/:id',isUserSignedUp, async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const { user } = req;
    await changeTitle(user, id, title)
    res.json({ message: 'updated successfully' })
})
app.post('/api/users/signup', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = encrypt(password)
    try {
        const newUser = await createUser(username, hashedPassword)
        res.status(201).json({
            message: 'user created successfully',
            user: { username: newUser.username },
            token: create(username)
        })
    } catch (error) {
        return res.status(409).json({ message: `user with username: '${username}' already exist` })
    }
})
app.post('/api/users/login', async (req, res) => {
    const { username, password} = req.body;
    const user = await getUserByName(username)
    if(!user) {
        return res.status(400).json({ message: 'wrong password or username'})
    }
    const doesPasswordMatch = compare(password, user.password)
    if(!doesPasswordMatch) {
        return res.status(400).json({ message: 'wrong password or username'})
    }
    res.status(200).json({
        message: 'user logged successfully',
        user: { username: user.username },
        token: create(username)
    })
})
app.use(errorHandler)
const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
