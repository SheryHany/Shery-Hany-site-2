

import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
// import { connect } from 'react-redux';
export default class AuthorCard extends React.Component {

    // constructor(props, context) {
    //     super(props, context);
    // }

    render() {
        const { id, image, name } = this.props;

        return (
            <>
                <Card className='author m-3'>
                    <Card.Img variant="top" src={image === "" ? "https://bobandsuewilliams.com/images/gray-1.jpg" : image} />
                    <Card.Body>
                        <Card.Title><NavLink to={`/author/${id}`}>{name}</NavLink>
                        </Card.Title>
                    </Card.Body>
                </Card>

            </>
        )
    }
}
