import React, { useEffect, useState, useContext } from 'react';

import './Commodities.css';
import { Spinner, Modal, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import CommoditySearchForm from './CommoditySearchForm';
import AddCommodityForm from './AddCommodity';
import ItemContext from '../ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';

function CommoditiesList() {
	const iconList = Object.keys(Icons).filter((key) => key !== 'fas' && key !== 'prefix').map((icon) => Icons[icon]);

	library.add(...iconList);

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
		return <Spinner />;
	}

	return (
		<div className="commodities-list">
			<h1>Commodities</h1>
			<Row>
				<Col className="mb-3">
					<CommoditySearchForm filterCommodities={filterCommodities}> </CommoditySearchForm>
				</Col>
			</Row>

			<Modal key={uuid()} isOpen={showAddCommodityForm} toggle={addCommodityForm}>
				<AddCommodityForm />
			</Modal>

			{user.current.isAdmin && (
				<button onClick={addCommodityForm} className="add-commodity-btn">
					<FontAwesomeIcon className="variety-list" icon="plus" /> Add
				</button>
			)}

			<ListGroup className="commodities-list-group">
				{commodities.map((commodity) => (
					<ListGroupItem
						className="commodities-list-item"
						key={uuid()}
						href={`/commodity/${commodity.id}`}
						tag="a"
					>
						{commodity.commodityName}
						{commodity.variety && (
							<span className="variety-list">
								{' '}
								<FontAwesomeIcon icon="caret-right" /> {commodity.variety}{' '}
							</span>
						)}
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default CommoditiesList;
