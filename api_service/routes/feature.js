const express = require("express");
const {Feature} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        const features = await Feature.findAll();
        return res.json(features);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        const feature = await Feature.findByPk(req.params.id);
        return res.json(feature);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        const newFeature = await Feature.create(req.body);
        return res.json(newFeature);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        const feature = await Feature.findByPk(req.params.id);
        feature.name = req.body.name;
        await feature.save();
        return res.json(feature);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        const feature = await Feature.findByPk(req.params.id);
        await feature.destroy();
        return res.json(feature.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});
