import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

function Footer(){
    return <footer className="footer">
        <Container >
        <Row className="bg-primary text-black">
            <div>
                <h4>App by Vision Maker Productions Inc.</h4>
                <h1> </h1>
            </div>
        </Row>
        </Container>
    </footer>
}

export default Footer;