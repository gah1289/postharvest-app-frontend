import '../Commodity';
import { v4 as uuid } from 'uuid';
import React, { useState, useContext } from 'react';
import { Table, Modal, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import PostharvestApi from '../../api';
import ItemContext from '../../ItemContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import AddTempForm from './AddTempForm';
import EditTempForm from './EditTempForm';

function TemperatureData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, temperatureRecommendations } = commodity.commodity;

	const { user } = useContext(ItemContext);

	const [
		editMode,
		setEditMode
	] = useState(false);
	const [
		showEditTempForm,
		setShowEditTempForm
	] = useState(false);

	const [
		editTempData,
		setEditTempData
	] = useState();
	const [
		showAddTempForm,
		setShowAddTempForm
	] = useState(false);

	const editTempForm = () => {
		showEditTempForm ? setShowEditTempForm(false) : setShowEditTempForm(true);
	};

	const toggleAddTempForm = () => {
		showAddTempForm ? setShowAddTempForm(false) : setShowAddTempForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			<CardTitle tag="h2">
				Storage{' '}
				{user.current.isAdmin && (
					<a onClick={toggleAddTempForm} className="edit-commodity-link">
						<FontAwesomeIcon icon=" fa-circle-plus" />
					</a>
				)}
				{user.current.isAdmin && (
					<a className="edit-commodity-link" onClick={toggleEdit}>
						{!editMode && <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />}
						{editMode && <FontAwesomeIcon icon="fa-eye" />}
					</a>
				)}
			</CardTitle>
			<Table>
				{temperatureRecommendations.length ? (
					<thead>
						<tr>
							<th>Description</th>
							<th>Minimum Temperature ({'\u00b0'}C)</th>
							<th>Optimum Temperature</th>
							<th>Relative Humidity</th>
							<th />
						</tr>
					</thead>
				) : (
					<thead>
						<tr>
							<td>No Data Entered yet</td>
						</tr>
					</thead>
				)}
				<tbody>
					<Modal key={uuid()} isOpen={showEditTempForm} toggle={editTempForm}>
						<EditTempForm tempData={editTempData} />
					</Modal>

					{temperatureRecommendations.map((t) => (
						<tr className={!showEditTempForm ? 'edit-mode ' : 'view-mode'} key={uuid()}>
							<td>{t.description}</td>
							<td>{t.minTemp}</td>
							<td>{t.optimumTemp}</td>
							<td>{t.rh}</td>
							<td>
								<a
									className={editMode ? 'edit-mode edit edit-commodity-link' : 'view-mode'}
									onClick={() => {
										setEditTempData(t);
										editTempForm(id);
									}}
								>
									<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
								</a>
								<a
									className={editMode ? 'edit-mode delete' : 'view-mode'}
									onClick={() => {
										PostharvestApi.deleteTempRec(t.id);
										window.location.reload(false);
									}}
								>
									<FontAwesomeIcon icon=" fa-solid fa-circle-xmark" />
								</a>
							</td>
						</tr>
					))}
					<tr />
				</tbody>
			</Table>

			<Modal key={uuid()} isOpen={showAddTempForm} toggle={toggleAddTempForm}>
				<AddTempForm id={id} />
			</Modal>
		</div>
	);
}

export default TemperatureData;
