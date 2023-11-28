const express = require("express");
const { Category } = require("../models");
const { handleRoute } = require("./crudhelper");
const route = express.Router();

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

route.post("/", async (req, res) => {
    await handleRoute(req, res, createCategory);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateCategory);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteCategory);
});
