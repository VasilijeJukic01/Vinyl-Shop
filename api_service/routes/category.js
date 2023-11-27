const express = require("express");
const {Category} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const categories = await Category.findAll();
        return res.json(categories);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        return res.json(category);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        return res.json(newCategory);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        category.name = req.body.name;
        await category.save();
        return res.json(category);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const category = await Category.findByPk(req.params.id);
        await category.destroy();
        return res.json(category.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});
