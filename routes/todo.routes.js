const express = require('express');
const TodoRouter = express.Router();
const { limiter } = require('../Middlewares/rateLimitter.middleware');
const {
    CreateTodo,
    GetTodo,
    GetTodoById,
    RemoveTodo,
    UpdateTodo
} = require('../Controllers/todo.controller');

TodoRouter.use(limiter)
TodoRouter.route("/").get(GetTodo).post(CreateTodo)
TodoRouter.route("/:id").patch(UpdateTodo).delete(RemoveTodo).get(GetTodoById)

module.exports={
    TodoRouter
}