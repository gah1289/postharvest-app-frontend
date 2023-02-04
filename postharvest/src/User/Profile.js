import React, { useContext, useState } from 'react';
import {
	Row,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Spinner,
	FormFeedback,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter
} from 'reactstrap';
import ItemContext from '../ItemContext';
import { Navigate, useNavigate } from 'react-router-dom';
import PostharvestApi from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import './Profile.css';

function Profile() {
	library.add(faCheck);
	const { user, isLoggedIn, isLoading } = useContext(ItemContext);

	const navigate = useNavigate();

	const INITIAL_STATE = {};

	// set form data to be submitted for update
	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	// Change password

	const [
		changePwInvalid,
		setChangePwInvalid
	] = useState(false);

	const [
		changePwError,
		setChangePwError
	] = useState();

	const [
		confirmPw,
		setConfirmPw
	] = useState(true);

	const checkPasswordsMatch = (e) => {
		const { name, value } = e.target;

		if (value !== formData.password) {
			setChangePwInvalid(true);
			setChangePwError(`Passwords don't match`);
		}
		else {
			setChangePwInvalid(false);
			setFormData({ password: formData.password });
		}
	};

	// verify current password before submitting changes

	const [
		modal,
		setModal
	] = useState(false);

	const toggle = (e) => {
		e.preventDefault();
		modal ? setModal(false) : setModal(true);
	};

	const [
		checkPwInvalid,
		setCheckPwInvalid
	] = useState(false);

	const [
		checkPwError,
		setCheckPwError
	] = useState();

	const verifyPassword = async (e) => {
		const { name, value } = e.target;
		setConfirmPw(value);
	};

	const [
		success,
		setSuccess
	] = useState();

	const handleChange = async (e) => {
		const { name, value } = e.target;

		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async () => {
		// When user succesfully enters current password and data, submit and cancel buttons are replaced by a checkmark indicating the chage was successful. Redirects to home page.
		try {
			const userRes = await PostharvestApi.updateUser(user.current.username, confirmPw, {
				username : user.current.username,
				...formData
			});

			user.current = userRes;
			setSuccess(true);
			setTimeout(() => {
				return navigate('/');
			}, 1000);
		} catch (e) {
			setCheckPwInvalid(true);
			setCheckPwError('Incorrect Password');
		}
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (!isLoggedIn) {
		// redirect to login if user is not logged in
		return <Navigate to="/login" />;
	}

	return (
		<div className="profile-bg">
			{/*Modal:  Verify password before submitting changes.  */}
			<Modal isOpen={modal}>
				<ModalHeader>Please Enter Current Password</ModalHeader>
				<ModalBody>
					<Row>
						<Form>
							<Input
								type="password"
								name="currPw"
								id="currPw"
								onChange={verifyPassword}
								invalid={checkPwInvalid}
							/>
							<FormFeedback>{checkPwError}</FormFeedback>
						</Form>
					</Row>
				</ModalBody>
				<ModalFooter>
					{success ? (
						<FontAwesomeIcon icon="fa-solid fa-check" />
					) : (
						<div>
							<button className="primary" onClick={handleSubmit}>
								Submit
							</button>
							<button className="secondary" onClick={() => setModal(false)}>
								Cancel
							</button>
						</div>
					)}
				</ModalFooter>
			</Modal>
			<Form className="profile-form">
				<h1>{user.current.firstName}'s Profile</h1>

				<FormGroup row>
					<Label for="username" sm={2}>
						Username
					</Label>
					<Col sm={5}>
						<Input
							type="text"
							name="username"
							id="username"
							placeholder={user.current.username}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>

				<FormGroup row>
					<Label for="firstName" sm={2}>
						First Name
					</Label>
					<Col sm={5}>
						<Input
							type="text"
							name="firstName"
							id="firstName"
							placeholder={user.current.firstName}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>

				<FormGroup row>
					<Label for="lastName" sm={2}>
						Last Name
					</Label>
					<Col sm={5}>
						<Input
							type="text"
							name="lastName"
							id="lastName"
							placeholder={user.current.lastName}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="email" sm={2}>
						Email
					</Label>
					<Col sm={5}>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder={user.current.email}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label for="jobTitle" sm={2}>
						Job Title
					</Label>
					<Col sm={5}>
						<Input
							type="text"
							name="jobTitle"
							id="jobTitle"
							placeholder={user.current.jobTitle}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>

				<div className="separator" />
				<h2>Change Password</h2>
				<div>
					<FormGroup row>
						<Label for="password" sm={2}>
							New Password
						</Label>
						<Col sm={5}>
							<Input type="password" name="password" id="password" onChange={handleChange} />
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label for="password" sm={2}>
							Re-enter Password to Confirm
						</Label>
						<Col sm={5}>
							<Input
								type="password"
								name="reEnterPassword"
								id="reEnterPassword"
								invalid={changePwInvalid}
								onChange={handleChange && checkPasswordsMatch}
							/>
							<FormFeedback>{changePwError}</FormFeedback>
						</Col>
					</FormGroup>
					<Col sm={{ size: 5, offset: 2 }}>
						<button onClick={toggle}>Submit Changes</button>
					</Col>
				</div>
			</Form>
		</div>
	);
}

export default Profile;
