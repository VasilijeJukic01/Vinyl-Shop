const express = require("express");
const { Order } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken, authUserToken } = require("../security/verifier");
const Joi = require('joi');
const route = express.Router();

const orderSchema = Joi.object({
    userId: Joi.number().required(),
    totalPrice: Joi.number().required().min(0)
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllOrders = async () => {
    return await Order.findAll();
};

const getOrderById = async (id) => {
    return await Order.findByPk(id);
};

const createOrder = async (orderData) => {
    return await Order.create(orderData);
};

const updateOrder = async (id, orderData) => {
    const order = await Order.findByPk(id);
    Object.assign(order, orderData);
    await order.save();
    return order;
};

const deleteOrder = async (id) => {
    const order = await Order.findByPk(id);
    await order.destroy();
    return order.id;
};

route.get("/", authAdminToken, async (req, res) => {
    await handleRoute(req, res, getAllOrders);
});

route.get("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, getOrderById);
});

route.post("/", authUserToken, async (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createOrder);
});

route.put("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, updateOrder);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteOrder);
});
