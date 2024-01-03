const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { connection } = require('./Config/db.connection.js')
const { userRouter } = require('./routes/user.routes.js')
const {auth}= require('./Middlewares/authentication.middleware.js')
const { TodoRouter } = require('./routes/todo.routes.js');
const server=express()
server.use(morgan('dev'));  //Morgan logger to show log data at every http request
server.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    next();
  });
server.use(express.json())
server.use(cors()) //cors middleware for cross origin data sharing
server.get("/",(req,res)=>{
    return res.send("<h1> Welcome to Todo management system </h1>")
})

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // swagger documentation on this endpoint.
server.use("/users",userRouter) //users base route
server.use(auth)
server.use("/todos",TodoRouter) //todos base route
server.listen(4500, async () => {
    try {
        await connection; //connection to database
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error.message);
        process.exit(1);
    }
    console.log("Connected to server");
});