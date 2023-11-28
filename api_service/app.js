const express = require('express');
const {sequelize} = require("./models");
const cors = require("cors");
const app = express();

const corsOptions = {
    origin: ['http://localhost:9000', 'http://127.0.0.1:9000']
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello from REST API service');
});

const routes = {
    '/song': require('./routes/song.js'),
    '/category': require('./routes/category.js'),
    '/order': require('./routes/order.js'),
    '/feature': require('./routes/feature.js'),
};

Object.entries(routes).forEach(([path, route]) => {
    app.use(path, route);
});

app.listen(8000, async () => {
    console.log('Server started on localhost:8000');
    await sequelize.sync({ force: false });
    console.log('DB synced');
});
