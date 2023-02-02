import logo from '../Images/windham-logo-blue.svg';
import './Login.css';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';
import PostharvestApi from '../api';
import ItemContext from '../ItemContext';

function Login() {
	const { setIsLoggedIn, user } = useContext(ItemContext);
	const INITIAL_STATE = {
		username : 'gah1289',
		password : 'password'
	};

	const [
		pwError,
		setPwError
	] = useState(false);
	const [
		errors,
		setErrors
	] = useState();

	const [
		usernameError,
		setUsernameError
	] = useState(false);

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const navigate = useNavigate();

	const handleChange = async (e) => {
		const { name, value } = e.target;
		setPwError(false);
		setUsernameError(false);
		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		let { username, password } = formData;
		e.preventDefault();

		if (!formData.username) {
			setUsernameError(true);
		}
		if (!formData.password) {
			setPwError(true);
			setErrors([
				'Password required'
			]);
		}

		try {
			const userData = await PostharvestApi.login(formData);
			setIsLoggedIn(true);
			user.current = userData.user;
			navigate('/');
		} catch (e) {
			setPwError(true);
			setErrors(e[0]);
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<div className="banner">
				<Container>
					<Row className="postharvest-banner justify-content-center">Log In</Row>
					<Row>
						<Form className="login-form" onSubmit={handleSubmit}>
							<FormGroup row>
								<Label sm={2} for="username">
									Username:{' '}
								</Label>
								<Col sm={5}>
									<Input
										name="username"
										invalid={usernameError}
										id="username"
										type="text"
										value={formData.username || ''}
										onChange={handleChange}
									/>
									<FormFeedback>Username Required.</FormFeedback>
								</Col>
							</FormGroup>
							<FormGroup row>
								<Label sm={2} for="password">
									Password:{' '}
								</Label>{' '}
								<Col sm={5}>
									<Input
										invalid={pwError}
										name="password"
										id="password"
										type="password"
										value={formData.password || ''}
										onChange={handleChange}
									/>
									<FormFeedback>{errors}</FormFeedback>
								</Col>
							</FormGroup>
							<button>Log In</button>
							{/* <Button/> component on reactstrap keeps breaking by code >:(  */}
						</Form>
					</Row>
					<Container>
						<Row className="justify-content-center text-center">
							Don't have an account? <a href="signup/">Register here</a>
						</Row>
					</Container>
				</Container>
			</div>
			<div className="footer">
				<Container>
					<Row className="justify-content-center text-center">Created by Gabriela McCarthy</Row>
				</Container>
			</div>
		</div>
	);
}

export default Login;
