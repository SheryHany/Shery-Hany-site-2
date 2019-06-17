

import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import Listing from '../Listing/Listing';
import authors from '../../data/authors';
import CardBrief from '../Book/Card-brief';
import books from '../../data/books';


class AuthorDetails extends React.Component {

    state = {
        author: {},
        data: books,
    }
    clickHandle = (e) => {
        e.target.innerText = "Unfollow"
    }
    render() {
        const id = this.props.match.params.id;
        const author = authors[id-1];

        return (
            <>
                <Container className=' my-5'>
                    <Row className='author-detail'>
                        <Col md={4}>
                            <Card>
                                {/* <div className='author-detail-img'> */}
                                <Card.Img alt='Author Image' variant="top" src={author.image === "" ? "https://bobandsuewilliams.com/images/gray-1.jpg" : author.image}/>
                                <Button className='m-2' variant="primary" onClick={this.clickHandle}><h2>Follow</h2></Button>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{author.name}</Card.Title>
                                    <hr></hr>
                                    <div className='d-flex flex-row bd-highlight my-5'>
                                        <div className='w-25'>
                                            <Card.Subtitle className="mb-4 ">Website : </Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">Born : </Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">Member since : </Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">URL : </Card.Subtitle>
                                        </div>
                                        <div>
                                            <Card.Subtitle className="mb-4 ">{author.website}</Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">{author.born} </Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">{author.memberSince}</Card.Subtitle>
                                            <Card.Subtitle className="mb-4 ">{author.url}</Card.Subtitle>
                                        </div>

                                    </div>
                                    <Card.Text >
                                       {author.brief}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <Container >
                    <Row className='author-detail'>
                        <Col>
                            <Listing list={this.state.data} viewType='grid' viewControls={false}>
                                <CardBrief />
                            </Listing>
                        </Col>

                    </Row>
                </Container>
            </>
        )
    }
}


export default AuthorDetails;