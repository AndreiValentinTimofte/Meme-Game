import sqlite from "sqlite3";
import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import * as dao from "./dao.mjs";

const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));


/* Routes */

// GET /api/memes
app.get("/api/memes", async (req, res) => {
    try {
        const memes = await dao.getMemes();
        res.status(200).json(memes);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error"});
    }
});

// GET /api/memes/<id>
app.get("/api/memes/:id", [
    check("id").isInt(), 
    check("id").notEmpty()]
    , async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const meme = await dao.getMeme(req.params.id);
        if (meme.error) {
            res.status(404).json(meme);
        } else {
            res.status(200).json(meme);
        }
    }catch (err) {
        res.status(500).json({ error: "Internal Server Error"});
    }
});

// POST /api/memes
app.post("/api/memes", [
    check("url").isURL(), 
    check("description").notEmpty()],
    async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const newMeme = req.body;
    try{
        const lastID= await dao.createNewMeme(newMeme);
        res.status(201).json({id: lastID, ...newMeme});
    }catch (err){
        res.status(500).json({ error: "Internal Server Error"});
    }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});