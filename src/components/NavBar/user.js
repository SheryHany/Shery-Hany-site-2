import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { logoutAction } from '../../actions/user';
import fallbackImage from '../../images/index.png';



class UserNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleTextInput = this.handleTextInput.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            searchValue: "",
            redirect: false
        }

    }
    onSubmit(e) {
        e.preventDefault();
        // this.setState({ redirect: true });
        this.props.history.push('/search/' + this.state.searchValue)
    }
    handleTextInput(event) {
        this.setState({ searchValue: event.target.value });
    }
    logout() {
        this.props.dispatch(logoutAction());
        this.props.history.push('/');
    }
    render() {
        const { user } = this.props;
        return (
            <Navbar expand="lg" className=" navigation">
                <Navbar.Brand >
                    <h1 className="navigation__logo"><FontAwesomeIcon icon={faBookmark} /> AwesomeReads</h1>
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/home" className="navigation__link">Home</Link>
                        <Link to="/categories" className="navigation__link">Categories</Link>
                        <Link to="/books" className="navigation__link">Books</Link>
                        <Link to="/authors" className="navigation__link">Authors</Link>
                    </Nav>
                    <Form onSubmit={this.onSubmit} >
                        <Form.Control size="lg" value={this.state.searchValue} type="text" placeholder="Search" onChange={this.handleTextInput} />
                    </Form>
                    {user &&
                        <>
                            <Link to="/profile">
                                <div className="navigation__user" style={{ backgroundImage: `url(${user.photo || fallbackImage})` }}></div>
                            </Link>
                            <div className="navigation__link" onClick={this.logout}>
                                <small>logout</small>
                            </div>
                        </>
                    }
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
const mapState2Props = (state) => ({ user: state.user });
export default connect(mapState2Props)(withRouter(UserNavbar))
