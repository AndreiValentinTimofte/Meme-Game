import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import { Container } from 'react-bootstrap';

import MemeList from "./components/MemeList";
import NavHeader from "./components/NavHeader";
import FabButton from './components/FabButton';
import './App.css';

function App() {
    const [memes, setMemes] = useState([
    { id: 1, url: 'https://placehold.co/600x400/212529/fff?text=Meme+1', caption: "A classic meme with a modern twist." },
    { id: 2, url: 'https://placehold.co/600x400/212529/fff?text=Meme+2', caption: "When you realize it's Friday." },
    { id: 3, url: 'https://placehold.co/600x400/212529/fff?text=Meme+3', caption: "The funniest caption I've ever seen." },
    { id: 4, url: 'https://placehold.co/600x400/212529/fff?text=Meme+4', caption: "A meme from a galaxy far, far away." },
    { id: 5, url: 'https://placehold.co/600x400/212529/fff?text=Meme+5', caption: "Reacting to the new software update." },
    { id: 6, url: 'https://placehold.co/600x400/212529/fff?text=Meme+6', caption: "Life is short, make more memes." },
    ]);

    const handleAddMeme = () => {
        // Usiamo la forma funzionale di setMemes per garantire di avere lo stato più aggiornato
        const newMeme = {
        id: memes.length + 1,
        url: `https://placehold.co/600x400/${Math.floor(Math.random()*16777215).toString(16)}/fff?text=Meme+${memes.length + 1}`,
        caption: `This is a new meme #${memes.length + 1}`
    };
    // Aggiorniamo lo stato per includere il nuovo meme
    setMemes([...memes, newMeme]);
    };
    

    return (
    <>
        <NavHeader />
        <Container fluid className='py-5'>
            <MemeList memes={memes} />
        </Container>
        <FabButton onClick={handleAddMeme}/>
    </>
    );
}

export default App;
