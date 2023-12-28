const express = require("express");
const { Order } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken, authUserToken } = require("../security/verifier");
const route = express.Router();

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

route.post("/", [authAdminToken, authUserToken],async (req, res) => {
    await handleRoute(req, res, createOrder);
});

route.put("/:id", [authAdminToken, authUserToken], async (req, res) => {
    await handleRoute(req, res, updateOrder);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteOrder);
});
