const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
    userID: String,
    todo: String,
    status: Boolean
}, {
    versionKey: false
});

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = {
    TodoModel
}