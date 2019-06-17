import React from 'react'
import AuthorListing from '../Author/Listing';
import BookListing from '../Book/Listing';
import TabsComponent from '../Tabs/Tabs';
import TabItemComponent from '../Tabs/Item';
import { Row, Col } from 'react-bootstrap';

const SearchResults = (props) => {
    console.log("re rendered search");
    // debugger;
    const { value, category } = props.match.params;

    return (

        <Row className="justify-content-center pt-4 no-gutters">
            <Col md={11} >
                <TabsComponent view="secondary" position="start" >
                    <TabItemComponent header="Books" >
                        <BookListing showControls={true} showSearchbox={false} searchValue={value || ""} categories={category && [category]} />
                    </TabItemComponent>
                    <TabItemComponent header="Authors" >
                        <AuthorListing showControls={true} showSearchbox={false} searchValue={value || ""} categories={category && [category]} />
                    </TabItemComponent>
                </TabsComponent>
            </Col>
        </Row>
    )
}

export default SearchResults