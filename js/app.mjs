import sqlite from "sqlite3";
import dayjs  from "dayjs";

const db = new sqlite.Database(('../memes.db'), (err) => {
    if (err)
        return err;
    else 
        console.log("Connected to database");
});

// Constructor function for a MemePicture
function MemePicture(id, url, description) {
    this.id = id;
    this.url = url;
    this.description = description;


    this.getMemes = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT *FROM memes";
            db.all((sql), [], (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });   
        });
    }

    
    this.createNewMeme = (meme) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO memes (url, description) VALUES (?, ?)";
            param = [meme.url, meme.description];
            db.run(sql, param, function(err) {
                if (err){
                    reject(err);
                }
                resolve(this.lastID)
            });
        });
    } 
    
    
    this.deleteMeme = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM memes WHERE id = ?";
            db.run(sql, [id], function(err) {
                if (err){
                    reject(err);
                }
                resolve(this.changes);
            });
        
        });
    }


    this.updateMemeDescription = (id, description) => {
        return new Promise((resolve, reject) =>{
            const sql = "UPDATE meme SET description = ? WHERE id = ?";
            db.run(sql, [description, id], (err) => {
                if (err){
                    reject(err);
                }
                resolve(this.changes);
            });
        });
    }

}
// Constructor function for a Caption
function Caption(id, text) {
    this.id = id;
    this.text = text;


    this.createNewCaption = (caption) =>{
        return new Promise((resolve,reject) => {
            const sql = "INSERT INTO captions (text) VALUES (?)";
            db.run(sql, [caption.text], function(err) {
                if (err)
                    reject(err);
                resolve(this.lastID);
            });
        });
    }


    this.deleteCaption = (id) => {
        return new Promise((resolve, reject) =>{
            const sql = "DELETE FROM captions WHERE id = ?";
            db.run(sql, [id], function(err) {
                if (err)
                    reject(err)
                else
                    resolve(this.changes)
            });
        });
    }


    this.updateCaptionText = (id, text) => {
        return new Promise((resolve, reject) => {
            const sql = "UPDATE captions SET text = ? WHERE id = ?";
            db.run(sql, [text, id], function(err) {
                if (err)
                    reject(err);
                else
                    resolve(this.changes)
            });
        });
    }
}

// Constructor function for a MemeAssociation
function MemeAssociation(memeId, captionId, points) {
    this.memeId = memeId;
    this.captionId = captionId;
    this.points = points;

    // Metodo per inserire una nuova associazione
    this.createNewAssociation = (memeId, captionId, points) => {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO associations (memeId, captionId, points) VALUES (?, ?, ?)';
            db.run(sql, [memeId, captionId, points], function(err) {
            if (err) {
                reject(err);
            }
            resolve(true); // Non ha un lastID, quindi restituiamo true per il successo
            });
        });
    }

    // Metodo per eliminare un'associazione tramite memeId e captionId
    this.deleteAssociation = (memeId, captionId) => {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM associations WHERE memeId = ? AND captionId = ?';
            db.run(sql, [memeId, captionId], function(err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
            });
        });
    }

    // Metodo per aggiornare i punti di un'associazione
    this.updateAssociationPoints = (memeId, captionId, newPoints) => {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE associations SET points = ? WHERE memeId = ? AND captionId = ?';
            db.run(sql, [newPoints, memeId, captionId], function(err) {
            if (err) {
                reject(err);
            }
            resolve(this.changes);
            });
        });
    }
}
