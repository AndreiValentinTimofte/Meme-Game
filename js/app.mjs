import sqlite from "sqlite3";
import dayjs  from "dayjs";

const db = new sqlite.Database(('./memes.db'), (err) => {
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
    
    
    this.deleteMeme = (id) => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM memes WHERE id = ?";
            db.run(sql, [id], function (err) {
                if (err){
                    reject(err);
                }
                else{
                    resolve(this.changes);
                }
            });
        
        });
    }


    this.updateMemeDescription = (id, description) => {
        return new Promise((resolve, reject) =>{
            const sql = "UPDATE memes SET description = ? WHERE id = ?";
            db.run(sql, [description, id], function (err) {
                if (err){
                    reject(err);
                }
                else{
                    resolve(this.changes);
                }
                
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
            db.run(sql, [caption.text], function (err) {
                if (err)
                    reject(err);
                resolve(this.lastID);
            });
        });
    }


    this.deleteCaption = (id) => {
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


    this.updateCaptionText = (id, text) => {
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
            db.run(sql, [memeId, captionId, points], function (err) {
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

// // Le tue altre funzioni costruttore...
// // Funzione per eseguire i test in sequenza
// async function runTests() {
//     console.log('--- Inizio dei test ---');

//     // Crea un'istanza della classe per accedere ai metodi
//     const testMeme = new MemePicture();

//     // Test 1: Inserire un nuovo meme
//     console.log('\n- Test: Inserire un nuovo meme');
//     try {
//         const newMeme = { url: './images/temp-test-meme.jpg', description: 'Meme temporaneo per test' };
//         const newMemeId = await testMeme.createNewMeme(newMeme);
//         console.log(`Successo: Nuovo meme creato con ID: ${newMemeId}`);
//     } catch (err) {
//         console.error('Errore nella creazione del meme:', err);
//     }
    
//     // Test 2: Aggiornare la descrizione
//     console.log('\n- Test: Aggiornare la descrizione di un meme');
//     try {
//         const updatedRows = await testMeme.updateMemeDescription(1, 'Updated description for meme 1!');
//         if (updatedRows > 0) {
//             console.log(`Successo: Aggiornate ${updatedRows} riga/e.`);
//         } else {
//             console.log('Attenzione: Nessuna riga aggiornata. L\'ID potrebbe non esistere.');
//         }
//     } catch (err) {
//         console.error('Errore nell\'aggiornamento del meme:', err);
//     }
    
//     // Test 3: Eliminare un meme
//     console.log('\n- Test: Eliminare un meme (usando un ID fittizio)');
//     try {
//         const deletedRows = await testMeme.deleteMeme(100); // Usiamo un ID che probabilmente non esiste
//         if (deletedRows > 0) {
//             console.log(`Successo: Eliminate ${deletedRows} riga/e.`);
//         } else {
//             console.log('Attenzione: Nessuna riga eliminata. L\'ID potrebbe non esistere.');
//         }
//     } catch (err) {
//         console.error('Errore nell\'eliminazione del meme:', err);
//     }

//     console.log('\n--- Fine dei test ---');
// }

// runTests();

export { MemePicture, Caption, MemeAssociation };
