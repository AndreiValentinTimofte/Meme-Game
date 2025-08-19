import sqlite from "sqlite3";

const db = new sqlite.Database(("./memes.db"), (err) =>{
    if (err) throw err;
    else console.log("Connected to database");
});


/** MEMES **/
// get all the memes
export const getMemes = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM memes";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

// get a meme given its id
export const getMeme = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM memes WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }else if (row === undefined){
                resolve({error : "Meme not found, check the id"});
            }else{
                resolve(row);
            }
        });
    });
}

// create a new meme
export const createMeme = (meme) => {
    return new Promise((resolve, reject) => {
            const sql = "INSERT INTO memes (url, description) VALUES (?, ?)";
            const param = [meme.url, meme.description];
            db.run(sql, param, function (err) {
                if (err){
                    reject(err);
                }else{
                    resolve(this.lastID)
                }
            });
        });
}

// update meme descritpion 
export const updateMemeDescription = (id, description) => {
    return new Promise ((resolve, reject) => {
        const sql = "UPDATE memes SET description = ? WHERE id = ?";
        db.run(sql, [description, id], function (err) {
            if (err){
                reject(err);
            }else{
                resolve(this.changes);
            }
        });
    });
}

// delete meme
export const deleteMeme = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM memes WHERE id = ?";
        db.run(sql, [id], function (err) {
            if (err){
                reject(err);
            }else{
                resolve(this.changes);
            }
        });
    });
}


/** CAPTION **/
// list all caption 
export const getCaptions = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM captions";
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

// get a caption given its id
export const getCaption = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM captions WHERE id = ?";
        db.get(sql, [id], (err, row) => {
            if (err) {
                reject(err);
            }else if (row === undefined){
                resolve({error : "Caption not found, check the id"});
            }else{
                resolve(row);
            }
        });
    });
}

// create a new caption
export const createNewCaption = (caption) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO captions (text) VALUES (?)";
        db.run(sql, [caption.text], function (err) {
            if (err)
                reject(err);
            else{
                resolve(this.lastID);
            }
        });
    });
}

// update caption text
export const updateCaptionText = (id, text) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE captions SET text = ? WHERE id = ?";
        db.run(sql, [text, id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.changes)
        });
    });
}

// delete caption
export const deleteCaption = (id) => {
    return new Promise((resolve, reject) =>{
        const sql = "DELETE FROM captions WHERE id = ?";
        db.run(sql, [id], function (err) {
            if (err)
                reject(err)
            else
                resolve(this.changes)
        });
    });
}


/** ASSOCIATION **/
// list all association given its memmeID
export const getAssociationsbyMemeId = (memeId) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM associations WHERE memeId = ?";
        db.all(sql, [memeId], (err, rows) => {
        if (err) {
            reject(err);
        }else{
            resolve(rows);
        }
        });
    });
}

// create a new association
export const createNewAssociation = (memeId, captionId, points) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO associations (memeId, captionId, points) VALUES (?, ?, ?)';
        db.run(sql, [memeId, captionId, points], function (err) {
        if (err) {
            reject(err);
        }else{
            resolve(this.changes);
        }
        });
    });
}

// update association points
export const updateAssociationPoints = (memeId, captionId, newPoints) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE associations SET points = ? WHERE memeId = ? AND captionId = ?';
        db.run(sql, [newPoints, memeId, captionId], function(err) {
        if (err) {
            reject(err);
        }else{
            resolve(this.changes);
        }
        });
    });
}

// delete association
export const deleteAssociation = (memeId, captionId) => {
    return new Promise((resolve, reject) => { 
        const sql = 'DELETE FROM associations WHERE memeId = ? AND captionId = ?';
        db.run(sql, [memeId, captionId], function(err) {
        if (err) {
            reject(err);
        }else{
            resolve(this.changes);
        }
        });
    });
}
