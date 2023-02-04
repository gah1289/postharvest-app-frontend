import React, { useEffect, useState, useContext } from 'react';
import PostharvestApi from '../api';
import './Commodities.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Spinner, Row, Col } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import ItemContext from '../ItemContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import TemperatureData from './TemperatureRecommendations/TemperatureData';

function Commodity() {
	library.add(faDownload, faCircleXmark, faPlus);
	const { isLoggedIn, user } = useContext(ItemContext);
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

	const [
		editMode,
		setEditMode
	] = useState(false);

	// const [
	// 	addTemp,
	// 	setAddTemp
	// ] = useState(false);

	const navigate = useNavigate();
	// const { user } = useContext(ItemContext);

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

	const {
		commodityName,
		variety,
		scientificName,
		coolingMethod,
		ethyleneSensitivity,
		shelfLife,
		temperatureRecommendations,
		windhamStudies
	} =
		commodity || undefined;

	// Handle temperature reccomendation data

	let tempData = 'No Data Entered Yet.';
	if (temperatureRecommendations.length) {
		tempData = (
			<div>
				<TemperatureData commodity={commodity} />
			</div>
		);
	}
	// Handle shelf life data

	// let shelfLifeData = 'No Data Entered Yet.';
	// if (shelfLife.length) {
	// 	shelfLifeData = (
	// 		<div>
	// 			<Table>
	// 				<thead>
	// 					<tr>
	// 						<th>Description</th>
	// 						<th>Temperature ({'\u00b0'}C)</th>
	// 						<th>Shelf Life</th>
	// 						<th>Packaging</th>
	// 						<th />
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					{shelfLife.map((s) => (
	// 						<tr key={uuid()}>
	// 							<td>{s.description}</td>
	// 							<td>{s.temperature}</td>
	// 							<td>{s.shelfLife}</td>
	// 							<td>{s.packaging}</td>
	// 							<td>
	// 								<a className={editMode ? 'edit-mode delete' : 'view-mode'} href="#">
	// 									<FontAwesomeIcon icon=" fa-solid fa-circle-xmark" />
	// 								</a>
	// 							</td>
	// 						</tr>
	// 					))}
	// 					<tr>
	// 						<button className={editMode ? 'edit-mode' : 'view-mode'}>
	// 							<FontAwesomeIcon icon="fa-solid fa-plus" /> Shelf Life Data
	// 						</button>
	// 					</tr>
	// 				</tbody>
	// 			</Table>
	// 		</div>
	// 	);
	// }
	// // Handle ethylene data

	// let ethyleneData = 'No Data Entered Yet.';

	// if (ethyleneSensitivity.length) {
	// 	ethyleneData = (
	// 		<div>
	// 			<CardSubtitle className="mb-2 text-muted" tag="h6">
	// 				Class: {ethyleneSensitivity[0].c2h4Class || 'Not listed yet'}
	// 			</CardSubtitle>
	// 			<Table>
	// 				<thead>
	// 					<tr>
	// 						<th>Temperature ({'\u00b0'}C)</th>
	// 						<th>
	// 							Ethylene Production <br />(µl/kg·hr)
	// 						</th>
	// 						<th />
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					{ethyleneSensitivity.map((e) => (
	// 						<tr key={uuid()}>
	// 							<td>{e.temperature}</td>
	// 							<td>{e.c2h4Production}</td>
	// 							<td>
	// 								<a className={editMode ? 'edit-mode delete' : 'view-mode'} href="#">
	// 									<FontAwesomeIcon icon=" fa-solid fa-circle-xmark" />
	// 								</a>
	// 							</td>
	// 						</tr>
	// 					))}
	// 					<tr>
	// 						<button className={editMode ? 'edit-mode' : 'view-mode'}>
	// 							<FontAwesomeIcon icon="fa-solid fa-plus" /> Ethylene Data
	// 						</button>
	// 					</tr>
	// 				</tbody>
	// 			</Table>
	// 		</div>
	// 	);
	// }

	// // Handle Windham Study data

	// let studyData = 'No Studies Entered Yet.';

	// if (windhamStudies.length) {
	// 	studyData = (
	// 		<div>
	// 			<Table>
	// 				<thead>
	// 					<tr>
	// 						<th>Date</th>
	// 						<th>Title</th>
	// 						<th>Objective</th>
	// 						<th />
	// 						<th />
	// 					</tr>
	// 				</thead>
	// 				<tbody>
	// 					{windhamStudies.map((s) => (
	// 						<tr key={uuid()}>
	// 							<td>{s.date.slice(0, 10)}</td>
	// 							<td>{s.title}</td>
	// 							<td>{s.objective}</td>
	// 							<td>
	// 								<a href={s.source} download>
	// 									<FontAwesomeIcon icon="fa-solid fa-download" />
	// 								</a>
	// 							</td>
	// 							<td>
	// 								<a className={editMode ? 'edit-mode delete' : 'view-mode'} href="#">
	// 									<FontAwesomeIcon icon=" fa-solid fa-circle-xmark" />
	// 								</a>
	// 							</td>
	// 						</tr>
	// 					))}
	// 					<tr>
	// 						<button className={editMode ? 'edit-mode' : 'view-mode'}>
	// 							<FontAwesomeIcon icon="fa-solid fa-plus" /> Shelf Life Study
	// 						</button>
	// 					</tr>
	// 				</tbody>
	// 			</Table>
	// 		</div>
	// 	);
	// }

	// console.log({ commodity });

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<Card key={uuid()} style={{ minWidth: '30vw' }} className="job-card">
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
						<Col>
							{user.current.isAdmin && <button onClick={toggleEdit}>{editMode ? 'View' : 'Edit'}</button>}
						</Col>
					</Row>
				</CardTitle>
				<CardSubtitle className="mb-2 text-muted" tag="h6">
					{scientificName}
				</CardSubtitle>
				<CardTitle tag="h2">Cooling Methods</CardTitle>
				{coolingMethod}
				<CardTitle tag="h2">Storage Recommendations</CardTitle>
				{tempData}
				{/* <CardTitle tag="h2">Shelf Life</CardTitle>
				{shelfLifeData}
				<CardTitle tag="h2">Ethylene Sensitivity</CardTitle>
				{ethyleneData}

				{user.current.isAdmin && <CardTitle tag="h2">Shelf Life Studies</CardTitle>}
				{user.current.isAdmin && studyData} */}
			</CardBody>
		</Card>
	);
}

export default Commodity;
