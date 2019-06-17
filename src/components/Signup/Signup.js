import React from 'react';
import { Link } from 'react-router-dom';

import { Form, Overlay, Tooltip, Modal } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import { signup } from '../../API';
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: {
                email: '',
                name: '',
                password: '',
                passwordConfirm: ''
            },
            error: {
                email: false,
                name: false,
                password: false,
                passwordConfirm: false
            },
            valErrors: 0,
            signupModal: false,
            signupModalText: ""
        }
        this.validation = new SimpleSchema({
            name: {
                type: String,
                min: 3,
                max: 25,
                optional: false
            }
            , email: {
                type: String,
                regEx: SimpleSchema.RegEx.Email,
                min: 5,
                max: 150,
                optional: false
            },
            password: {
                type: String,
                regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                min: 5,
                max: 150,
                optional: false
            },
            passwordConfirm: {
                type: String,
                optional: false
            }
        }).newContext();

        this.imageRef = React.createRef();
        this.inputHandler = this.inputHandler.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    inputHandler(event) {
        // debugger;
        const newInput = { ...this.state.input, [event.target.name]: event.target.value }
        this.validation.validate( //to validate all inputs each time
            newInput
        );
        //to validate only one input at a time
        const index = this.validation.validationErrors().findIndex(el => el.name === event.target.name);
        let temp;
        if (index > -1)
            temp = { [event.target.name]: true };
        else
            temp = { [event.target.name]: false };

        if (newInput.password !== newInput.passwordConfirm)
            temp.passwordConfirm = true;
        //for submit button
        let invalid = false;
        const errors = { ...this.state.error, ...temp };
        for (const key in errors) {
            if (errors[key]) {
                invalid = true;
                break;
            }
        }
        this.setState({
            input: { ...this.state.input, [event.target.name]: event.target.value },
            error: { ...this.state.error, ...temp }, //for form controls
            valErrors: invalid //for submit button
        });

    }
    onSubmit(e) {
        e.preventDefault();
        this.validation.validate(
            { ...this.state.input }
        );
        const errors = this.validation.validationErrors();
        if (errors.length === 0 && this.state.input.password === this.state.input.passwordConfirm) {
            //api call
            const form = new FormData();
            const { name, email, password } = this.state.input;
            form.append('name', name);
            form.append('email', email);
            form.append('password', password);
            form.append('photo', this.imageRef.current.files[0]);
            try {
                signup(form, this.props.history)
            }
            catch (err) {
                this.setState({ ...this.state, signupModal: true, signupModalText: err.response.data.message });
            }

        } else {
            let temp = { name: false, email: false, password: false, passwordConfirm: false };
            this.validation.validationErrors().forEach((el) => {
                temp[el.name] = true; //to capture any invalid values
            })
            if (this.state.input.password !== this.state.input.passwordConfirm)
                temp.passwordConfirm = true;

            //for submit button disabling
            let invalid = false;
            const { error } = this.state;
            for (const key in error) {
                if (error[key]) {
                    invalid = true;
                    break;
                }
            }
            this.setState({
                error: temp,
                valErrors: invalid
            });
        }
    }
    handleClose = (e) => {
        this.setState({ ...this.state, signupModal: false });
    }
    render() {
        const { error, input } = this.state;
        return (
            <>
                <Form className="d-flex flex-column signup" onSubmit={this.onSubmit} encType="multipart/form-data">
                    <div className="signup__text">Already have an account? <Link to="/Login">Sign in</Link></div>

                    <div className="signup__header">New here? Create a free account!</div>
                    <Form.Group >
                        <Form.Control size="lg" className={error.name && 'is-invalid'} value={input.name} type="text" name="name" placeholder="Your Name" onChange={this.inputHandler} />
                    </Form.Group>
                    <Form.Group >
                        <Form.Control size="lg" className={error.email && 'is-invalid'} value={input.email} type="text" name="email" placeholder="Enter Email" onChange={this.inputHandler} />
                    </Form.Group>
                    <Form.Group>

                        <Form.Control ref={this.passRef} size="lg" className={error.password && 'is-invalid'} value={input.password} type="password" name="password" placeholder="Password" onChange={this.inputHandler} />

                        <Overlay target={this.state.target} show={error.password} placement="left">
                            {props => (
                                <Tooltip  {...props}>
                                    * Password must be at least 8 characters long
                                    and contain 1 lowercase letter and 1 uppercase letter
                                    and 1 special character
                            </Tooltip>
                            )}
                        </Overlay>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control size="lg" className={error.passwordConfirm && 'is-invalid'} value={input.passwordConfirm} type="password" name="passwordConfirm" placeholder="Confirm Password" onChange={this.inputHandler} />

                    </Form.Group>
                    <Form.Group>
                        Image: <input type="file" name="photo" ref={this.imageRef} />
                    </Form.Group>
                    <button className="signup__submit" type="submit" disabled={this.state.valErrors}>
                        Submit
                </button>
                </Form>

                <Modal show={this.state.signupModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Unable to Sign up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.signupModalText}</Modal.Body>
                </Modal>
            </>
        )
    }
}



export default connect()(withRouter(SignUp));
