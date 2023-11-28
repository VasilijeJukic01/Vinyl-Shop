const express = require("express");
const { Feature } = require("../models");
const { handleRoute } = require("./crudhelper");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllFeatures = async () => {
    return await Feature.findAll();
};

const getFeatureById = async (id) => {
    return await Feature.findByPk(id);
};

const createFeature = async (featureData) => {
    return await Feature.create(featureData);
};

const updateFeature = async (id, featureData) => {
    const feature = await Feature.findByPk(id);
    feature.name = featureData.name;
    await feature.save();
    return feature;
};

const deleteFeature = async (id) => {
    const feature = await Feature.findByPk(id);
    await feature.destroy();
    return feature.id;
};

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllFeatures);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getFeatureById);
});

route.post("/", async (req, res) => {
    await handleRoute(req, res, createFeature);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateFeature);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteFeature);
});
