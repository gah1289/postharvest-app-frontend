import logo from '../Images/windham-logo-blue.svg';
import './NotFound.css';
import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

function NotFound() {
	library.add(faUser);

	return (
		<div>
			<div className="banner">
				<Container>
					<Row className="  justify-content-center text-center">
						<Col xs="2" />
						<Col className="search-bar">404: Page Not Found</Col>
						<Col xs="2" />
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default NotFound;
