import './Home.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardGroup, Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CommoditySearchForm from '../Commodity/CommoditySearchForm';
import PostharvestApi from '../api';

function Home() {
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
		filteredCommodities,
		setFilteredCommodities
	] = useState([]);

	const filterCommodities = (c) => {
		setCommodities(c.commodities);
		setFilteredCommodities(c.commodities);
	};

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	function setCards(filteredCommodities) {
		let cards = [];
		for (let commodity of filteredCommodities) {
			cards.push(
				<a href={`commodity/${commodity.id}`}>
					<Card>
						{commodity.commodityName} {commodity.variety}
					</Card>
				</a>
			);
		}
	}

	if (filteredCommodities) {
		setCards(filteredCommodities);
	}

	useEffect(() => {
		async function getCommodities(data) {
			let commoditiesFromApi = await PostharvestApi.getCommodities(data);
			filterCommodities(commodities);
			setCommodities(commoditiesFromApi.commodities);

			setIsLoading(false);
		}
		getCommodities();
	}, []);

	if (isLoading) return <Spinner variant="primary" />;

	return (
		<div>
			<div className="banner">
				<Container>
					<Row className="postharvest-banner justify-content-center ">Postharvest Database</Row>
					<CommoditySearchForm filterCommodities={filterCommodities} />

					<Row className="text-end link">
						<a href="/search">See all commodities</a>
					</Row>
					<div className="text-center home-page-commodities">
						{filteredCommodities && (
							<CardGroup className="cards">
								{filteredCommodities.map((commodity) => (
									<a href={`commodity/${commodity.id}`}>
										<Card className="commodity-card-home" key={commodity.id}>
											<div className="commodity-name">{commodity.commodityName} </div>{' '}
											<div className="variety-home">{commodity.variety} </div>{' '}
										</Card>
									</a>
								))}
							</CardGroup>
						)}
					</div>
				</Container>
			</div>

			<div className="footer">
				<Container>
					<Row className="justify-content-center text-center">Created by Gabriela McCarthy</Row>
					<Row>
						<Col>
							<a href="https://windhampkg.com/">Windham Packaging, LLC</a>
						</Col>
					</Row>
				</Container>
			</div>
		</div>
	);
}

export default Home;
