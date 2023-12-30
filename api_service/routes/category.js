const express = require("express");
const { Category } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken } = require("../security/verifier");
const Joi = require('joi');
const route = express.Router();

const categorySchema = Joi.object({
    name: Joi.string().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllCategories = async () => {
    return await Category.findAll();
};

const getCategoryById = async (id) => {
    return await Category.findByPk(id);
};

const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const updateCategory = async (id, categoryData) => {
    const category = await Category.findByPk(id);
    category.name = categoryData.name;
    await category.save();
    return category;
};

const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    await category.destroy();
    return category.id;
};

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllCategories);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getCategoryById);
});

route.post("/", authAdminToken, async (req, res) => {
    const { error } = categorySchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createCategory);
});

route.put("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, updateCategory);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteCategory);
});
