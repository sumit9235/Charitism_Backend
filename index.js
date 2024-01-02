const express = require('express')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { connection } = require('./Config/db.connection.js')
const { userRouter } = require('./routes/user.routes.js')
const {auth}= require('./Middlewares/authentication.middleware.js')
const { TodoRouter } = require('./routes/todo.routes.js')
const server=express()
server.use(express.json())

server.get("/",(req,res)=>{
    return res.send("<h1> Welcome to Todo management system </h1>")
})

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation on this endpoint.
server.use("/users",userRouter)
server.use(auth)
server.use("/todos",TodoRouter)
server.listen(4500,async()=>{
    try {
        await connection
        console.log("Connected to database")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Connected to server")
})