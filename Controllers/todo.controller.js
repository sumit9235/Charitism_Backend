const {TodoModel} = require('../Models/todo.model.js')

// Creating a todo
async function CreateTodo(req, res) {
    const { todo, status } = req.body;
    const userID = req.body.userID;
    if (!todo ) {
        return res.status(201).send({ "error": " The key should be todo" });
    }
    if(status === undefined){
        return res.status(201).send({ "error": "The key should be status" });
    }
    if (typeof status !== 'boolean') {
        return res.status(400).send({ "error": "The 'status' field should be a boolean value" });
      }
    try {
        const data = new TodoModel({ todo, status, userID });
        console.log(data)
        await data.save();
        res.status(201).send({ "msg": "New todo has been created" });
    } catch (error) {
        res.status(400).send({ "msg": "Something went wrong while creating todo", "err": error.message });
    }
}

// Get all todos
async function GetTodo(req,res){
    try {
        const data = await TodoModel.find();
        if(!data){
            return res.json({"msg":"No Data Found!!"})
        }
         res.status(200).json({"msg":data})
    } catch (error) {
         res.status(400).send(error.message)
    }
}

// Get todo by its objectId
async function GetTodoById(req,res){
    const id = req.params.id;
    try {
        const data = await TodoModel.findById({_id:id});
        if(!data){
            return res.json({"msg":"No Data Found!!"})
        }
         res.status(200).json({"msg":data})
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// Delete todoByID
async function RemoveTodo(req,res){
    const id = req.params.id
    try {
        const todoExist = await TodoModel.findByIdAndDelete({_id:id});
        if(!todoExist){
            return res.status(201).send({"msg":"Todo not found"})
        }
        await TodoModel.findById({_id:id})
        res.status(200).send({"msg":"Todo Successfully Removed!!"})
    } catch (error) {
         res.status(400).send(error.message)
    }
}

// Update or patch a todoById
async function UpdateTodo(req,res){
    const id = req.params.id
    const data = req.body;
    try {
        const todoExist = await TodoModel.findById({ _id: id });
        if (!todoExist) {
            return res.status(404).send({ "msg": "Todo not found" });
        }
        if (!data) {
            return res.status(400).send({ "error": "No update parameters provided" });
        }
        await TodoModel.findOneAndUpdate({_id:id},data,{ new: true });
        res.status(200).send({ "msg": "Todo data has been updated from database" });
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports={
    CreateTodo,
    GetTodo,
    GetTodoById,
    RemoveTodo,
    UpdateTodo
}