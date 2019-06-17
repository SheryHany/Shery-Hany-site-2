import React from 'react';
import Rater from 'react-rater'
import { Dropdown, Card, Row, Col, ButtonGroup, Button, Image } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


export default class BookDetailedCard extends React.Component {
    constructor(bookProps) {
        super(bookProps);
        this.state = {
            shelf: 'Want To Read',
            bookRate: 'Rate this book',

        }
        this.handleClick = this.handleClick.bind(this);


    }

    handleClick(e) {
        const value = e.target.value;
        this.setState({
            shelf: value,
        })
        if (value === 'Read') {
            this.setState({
                bookRate: 'My rating:',
            })
        }
    }



    render() {
        const { id, title, author, avgRating, cover } = this.props;
        return (
            <>
                <Card className="book-card book-card-detailed ">

                    <Row className="no-gutters">
                        <Col md={2} className="p-3">
                            <Image src={cover} alt={title} rounded fluid />
                        </Col>
                        <Col md={7}>
                            <Card.Body>
                                <h3 className="book-card-title book-card-title-detailed"> <Link to={`/book/${id}`}>{title}</Link></h3>
                                <h5 className="book-card-author">by <Link to={`/author/${author.id}`} >{author.name}</Link></h5>
                                <div>
                                    <span className="rater-lg"><Rater rating={avgRating} total={5} interactive={false} /></span>
                                    <span className="card-text"><small className="text-muted book-grey-text"> {avgRating} avg. rating</small></span>
                                </div>
                            </Card.Body>
                        </Col>
                        <Col md={3} className="shelfDropdown-container">
                            <Dropdown as={ButtonGroup} size="lg" >
                                <Button className="shelfDropdown-btn">{this.state.shelf}</Button>
                                <Dropdown.Toggle split id="dropdown-split-basic" className="shelfDropdown-btn" />
                                <Dropdown.Menu className="shelfDropdown-menu">
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Read">Read</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Currently Reading">Currently Reading</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={this.handleClick} value="Want to Read">Want to Read</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className="myAlign-center">
                                <small className="text-muted grey-text">{this.state.bookRate} </small>
                                <div className="rater-md">
                                    <Rater total={5} interactive={true} />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card>

            </>
        )
    }
}

