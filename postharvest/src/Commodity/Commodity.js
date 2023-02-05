import React, { useEffect, useState, useContext } from 'react';
import PostharvestApi from '../api';
import './Commodities.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Spinner, Row, Col, Modal } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import ItemContext from '../ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import TemperatureData from './TemperatureRecommendations/TemperatureData';
import EthyleneData from './EthyleneSensitivity/EthyleneData';
import ShelfLifeData from './ShelfLife/ShelfLifeData';
import RespirationData from './RespirationRates/RespirationData';
import ReferenceData from './References/ReferenceData';
import WindhamStudies from './WindhamStudies/WindhamStudyData';
import EditCommodityForm from './EditCommodityForm';

function Commodity() {
	library.add(faDownload, faCircleXmark, faPlus);
	const { user } = useContext(ItemContext);
	const { id } = useParams();
	const [
		commodity,
		setCommodity
	] = useState({
		id             : '',
		commodityName  : '',
		variety        : '',
		scientificName : '',
		coolingMethod  : '',
		climacteric    : ''
	});
	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const navigate = useNavigate();

	const [
		showEditCommodityForm,
		setShowEditCommodityForm
	] = useState(false);

	const deleteCommodity = async () => {
		try {
			await PostharvestApi.deleteCommodity(id);
			navigate('/search');
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		async function getCommodity(id) {
			let res = await PostharvestApi.getCommodity(id);

			setCommodity(res.commodity);

			setIsLoading(false);
		}
		getCommodity(id);
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	const { commodityName, variety, scientificName, coolingMethod, climacteric } = commodity || undefined;

	const editCommodityForm = () => {
		showEditCommodityForm ? setShowEditCommodityForm(false) : setShowEditCommodityForm(true);
	};

	return (
		<Card key={uuid()} style={{ minWidth: '30vw' }} className="job-card">
			<Modal key={uuid()} isOpen={showEditCommodityForm} toggle={editCommodityForm}>
				<EditCommodityForm commodityData={commodity} />
			</Modal>
			<CardBody>
				<CardTitle tag="h1">
					<Row>
						<Col>
							<a className="h5" href="/search">
								Back to Commodities
							</a>
						</Col>
						<Col>
							{commodityName}: {variety}
						</Col>
						<Col />
					</Row>
				</CardTitle>

				<CardSubtitle className="mb-2 text-muted" tag="h6">
					{scientificName}
				</CardSubtitle>
				{user.current.isAdmin && (
					<button
						onClick={() => {
							editCommodityForm();
						}}
					>
						Edit
					</button>
				)}
				<CardTitle tag="h2">Cooling Methods</CardTitle>
				{coolingMethod}
				{climacteric === true && <CardTitle tag="h2">Climacteric</CardTitle>}
				{climacteric === false && <CardTitle tag="h2">Non-Climacteric</CardTitle>}

				<CardTitle tag="h2">Storage Recommendations</CardTitle>
				<TemperatureData commodity={commodity} />
				<CardTitle tag="h2">Shelf Life</CardTitle>
				<ShelfLifeData commodity={commodity} />
				<CardTitle tag="h2">Respiration Rate </CardTitle>

				<RespirationData commodity={commodity} />
				<CardTitle tag="h2">Ethylene Sensitivity</CardTitle>
				<EthyleneData commodity={commodity} />

				{user.current.isAdmin && <CardTitle tag="h2">Shelf Life Studies</CardTitle>}
				{user.current.isAdmin && <WindhamStudies commodity={commodity} />}

				<CardTitle tag="h2">References</CardTitle>
				<ReferenceData commodity={commodity} />
				{user.current.isAdmin && <button onClick={deleteCommodity}>Delete {commodityName}</button>}
			</CardBody>
		</Card>
	);
}

export default Commodity;
