import {Container, Navbar} from "react-bootstrap";

function NavHeader (props){
    return(
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container fluid>
                <Navbar.Brand>Meme Gallery</Navbar.Brand>
            </Container>

        </Navbar>
    );
}

export default NavHeader;