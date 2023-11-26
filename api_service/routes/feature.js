const express = require("express");
const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({extended:true}));

module.exports = route;

route.get("/", async (req, res) => {
    try{
        return res.json("All features");
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.get("/:id", async (req, res) => {
    try{
        return res.json("Feature with id=" + req.params.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.post("/", async (req, res) => {
    try{
        return res.json("Feature input with req.body");
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.put("/:id", async (req, res) => {
    try{
        return res.json("Change data of feature with id="+req.params.id+" with data req.body");
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});

route.delete("/:id", async (req, res) => {
    try{
        return res.json(req.params.id);
    } catch(err){
        console.log(err);
        res.status(500).json({ error: "Error", data: err });
    }
});
