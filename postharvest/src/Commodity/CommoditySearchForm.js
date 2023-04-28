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
	const showAll = async (e) => {
		e.preventDefault();
		// filter out commodities by search form data.
		const allCommodities = await PostharvestApi.getCommodities({});
		filterCommodities(allCommodities);
		setNumResultsMsg(`Found: ${allCommodities.commodities.length} results`);
		setFormData(INITIAL_STATE);
	};
	return (
		<Row className="  justify-content-center text-center">
			<Col className="search-bar">
				<Form className="d-flex flex-row mb-3 justify-content-center">
					<InputGroup>
						<Input
							name="commodityName"
							id="commodityName"
							value={formData.commodityName || ''}
							onChange={handleChange}
							placeholder="Search by fruit or vegetable..."
						/>
						<i class="fa-regular fa-magnifying-glass search-icon" />
					</InputGroup>
					<button
						onClick={handleSubmit}
						disabled={!formData.commodityName}
						id="filter"
						className="search-btn"
					>
						Search
					</button>
					<button onClick={showAll} id="all" className="search-btn">
						See All Commodities
					</button>
				</Form>
			</Col>

			<div className="found-results">{numResultsMsg}</div>
		</Row>
	);
}

export default CommoditySearchForm;
