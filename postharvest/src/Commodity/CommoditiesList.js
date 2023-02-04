import React, { useEffect, useState } from 'react';

import './Commodities.css';
import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';

function CommoditiesList() {
	const [
		commodities,
		setCommodities
	] = useState([
		{
			id             : 'id',
			commodityName  : 'Test Commodity',
			variety        : 'Test',
			scientificName : 'Test',
			coolingMethod  : 'Test',
			climacteric    : true
		}
	]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const filterCommodities = (c) => {
		setCommodities(c);
	};
	const location = useLocation();

	useEffect(() => {
		async function getCommodities(data) {
			if (location.state) {
				setCommodities(location.state.props);
			}
			else {
				let commoditiesFromApi = await PostharvestApi.getCommodities();
				filterCommodities(commodities);
				setCommodities(commoditiesFromApi.commodities);
			}

			setIsLoading(false);
		}
		getCommodities();
	}, []);

	if (isLoading) {
		return;
	}

	return (
		<div>
			<h1>Commodities</h1>
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
			{/* {!location.state ? <JobSearchForm filterJobs={filterJobs} /> : ''} */}
			<ListGroup>
				{commodities.map((commodity) => (
					<ListGroupItem key={uuid()} href={`/commodity/${commodity.id}`} tag="a">
						{commodity.commodityName}, {commodity.variety}
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default CommoditiesList;
