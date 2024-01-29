const express = require("express");
const { SongFeature } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken, authUserToken } = require("../security/verifier");
const Joi = require('joi');
const route = express.Router();

const songFeatureSchema = Joi.object({
    song_id: Joi.number().required(),
    feature_id: Joi.number().required()
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

const getAllSongFeatures = async () => {
    return await SongFeature.findAll();
};

const getSongFeatureById = async (id) => {
    return await SongFeature.findByPk(id);
};

const createSongFeature = async (songFeatureData) => {
    return await SongFeature.create(songFeatureData);
};

const updateSongFeature = async (id, songFeatureData) => {
    const songFeature = await SongFeature.findByPk(id);
    songFeature.song_id = songFeatureData.song_id;
    songFeature.feature_id = songFeatureData.feature_id;
    await songFeature.save();
    return songFeature;
};

const deleteSongFeature = async (id) => {
    const songFeature = await SongFeature.findByPk(id);
    await songFeature.destroy();
    return songFeature.id;
};

route.get("/", authUserToken, async (req, res) => {
    await handleRoute(req, res, getAllSongFeatures);
});

route.get("/:id", authUserToken, async (req, res) => {
    await handleRoute(req, res, getSongFeatureById);
});

route.get("/song/:id", authUserToken, async (req, res) => {
    const songFeatures = await SongFeature.findAll({ where: { song_id: req.params.id } });
    res.send(songFeatures);
});

route.post("/", authAdminToken, async (req, res) => {
    console.log(req.body);
    const { error } = songFeatureSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSongFeature);
});

route.put("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, updateSongFeature);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteSongFeature);
});

module.exports = route;