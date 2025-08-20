import sqlite from "sqlite3";
import express from "express";
import morgan from "morgan";
import { check, validationResult } from "express-validator";
import * as dao from "./dao.mjs";

const app = new express();
const port = 3001;

app.use(express.json());
app.use(morgan("dev"));


/**  ROUTES **/

/* Memes API*/

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

// PUT /api/memes/<id>
app.put("/api/memes/:id", [
    check("id").isInt(),
    check("id").notEmpty(),
    check("url").isURL(), 
    check("description").notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        const meme = req.body;
        meme.id = req.params.id;
        try{
            const existingMeme = await dao.getMeme(meme.id);
        if (!existingMeme) {
            return res.status(404).json({ error: `Meme with ID ${meme.id} not found.` });
        }
            await dao.updateMemeDescription(meme.id, meme.description);
            res.status(200).end();

        }catch{
            res.status(500).json({ error: "Internal Server Error, check the id #${meme.id}"});
        }
});


// DELETE /api/memes/<id>
app.delete("/api/memes/:id", [
    check("id").isInt(),
    check("id").notEmpty()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        try{
            const id = req.params.id;
            const meme = await dao.getMeme(id);
            if (!meme) {
                return res.status(404).json({ error: `Meme with ID ${id} not found.` });
            }
            await dao.deleteMeme(id);
            res.status(204).end();
        }catch{
            res.status(500).json({ error: "Internal Server Error"});
        }
    }

);


/* Captions API*/

// GET /api/captions
app.get("/api/captions", async (req, res) => {
    try {
        const captions = await dao.getCaptions(); // <----  
        res.status(200).json(captions);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// GET /api/captions/:id
app.get("/api/captions/:id", [
    check("id").isInt().withMessage("ID must be an integer"),
    check("id").notEmpty().withMessage("ID cannot be empty")
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const id = parseInt(req.params.id);
            const caption = await dao.getCaption(id); // <----
            if (!caption || caption.error) {
                return res.status(404).json({ error: "Caption not found, check the id" });
            }
            res.status(200).json(caption);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// POST /api/captions
app.post("/api/captions", [
    check("text").notEmpty().withMessage("Text cannot be empty")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const newCaption = req.body;
    try {
        const lastID = await dao.createNewCaption(newCaption); // <----
        res.status(201).json({ id: lastID, ...newCaption });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT /api/captions/:id
app.put("/api/captions/:id", [
    check("id").isInt().withMessage("ID must be an integer"),
    check("id").notEmpty().withMessage("ID cannot be empty"),
    check("text").notEmpty().withMessage("Text cannot be empty")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const caption = {
        id: parseInt(req.params.id),
        text: req.body.text
    };
    try {
        await dao.updateCaptionText(caption.id, caption.text);
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /api/captions/:id
app.delete("/api/captions/:id", [
    check("id").isInt().withMessage("ID must be an integer"),
    check("id").notEmpty().withMessage("ID cannot be empty")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const id = parseInt(req.params.id);
        await dao.deleteCaption(id);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/* Associations API */

// GET /api/memes/:memeId/associations
app.get("/api/memes/:memeId/associations", [
    check("memeId").isInt().withMessage("Meme ID must be an integer"),
    check("memeId").notEmpty().withMessage("Meme ID cannot be empty")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const memeId = parseInt(req.params.memeId);
        const associations = await dao.getAssociationsbyMemeId(memeId);
        res.status(200).json(associations);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// POST /api/memes/:memeId/associations
app.post("/api/memes/:memeId/associations", [
    check("memeId").isInt().withMessage("Meme ID must be an integer"),
    check("memeId").notEmpty().withMessage("Meme ID cannot be empty"),
    check("captionId").isInt().withMessage("Caption ID must be an integer"),
    check("captionId").notEmpty().withMessage("Caption ID cannot be empty"),
    check("points").isInt({ min: 1 }).withMessage("Points must be an integer greater than 0")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const { memeId, captionId, points } = req.body;

    try {
        await dao.createNewAssociation(memeId, captionId, points);
        res.status(201).json({ memeId, captionId, points });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// PUT /api/memes/:memeId/associations/:captionId
app.put("/api/memes/:memeId/associations/:captionId", [
    check("memeId").isInt().withMessage("Meme ID must be an integer"),
    check("memeId").notEmpty().withMessage("Meme ID cannot be empty"),
    check("captionId").isInt().withMessage("Caption ID must be an integer"),
    check("captionId").notEmpty().withMessage("Caption ID cannot be empty"),
    check("points").isInt({ min: 1 }).withMessage("Points must be an integer greater than 0")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { memeId, captionId } = req.params;
    const { points } = req.body;

    try {
        await dao.updateAssociationPoints(
            parseInt(memeId), 
            parseInt(captionId), 
            points
        );
        res.status(200).end();
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// DELETE /api/memes/:memeId/associations/:captionId
app.delete("/api/memes/:memeId/associations/:captionId", [
    check("memeId").isInt().withMessage("Meme ID must be an integer"),
    check("memeId").notEmpty().withMessage("Meme ID cannot be empty"),
    check("captionId").isInt().withMessage("Caption ID must be an integer"),
    check("captionId").notEmpty().withMessage("Caption ID cannot be empty")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { memeId, captionId } = req.params;

    try {
        await dao.deleteAssociation(parseInt(memeId), parseInt(captionId));
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});



//**  Start the server **//
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});