import './Login.css';
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import PostharvestApi from '../api';
import ItemContext from '../ItemContext';

function Login() {
	const { setIsLoggedIn, user } = useContext(ItemContext);
	const INITIAL_STATE = {
		username : '',
		password : ''
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
				<Container className="login-div ">
					<Row className="justify-content-center login-title">Log In</Row>
					<Form className="login-form" onSubmit={handleSubmit}>
						<FormGroup className="mb-3">
							<div className="label">
								<Label sm={2} for="username">
									Username{' '}
								</Label>
							</div>
							<Col>
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

						<FormGroup className="mb-3">
							<div className="label">
								<Label sm={2} for="password">
									Password{' '}
								</Label>{' '}
							</div>

							<Input
								invalid={pwError}
								name="password"
								id="password"
								type="password"
								value={formData.password || ''}
								onChange={handleChange}
							/>
							<FormFeedback>{errors}</FormFeedback>
						</FormGroup>
						<button>Log In</button>

						{/* <Button/> component on reactstrap keeps breaking by code >:(  */}
					</Form>
					<Container>
						<Row className="justify-content-center register-prompt text-align-center mt-3">
							Don't have an account?{' '}
							<div>
								<a href="signup/">Register here</a>
							</div>
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
