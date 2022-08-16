const { Task, List } = require("../database/models")
const getAllTasks = () => {
    return Task.findAll()
}
const getSingleTask = (id) => {
    return Task.findByPk(id)
}
const addNewTask = (name) => {
    return Task.create({ name })
}
const deleteTask = (id) => {
    return Task.destroy({ where: id })
}
const getAllLists = () => {
    return List.findAll({ include: { model: Task, separate: true, order: [['createdAt', 'desc']] },  order: [['createdAt', 'desc']] })
}
const createList = (title) => {
    return List.create({ title })
}
const newListTask = async (listId, name) => {
    const list = await List.findByPk(listId);
    return list.createTask({ name })
}
const changeTitle = (listId, title) => {
    return List.update({ title }, { where: { id: listId }})
}

module.exports = { getAllTasks, getSingleTask, addNewTask, deleteTask, getAllLists, createList, newListTask, changeTitle }