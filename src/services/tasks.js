const { Task, List } = require("../database/models")

const getAllLists = (user) => {
    return user.getLists({ include: { model: Task, separate: true, order: [['createdAt', 'desc']] },  order: [['createdAt', 'desc']] })
    //return List.findAll({ include: { model: Task, separate: true, order: [['createdAt', 'desc']] },  order: [['createdAt', 'desc']] })
}
const createList = (user, title) => {
    return user.createList({ title })
}
const newListTask = async (user, listId, name) => {
    const lists = await user.getLists({ where: { id: listId }})
    return lists[0].createTask({ name })
}
const changeTitle = async (user, listId, title) => {
    const lists = await user.getLists({ where: { id: listId }})
    return lists[0].update({ title }, { where: { id: listId }})
}

module.exports = {  getAllLists, createList, newListTask, changeTitle }