import React from "react";
import { Row, Col, Card } from 'react-bootstrap';


function MemeCard(props) {
    return (
        <Card className="h-100 border-0 meme-card">
            <Card.Img variant="top" src={props.meme.url} className="card-img-top" />
            <Card.Body>
                <Card.Text className="text-muted">{props.meme.caption}</Card.Text>
            </Card.Body>
        </Card>
    );
}


function MemeList(props) {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {props.memes.map((meme) => (
                <Col key={meme.id}>
                    <MemeCard meme={meme} />
                </Col>
            ))}
        </Row>
    );
}

export default MemeList;
