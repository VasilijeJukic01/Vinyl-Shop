const express = require("express");
const { Song } = require("../models");
const { handleRoute } = require("./crudhelper");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

module.exports = route;

const getAllSongs = async () => {
    return await Song.findAll();
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

route.get("/", async (req, res) => {
    await handleRoute(req, res, getAllSongs);
});

route.get("/:id", async (req, res) => {
    await handleRoute(req, res, getSongById);
});

route.post("/", async (req, res) => {
    await handleRoute(req, res, createSong);
});

route.put("/:id", async (req, res) => {
    await handleRoute(req, res, updateSong);
});

route.delete("/:id", async (req, res) => {
    await handleRoute(req, res, deleteSong);
});
