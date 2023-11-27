const express = require("express");
const {Order} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const orders = await Order.findAll();
        return res.json(orders);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        return res.json(order);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const newOrder = await Order.create(req.body);
        return res.json(newOrder);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        order.order_time = req.body.order_time;
        order.schedule_time = req.body.schedule_time;
        order.status = req.body.status;
        order.address = req.body.address;
        order.phone = req.body.phone;
        order.name_surname = req.body.name_surname;
        await order.save();
        return res.json(order);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const order = await Order.findByPk(req.params.id);
        await order.destroy();
        return res.json(order.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});
