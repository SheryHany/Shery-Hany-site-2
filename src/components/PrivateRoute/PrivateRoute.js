import React from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
class PrivateRoute extends React.Component {


    render() {
        const { component: Component, user, ...rest } = this.props;
        debugger;
        return (
            <Route {...rest} render={(props) => (
                user
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        )
    }
}

const mapState2Props = (state) => ({ user: state.user });
export default connect(mapState2Props)(withRouter(PrivateRoute))
