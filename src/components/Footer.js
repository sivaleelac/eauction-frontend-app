import React, { useState, useEffect } from 'react';
import { Navbar, Container, Col } from "react-bootstrap";

const Footer = () => {
    const [fullYear, setFullYear] = useState();

    useEffect(() => {
        setFullYear(new Date().getFullYear());
    }, [fullYear]);

    return (       
        <Navbar expand="lg" bg="primary" variant="primary">
            <Container>
                <Col lg={12} className="text-center text-muted">
                    <div className='nav-link'>
                        {fullYear}-{fullYear + 1}, All Rights Reserved by @Sivaleela
                    </div>
                </Col>
            </Container>
        </Navbar>
    );
};

export default Footer;