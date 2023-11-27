const express = require("express");
const {Song} = require("../models");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
   try{
       const songs = await Song.findAll();
       return res.json(songs);
   } catch(err){
    	console.log(err);
    	res.status(500).json({ error: "Error", data: err });
   }
});

route.get("/:id", async (req, res) => {
   try{
       const song = await Song.findByPk(req.params.id);
       return res.json(song);
   } catch(err){
   	 console.log(err);
   	 res.status(500).json({ error: "Error", data: err });
   }
});

route.post("/", async (req, res) => {
   try{
       const newSong = await Song.create(req.body);
       return res.json(newSong);
   } catch(err){
   	 console.log(err);
   	 res.status(500).json({ error: "Error", data: err });
   }
});

route.put("/:id", async (req, res) => {
   try{
       const song = await Song.findByPk(req.params.id);
       song.name = req.body.name;
       song.description = req.body.description;
       song.price = req.body.price;
       song.category_id = req.body.category_id;
       await song.save();
       return res.json(song);
   } catch(err){
   	 console.log(err);
   	 res.status(500).json({ error: "Error", data: err });
   }
});

route.delete("/:id", async (req, res) => {
   try{
       const song = await Song.findByPk(req.params.id);
       await song.destroy();
       return res.json(song.id);
   } catch(err){
   	 console.log(err);
   	 res.status(500).json({ error: "Error", data: err });
   }
});
