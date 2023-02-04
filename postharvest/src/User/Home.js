import logo from '../Images/windham-logo-blue.svg';
import './Home.css';
import React, { useState } from 'react';
import { Container, Row, Col, InputGroup, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
	return (
		<div>
			<div className="banner">
				<Container>
					<Row className="postharvest-banner justify-content-center">Postharvest Database</Row>

					<Row className="  justify-content-center text-center">
						<Col xs="2" />
						<Col className="search-bar">
							<Form className="d-flex flex-row mb-3 justify-content-center">
								<InputGroup>
									<Input placeholder="Search by fruit or vegetable..." />
								</InputGroup>
							</Form>
						</Col>
						<Col xs="2" />
					</Row>
					<Row className="text-end link">
						<Col xs="2" />
						<Col>
							<a href="/search">Advanced Search</a>
						</Col>
						<Col xs="1" />
					</Row>
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

export default Home;
