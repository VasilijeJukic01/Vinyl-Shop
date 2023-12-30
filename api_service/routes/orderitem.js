const express = require("express");
const { OrderItem } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken } = require("../security/verifier");
const Joi = require('joi');
const route = express.Router();

const orderItemSchema = Joi.object({
    orderId: Joi.number(0).required(),
    productId: Joi.number(0).required(),
    quantity: Joi.number(0).required().min(1)
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllOrdersItems = async () => {
    return await OrderItem.findAll();
};

const getOrderItemById = async (id) => {
    return await OrderItem.findByPk(id);
};

const createOrderItem = async (orderItemData) => {
    return await OrderItem.create(orderItemData);
};

const updateOrderItem = async (id, orderItemData) => {
    const orderItem = await OrderItem.findByPk(id);
    Object.assign(orderItem, orderItemData);
    await orderItem.save();
    return orderItem;
};

const deleteOrderItem = async (id) => {
    const orderItem = await OrderItem.findByPk(id);
    await orderItem.destroy();
    return orderItem.id;
};

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllOrdersItems);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getOrderItemById);
});

route.post("/", async (req, res) => {
    const { error } = orderItemSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const orderItemData = req.body
    const orderItem = await createOrderItem(orderItemData)
    res.json(orderItem)
});

route.put("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, updateOrderItem);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteOrderItem);
});
