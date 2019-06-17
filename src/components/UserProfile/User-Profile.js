import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import BookListing from '../Book/Listing';
import Loading from '../Loading/Loading';
import { getUserInfo } from '../../API';
import { loginAction } from '../../actions/user';
import fallbackImg from '../../images/index.png';

class UserProfile extends React.Component {

    async componentDidMount() {
        if (this.props.user == null) {
            const props = this.props;
            try {
                const user = await getUserInfo();
                props.dispatch(loginAction(user));
            } catch (err) {
                debugger;
                localStorage.removeItem('AwesomeReads');
                props.history.push('/login');
            }
        }
    }
    render() {
        const { user } = this.props;
        // console.log(this.props.match.params);
        debugger;
        return (
            user ?
                <Row className="justify-content-center m-5">
                    <Col md={9} className="d-flex flex-column">
                        <Row className="p-5">
                            <Col md={3}>
                                <Image src={user.photo || fallbackImg} roundedCircle fluid style={{ height: '20rem', }} />
                            </Col>
                            <Col md={9} className="user-details">
                                <div className="border-bottom pb-3 name"><strong>{user.name}</strong></div>
                                <Row className="pt-3">
                                    <Col md={2}><strong>Email:</strong></Col>
                                    <Col md={10}>{user.email}</Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <BookListing showControls={true} showSearchbox={true} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                : <Loading />

        )
    }
}

const mapStateToProps = state => {
    return { user: state.user || null };
};
export default connect(mapStateToProps)(UserProfile);