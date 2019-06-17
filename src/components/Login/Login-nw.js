import React from 'react';
import SimpleSchema from 'simpl-schema';

import { Form, Col, Button } from 'react-bootstrap';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

import { login } from '../../API';

class Login extends React.Component {

    constructor(args) {
        super(args);

        this.state = {
            email: '',
            password: '',
            validated: false,
            error: {
                email: false,
                password: false,
            },
            displayError: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // const form = event.currentTarget;
        const { email, password } = this.state;
        debugger;
        const validationContext = new SimpleSchema({
            email: {
                regEx: SimpleSchema.RegEx.Email,
                type: String,
                optional: false,
            },
            password: {
                type: String,
                optional: false,
            }
        }).newContext();
        validationContext.validate({ email, password });

        if (!(validationContext.isValid())) {

            let errorsArr = {
                email: false,
                password: false,
            };
            validationContext.validationErrors().forEach((a) => {
                errorsArr[a.name] = true;
                console.log(a.name);
            });

            this.setState({
                error: { ...this.state.error, ...errorsArr },
            });
        } else {
            //login request
            try {
                login({ email: this.state.email, password: this.state.password }, this.props.history)
            } catch (err) {

                this.setState({ ...this.state, error: { email: true, password: true }, displayError: true })
            }
        }
        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        return (
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
                className="login"
            >
                <div className="login-form">
                    {this.state.displayError && <div style={{ color: 'red' }}> Email or Password are incorrect</div>}
                    <Form.Row>
                        <Form.Group as={Col} md="3" controlId="validationCustom04">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Email" required className={'userName login-inputs ' + (this.state.error.email && 'is-invalid')} onChange={this.handleChange} />
                        </Form.Group>

                        <Form.Group as={Col} md="3" controlId="validationCustom05" className="login-passGroupForm">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" className={'login-inputs ' + (this.state.error.password && 'is-invalid')} required onChange={this.handleChange} />
                        </Form.Group>

                    </Form.Row>

                    <Button type="submit" className="login-btn">Submit</Button>
                </div>
            </Form>
        );
    }
}

export default connect()(withRouter(Login));
