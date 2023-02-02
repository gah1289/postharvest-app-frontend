import logo from '../Images/windham-logo-blue.svg';
import './Signup.css';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useNavigate } from 'react-router-dom';
import PostharvestApi from '../api';
import ItemContext from '../ItemContext';

function Signup() {
	const { setIsLoggedIn, user } = useContext(ItemContext);
	const INITIAL_STATE = {
		username  : 'casey',
		password  : 'password',
		firstName : 'Casey',
		lastName  : 'LaCourse',
		email     : 'caseylacourse@gmail.com',
		jobTitle  : 'Engineer'
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
			setErrors(e[0]);
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="signup-bg">
			<div>
				<Container className="signup-form">
					<Row className="postharvest-banner justify-content-center">Sign Up</Row>
					<Row>
						<Form className="login-form" onSubmit={handleSubmit}>
							<Row>
								<FormGroup row>
									<Label sm={2} for="firstName">
										First Name:{' '}
									</Label>
									<Col sm={5}>
										<Input
											name="firstName"
											// required={true}
											id="firstName"
											type="text"
											value={formData.firstName || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label sm={2} for="lastName">
										Last Name:{' '}
									</Label>
									<Col sm={5}>
										<Input
											name="lastName"
											// required={true}
											id="lastName"
											type="text"
											value={formData.lastName || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label sm={2} for="email">
										Email:{' '}
									</Label>
									<Col sm={5}>
										<Input
											name="email"
											// required={true}
											id="email"
											type="email"
											value={formData.email || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label sm={2} for="jobTitle">
										Job Title:{' '}
									</Label>
									<Col sm={5}>
										<Input
											name="jobTitle"
											// required={true}
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
									<Label sm={2} for="username">
										Username:{' '}
									</Label>
									<Col sm={5}>
										<Input
											name="username"
											invalid={usernameError}
											id="username"
											// required={true}
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
											// required={true}
											type="password"
											value={formData.password || ''}
											onChange={handleChange}
										/>
									</Col>
								</FormGroup>
								<button>Sign Up</button>
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
