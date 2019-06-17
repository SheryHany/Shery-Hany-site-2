import React from 'react';
import { Card } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default class CardBrief extends React.Component {
    // constructor(props) {
    //     super(props);

    // }

    render() {
        const { id, title, cover, author } = this.props;
        return (
            <>
                <Card className="book-card book-card-brief">

                    <Card.Img variant="top" src={cover} alt={title} style={{ height: '22rem' }} />
                    <Card.Body>
                        <Card.Title className="book-card-title-brief"><Link to={`/book/${id}`}>{title}</Link></Card.Title>
                        <Card.Text>by <Link to={`/author/${author.id}`} >{author.name}</Link> </Card.Text>
                    </Card.Body>
                </Card>

            </>
        );
    }
}

