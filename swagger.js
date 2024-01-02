const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: "Todo_Managemet_System",
        description:"For shortening long url's"
    },
    host: 'localhost:4500'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/user.routes.js','./routes/todo.routes.js'];

swaggerAutogen(outputFile,routes,doc);