// Constructor function for a MemePicture
function MemePicture(id, url, description) {
    this.id = id;
    this.url = url;
    this.description = description;
}

// Constructor function for a Caption
function Caption(id, text) {
    this.id = id;
    this.text = text;
}

// Constructor function for a MemeAssociation
function MemeAssociation(memeId, captionId, points) {
    this.memeId = memeId;
    this.captionId = captionId;
    this.points = points;
}


class MemeCollection {
    constructor() {
        this.memes = [];
        this.captions = [];
        this.associations = [];
    }

    // Method to add a new MemePicture
    addMeme(meme) {
        this.memes.push(meme);
        console.log(`Meme picture with ID ${meme.id} added.`);
    }

    // Method to add a new Caption
    addCaption(caption) {
        this.captions.push(caption);
        console.log(`Caption with ID ${caption.id} added.`);
    }

    // Method to add a new MemeAssociation
    addAssociation(association) {
        this.associations.push(association);
        console.log(`Association for meme ${association.memeId} and caption ${association.captionId} added.`);
    }

    // Method to retrieve all captions for a specific meme ID
    getCaptionsForMeme(memeId) {
        // Find all associations for the given meme ID
        const memeAssociations = this.associations.filter(assoc => assoc.memeId === memeId);
        
        // Map over the associations to get the corresponding caption objects
        const captions = memeAssociations.map(assoc => {
            const caption = this.captions.find(c => c.id === assoc.captionId);
            return {
                ...caption,
                points: assoc.points // Add points property to the caption object
            };
        });

        return captions;
    }

    // Method to delete a specific meme and all its associations
    deleteMeme(memeId) {
        // Find the index of the meme to delete
        const memeIndex = this.memes.findIndex(meme => meme.id === memeId);
        
        if (memeIndex > -1) {
            // Remove the meme from the collection
            this.memes.splice(memeIndex, 1);
            
            // Filter out all associations for the deleted meme
            this.associations = this.associations.filter(assoc => assoc.memeId !== memeId);
            
            console.log(`Meme with ID ${memeId} and its associations have been deleted.`);
        } else {
            console.log(`Meme with ID ${memeId} not found.`);
        }
    }

    // Method to sort captions alphabetically by text
    sortCaptions() {
        this.captions.sort((a, b) => a.text.localeCompare(b.text));
        console.log("Captions have been sorted alphabetically.");
    }
}



// Instantiate our collection
const myMemeCollection = new MemeCollection();

// --- Populate with sample data ---

// Add at least 5 Meme Pictures
const meme1 = new MemePicture(1, './images/distracted-boyfriend.jpg', 'Distracted Boyfriend meme');
const meme2 = new MemePicture(2, './images/spongebob.png', 'Spongebob meme');
const meme3 = new MemePicture(3, './images/bad-luck-brian.jpg', 'Bad Luck Brian meme');
const meme4 = new MemePicture(4, './images/success-kid.jpg', 'Success Kid meme');
const meme5 = new MemePicture(5, './images/woman-yelling-at-cat.jpg', 'Woman yelling at cat meme');

myMemeCollection.addMeme(meme1);
myMemeCollection.addMeme(meme2);
myMemeCollection.addMeme(meme3);
myMemeCollection.addMeme(meme4);
myMemeCollection.addMeme(meme5);

// Add some Captions
const caption1 = new Caption(101, 'Look at my new cat!');
const caption2 = new Caption(102, 'When you try to explain something to your parents');
const caption3 = new Caption(103, 'My brain during an exam');
const caption4 = new Caption(104, 'When you think you did well but the professor gave you a bad grade');
const caption5 = new Caption(105, 'My friends vs. me when the pizza arrives');
const caption6 = new Caption(106, 'When she sees someone else and you try to be cool');
const caption7 = new Caption(107, 'My brain after a long week of work');

myMemeCollection.addCaption(caption1);
myMemeCollection.addCaption(caption2);
myMemeCollection.addCaption(caption3);
myMemeCollection.addCaption(caption4);
myMemeCollection.addCaption(caption5);
myMemeCollection.addCaption(caption6);
myMemeCollection.addCaption(caption7);

// Add Associations (at least 3 "right" captions per meme)
// Associations for Meme 1 (Distracted Boyfriend)
myMemeCollection.addAssociation(new MemeAssociation(1, 106, 3)); // High points
myMemeCollection.addAssociation(new MemeAssociation(1, 105, 2)); // Medium points
myMemeCollection.addAssociation(new MemeAssociation(1, 102, 1)); // Low points

// Associations for Meme 2 (Spongebob)
myMemeCollection.addAssociation(new MemeAssociation(2, 103, 3));
myMemeCollection.addAssociation(new MemeAssociation(2, 102, 2));

// Associations for Meme 3 (Bad Luck Brian)
myMemeCollection.addAssociation(new MemeAssociation(3, 104, 3));
myMemeCollection.addAssociation(new MemeAssociation(3, 101, 2));

// Associations for Meme 4 (Success Kid)
myMemeCollection.addAssociation(new MemeAssociation(4, 105, 3));
myMemeCollection.addAssociation(new MemeAssociation(4, 104, 2));

// Associations for Meme 5 (Woman yelling at cat)
myMemeCollection.addAssociation(new MemeAssociation(5, 101, 3));
myMemeCollection.addAssociation(new MemeAssociation(5, 107, 2));

// --- Display and use our methods ---

console.log("\n--- Initial State ---");
console.log("Meme Pictures:", myMemeCollection.memes);
console.log("Captions:", myMemeCollection.captions);
console.log("Associations:", myMemeCollection.associations);

console.log("\n--- Using the `getCaptionsForMeme` method (for meme with ID 1) ---");
const captionsForMeme1 = myMemeCollection.getCaptionsForMeme(1);
console.log(captionsForMeme1);

console.log("\n--- Using the `sortCaptions` method ---");
myMemeCollection.sortCaptions();
console.log(myMemeCollection.captions);

console.log("\n--- Using the `deleteMeme` method (for meme with ID 2) ---");
myMemeCollection.deleteMeme(2);

console.log("\n--- Final State ---");
console.log("Meme Pictures:", myMemeCollection.memes);
console.log("Associations:", myMemeCollection.associations);