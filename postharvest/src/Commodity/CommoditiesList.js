import React, { useEffect, useState, useContext } from 'react';

import './Commodities.css';
import { Spinner, Modal, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import CommoditySearchForm from './CommoditySearchForm';
import AddCommodityForm from './AddCommodity';
import ItemContext from '../ItemContext';

function CommoditiesList() {
	const { user } = useContext(ItemContext);
	const [
		commodities,
		setCommodities
	] = useState([
		{
			id             : '',
			commodityName  : '',
			variety        : '',
			scientificName : '',
			coolingMethod  : ''
		}
	]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const filterCommodities = (c) => {
		setCommodities(c.commodities);
	};

	useEffect(() => {
		async function getCommodities(data) {
			let commoditiesFromApi = await PostharvestApi.getCommodities(data);
			filterCommodities(commodities);
			setCommodities(commoditiesFromApi.commodities);

			setIsLoading(false);
		}
		getCommodities();
	}, []);

	const [
		showAddCommodityForm,
		setShowAddCommodityForm
	] = useState(false);

	const addCommodityForm = () => {
		showAddCommodityForm ? setShowAddCommodityForm(false) : setShowAddCommodityForm(true);
	};

	if (isLoading) {
		return <Spinner variant="primary" />;
	}

	return (
		<div className="commodities-list">
			<h1>Commodities</h1>
			<Row>
				<Col className="mb-3" id="list-search-bar">
					<CommoditySearchForm filterCommodities={filterCommodities}> </CommoditySearchForm>
				</Col>
			</Row>

			<Modal key={uuid()} isOpen={showAddCommodityForm} toggle={addCommodityForm}>
				<AddCommodityForm />
			</Modal>
			<div className="commodities-list-search-form">
				{user.current.isAdmin && (
					<button onClick={addCommodityForm} className="add-commodity-btn">
						<i class="fa-light fa-plus variety-list" />
						Add
					</button>
				)}
			</div>

			<ListGroup className="commodities-list-group">
				{commodities.map((commodity) => (
					<ListGroupItem
						className="commodities-list-item"
						key={uuid()}
						href={`/commodity/${commodity.id}`}
						tag="a"
					>
						{commodity.commodityName}
						{commodity.variety && <span className="variety-list"> {commodity.variety} </span>}
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default CommoditiesList;
