import React, { useEffect, useState, useContext } from 'react';
import PostharvestApi from '../api';
import './Commodities.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Card,
	CardBody,
	CardTitle,
	CardSubtitle,
	Spinner,
	Row,
	Col,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader
} from 'reactstrap';
import { v4 as uuid } from 'uuid';
import ItemContext from '../ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import TemperatureData from './TemperatureRecommendations/TemperatureData';
import EthyleneData from './EthyleneSensitivity/EthyleneData';
import ShelfLifeData from './ShelfLife/ShelfLifeData';
import RespirationData from './RespirationRates/RespirationData';
import ReferenceData from './References/ReferenceData';
import WindhamStudies from './WindhamStudies/WindhamStudyData';
import EditCommodityForm from './EditCommodityForm';

function Commodity() {
	const iconList = Object.keys(Icons).filter((key) => key !== 'fas' && key !== 'prefix').map((icon) => Icons[icon]);

	library.add(...iconList);

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

	const [
		showDeleteModal,
		setShowDeleteModal
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

	const { commodityName, variety, scientificName, coolingMethod } = commodity || undefined;

	const editCommodityForm = () => {
		showEditCommodityForm ? setShowEditCommodityForm(false) : setShowEditCommodityForm(true);
	};
	const deleteModal = () => {
		showDeleteModal ? setShowDeleteModal(false) : setShowDeleteModal(true);
	};

	return (
		<Card className="commodity-card-page" key={uuid()} style={{ minWidth: '30vw' }}>
			<Modal key={uuid()} isOpen={showEditCommodityForm} toggle={editCommodityForm}>
				<EditCommodityForm commodityData={commodity} />
			</Modal>
			<Modal key={uuid()} isOpen={showDeleteModal} toggle={deleteModal}>
				<ModalHeader>
					Are you sure you want to delete {commodityName} {variety}?
				</ModalHeader>
				<ModalBody>This cannot be undone.</ModalBody>
				<ModalFooter>
					<div className="modal-btn">
						<button className="delete-modal" onClick={deleteCommodity}>
							Delete {commodityName}
						</button>
					</div>
				</ModalFooter>
			</Modal>
			<CardBody className="commodity-card-body">
				<CardTitle tag="h1">
					<div className="back-to-commodities justify-content-left">
						{' '}
						<a href="/search">
							<FontAwesomeIcon icon="arrow-left" /> Commodities
						</a>
					</div>
					<Row>
						<Col>
							{commodityName}: {variety}
							{user.current.isAdmin && (
								<a
									className="edit-commodity-link"
									onClick={() => {
										editCommodityForm();
									}}
								>
									<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
								</a>
							)}
						</Col>
					</Row>
				</CardTitle>

				<CardSubtitle className="mb-2 scientific-name">{scientificName}</CardSubtitle>

				<CardTitle tag="h2">Cooling Methods</CardTitle>
				{coolingMethod}

				<TemperatureData commodity={commodity} />

				<ShelfLifeData commodity={commodity} />

				<RespirationData commodity={commodity} />

				<EthyleneData commodity={commodity} />

				{user.current.isAdmin && <WindhamStudies commodity={commodity} />}

				<ReferenceData commodity={commodity} />
				{user.current.isAdmin && (
					<button className="delete-commodity" onClick={deleteModal}>
						<FontAwesomeIcon icon="fa-solid fa-trash-can" /> Delete
					</button>
				)}
			</CardBody>
		</Card>
	);
}

export default Commodity;
