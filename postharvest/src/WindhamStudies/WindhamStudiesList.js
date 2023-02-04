import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, InputGroup, Table, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';

function StudiesList() {
	library.add(faDownload);

	const navigate = useNavigate();

	const [
		studies,
		setStudies
	] = useState([]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const filterStudies = (s) => {
		setStudies(s);
	};
	const location = useLocation();

	useEffect(() => {
		async function getStudies(data) {
			if (location.state) {
				setStudies(location.state.props);
			}
			else {
				try {
					let studiesFromApi = await PostharvestApi.getStudies();
					filterStudies(studies);
					setStudies(studiesFromApi);
				} catch (e) {
					if (e[0] === 'Unauthorized') {
						return navigate('/');
					}
				}
			}

			setIsLoading(false);
		}
		getStudies();
	}, []);

	if (isLoading) {
		return;
	}

	console.log('studies', studies);

	return (
		<div>
			<h1>Studies</h1>
			<Row className="  justify-content-center text-center">
				<Col xs="2" />
				<Col className="search-bar">
					<Form className="d-flex flex-row mb-3 justify-content-center">
						<InputGroup>
							<Input placeholder="Search by title..." />
						</InputGroup>
					</Form>
				</Col>
				<Col xs="2" />
			</Row>
			{/* {!location.state ? <JobSearchForm filterJobs={filterJobs} /> : ''} */}
			<Table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Date</th>
						<th>Objective</th>
						<th>Commodities</th>
					</tr>
				</thead>
				<tbody>
					{/* {studies.map((s) => console.log(s.study.date.slice(0, 9)))} */}
					{studies.map((study) => (
						<tr key={uuid()}>
							<td>{study.study.title}</td>
							<td>{study.study.date}</td>
							<td>{study.study.objective}</td>
							<td>
								{study.study.commodities.map((c) => (
									<div>
										<a key={uuid()} href={`/commodity/${c.id}`}>
											{c.commodityName} {c.variety}
										</a>{' '}
									</div>
								))}
								<button>Add Commodity</button>
							</td>
							<td>
								<a href={study.study.source} download>
									<FontAwesomeIcon icon="fa-solid fa-download" />
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default StudiesList;
