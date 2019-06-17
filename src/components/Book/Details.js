

import React from 'react';
import Rater from 'react-rater';

// import{NavLink} from 'react-router-dom';


import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap'

class BookDetails extends React.Component {
    render() {
        return (
            <>
                <Container className=' my-5'>
                    <Row className='book-detail'>
                        <Col md={4}>
                            <Card>
                                <Card.Img alt='book Image' variant="top" src='https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' />
                            </Card>
                            <Dropdown className='m-2'>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    Want to Read
                            </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Currently Read</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Read </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">Want to Read</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Card.Text > <h1> <Rater rating={0} total={5} interactive={true} /></h1></Card.Text>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title> <h1>Book Name </h1> </Card.Title>
                                    <hr></hr>
                                    {/* will be a link */}
                                    <Card.Text>by Autor Name </Card.Text>
                                    {/* will be a link */}
                                    <Card.Text>Category Name </Card.Text>
                                    {/* <NavLink>Category</NavLink> */}
                                    <Card.Text><h1> <Rater rating={4} total={5} interactive={false} /></h1></Card.Text>

                                    <Card.Text >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus rem laudantium enim ab, beatae nulla quod et, qui aliquam natus ullam molestias saepe! Accusantium explicabo aut optio dolorum nostrum esse!
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}


export default BookDetails;