import './Signup.css';
import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useNavigate } from 'react-router-dom';
import PostharvestApi from '../api';
import ItemContext from '../ItemContext';

function Signup() {
	const { setIsLoggedIn, user } = useContext(ItemContext);
	const INITIAL_STATE = {
		username  : '',
		password  : '',
		firstName : '',
		lastName  : '',
		email     : '',
		jobTitle  : ''
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
			const userData = await PostharvestApi.register(formData);
			setIsLoggedIn(true);
			user.current = userData.user;
			navigate('/');
		} catch (e) {
			setPwError(true);
			console.log(e[0]);
			setErrors(e[0]);
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="signup-bg">
			<div>
				<Container className="signup-form">
					<Row className="signup-title justify-content-center">Sign Up</Row>
					<Row>
						<Form className="login-form" onSubmit={handleSubmit}>
							<Row>
								<FormGroup row>
									<div className="label">
										<Label for="firstName">First Name: </Label>{' '}
									</div>
									<Col>
										<Input
											name="firstName"
											required
											id="firstName"
											type="text"
											value={formData.firstName || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<div className="label">
										<Label for="lastName">Last Name: </Label>
									</div>
									<Col>
										<Input
											name="lastName"
											required
											id="lastName"
											type="text"
											value={formData.lastName || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<div className="label">
										<Label for="email">Email: </Label>
									</div>
									<Col>
										<Input
											name="email"
											required
											id="email"
											type="email"
											value={formData.email || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<div className="label">
										<Label for="jobTitle">Job Title: </Label>
									</div>
									<Col>
										<Input
											name="jobTitle"
											id="jobTitle"
											type="text"
											value={formData.jobTitle || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
							</Row>
							<div className="separator" />
							<Row>
								<FormGroup row>
									<div className="label">
										<Label for="username">Username: </Label>
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
								<FormGroup row>
									<div className="label">
										<Label for="password">Password: </Label>{' '}
									</div>
									<Col>
										<Input
											invalid={pwError}
											name="password"
											id="password"
											type="password"
											value={formData.password || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<div className="text-align-center">
									<button>Sign Up</button>
								</div>
								<FormFeedback>{errors}</FormFeedback>
							</Row>
							{/* <Button/> component on reactstrap keeps breaking by code >:(  */}
						</Form>
					</Row>
				</Container>
			</div>
			<div className="footer" />
		</div>
	);
}

export default Signup;
