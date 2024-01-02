const express = require('express');
const TodoRouter = express.Router();
const {
    CreateTodo,
    GetTodo,
    GetTodoById,
    RemoveTodo,
    UpdateTodo
} = require('../Controllers/todo.controller')

TodoRouter.route("/").get(GetTodo).post(CreateTodo)
TodoRouter.route("/:id").patch(UpdateTodo).delete(RemoveTodo).get(GetTodoById)

module.exports={
    TodoRouter
}