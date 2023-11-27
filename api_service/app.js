const express = require('express');
const {sequelize, Song, Category, SongFeature, Feature, OrderItem, Order} = require("./models");
const app = express();

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
