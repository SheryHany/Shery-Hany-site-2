import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SignUp from '../Signup/Signup';
import books from '../../data/books';
import authors from '../../data/authors';
import Listing from '../Listing/Listing';
import CardBrief from '../Book/Card-brief';
import TabsComponent from '../Tabs/Tabs';
import TabItemComponent from '../Tabs/Item';
import AuthorCard from '../Author/Card';
import CardSlider from '../CardSlider/Slider';
import { connect } from 'react-redux';
import { getUserInfo } from '../../API';
import { loginAction } from '../../actions/user';

class HomeComponent extends React.Component {
    state = {
        mostViewed: [],
        featured: [],
        newArrivals: [],
        popularAuthors: []
    }
    async componentDidMount() {
        if (this.props.user == null && localStorage.getItem('AwesomeReads')) {
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
        this.setState({ mostViewed: books, featured: books, newArrivals: books, popularAuthors: authors });
    }
    render() {
        return (
            <>
                <Row className="justify-content-around p-5 no-gutters home-cover ">
                    <Col md={8} >
                        <div className="home-heading">
                            Meet your next favourite book
                        </div>
                    </Col>
                    <Col md={3}>
                        {
                            !this.props.user &&
                            <SignUp />
                        }
                    </Col>
                </Row>
                <Row className="no-gutters section justify-content-center">
                    <Col md={9}>
                        <TabsComponent >
                            <TabItemComponent header="New Arrivals" >
                                <Listing list={this.state.newArrivals} viewType='grid' viewControls={false}>
                                    <CardBrief />
                                </Listing>
                            </TabItemComponent>
                            <TabItemComponent header="Featured" >
                                <Listing list={this.state.featured} viewType='grid' viewControls={false}>
                                    <CardBrief />
                                </Listing>
                            </TabItemComponent>
                        </TabsComponent>
                    </Col>
                </Row>
                <Row className="no-gutters section section--bg  justify-content-center">
                    <Col md={12}>
                        <div className="heading heading--1">Popular Authors</div>
                        <CardSlider list={this.state.popularAuthors} >
                            <AuthorCard />
                        </CardSlider>
                        {/* <Listing list={this.state.popularAuthors} viewType='grid' viewControls={false}>
                            
                        </Listing> */}
                    </Col>
                </Row>
            </>


        )
    }
}

const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(HomeComponent);