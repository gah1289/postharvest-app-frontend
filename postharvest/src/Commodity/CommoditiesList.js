import React, { useEffect, useState, useContext } from 'react';

import './Commodities.css';
import { Spinner, Modal, Form, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import CommoditySearchForm from './CommoditySearchForm';
import AddCommodityForm from './AddCommodity';
import ItemContext from '../ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function CommoditiesList() {
	library.add(faPlus);
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
		<div>
			<h1>Commodities</h1>
			<CommoditySearchForm filterCommodities={filterCommodities}> </CommoditySearchForm>
			{user.current.isAdmin && (
				<button onClick={addCommodityForm}>
					<FontAwesomeIcon icon="fa-solid fa-plus" /> Commodity
				</button>
			)}
			<Modal key={uuid()} isOpen={showAddCommodityForm} toggle={addCommodityForm}>
				<AddCommodityForm />
			</Modal>

			<ListGroup>
				{commodities.map((commodity) => (
					<ListGroupItem key={uuid()} href={`/commodity/${commodity.id}`} tag="a">
						{commodity.commodityName} <span className="muted">{commodity.variety} </span>
					</ListGroupItem>
				))}
			</ListGroup>
		</div>
	);
}

export default CommoditiesList;
