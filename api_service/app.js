const express = require('express');

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

app.listen(9000);
