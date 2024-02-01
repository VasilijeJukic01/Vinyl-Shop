const express = require("express");
const { Song, Category } = require("../models");
const { handleRoute } = require("./crudhelper");
const { authAdminToken, authUserToken } = require("../security/verifier");
const Joi = require('joi');
const route = express.Router();

const songSchema = Joi.object({
    name: Joi.string().min(3).required(),
    performer: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required().min(0),
    category_id: Joi.number().required().min(1)
});

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongs = async () => {
    return await Song.findAll({
        include: [{
            model: Category,
            as: 'categories'
        }]
    });
};

const getSongById = async (id) => {
    return await Song.findByPk(id);
};

const createSong = async (songData) => {
    return await Song.create(songData);
};

const updateSong = async (id, songData) => {
    const song = await Song.findByPk(id);
    const {name, performer, description, price, category_id} = songData;

    song.name = name;
    song.performer = performer;
    song.description = description;
    song.price = price;
    song.category_id = category_id;

    await song.save();
    return song;
};

const deleteSong = async (id) => {
    const song = await Song.findByPk(id);
    await song.destroy();
    return song.id;
};

route.get("/", authUserToken, async (req, res) => {
    await handleRoute(req, res, getAllSongs);
});

route.get("/:id", authUserToken, async (req, res) => {
    await handleRoute(req, res, getSongById);
});

route.post("/", authAdminToken, async (req, res) => {
    const { error } = songSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    await handleRoute(req, res, createSong);
});

route.put("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, updateSong);
});

route.delete("/:id", authAdminToken, async (req, res) => {
    await handleRoute(req, res, deleteSong);
});
