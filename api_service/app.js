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

const songRoutes = require("./routes/song.js");
app.use("/song", songRoutes);
const categoryRoutes = require("./routes/category.js");
app.use("/category", categoryRoutes);
const orderRoutes = require("./routes/order.js");
app.use("/order", orderRoutes);
const featureRoutes = require("./routes/feature.js");
app.use("/feature", featureRoutes);

app.listen({ port:8000 }, async () => {
    console.log("Started server on localhost:8000");
    await sequelize.sync({force:false});
    console.log("DB synced");
});
