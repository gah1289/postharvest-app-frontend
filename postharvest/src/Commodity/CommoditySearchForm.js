import React, { useState } from 'react';
import PostharvestApi from '../api';
import './Commodities.css';
import { Row, Col, Form, Input, InputGroup } from 'reactstrap';

function CommoditySearchForm({ filterCommodities }) {
	const INITIAL_STATE = {
		commodityName : undefined
	};
	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);
	const [
		numResultsMsg,
		setNumResultsMsg
	] = useState();
	const handleChange = (e) => {
		let { name, value } = e.target;
		setFormData((formData) => ({ ...formData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// filter out commodities by search form data.
		const filteredCommodities = await PostharvestApi.getCommodities({
			commodityName : formData.commodityName
		});
		filterCommodities(filteredCommodities);
		setNumResultsMsg(`Found: ${filteredCommodities.commodities.length} results`);
		setFormData(INITIAL_STATE);
	};
	return (
		<Row className="  justify-content-center text-center">
			<Col xs="2" />
			<Col className="search-bar">
				<Form onSubmit={handleSubmit} className="d-flex flex-row mb-3 justify-content-center">
					<InputGroup>
						<Input
							name="commodityName"
							id="commodityName"
							value={formData.commodityName || ''}
							onChange={handleChange}
							placeholder="Search by fruit or vegetable..."
						/>
					</InputGroup>
					<button disabled={!formData.commodityName} className="search-btn">
						Search
					</button>
				</Form>
			</Col>
			<Col xs="2" />
			<div className="found-results">{numResultsMsg}</div>
		</Row>
	);
}

export default CommoditySearchForm;
