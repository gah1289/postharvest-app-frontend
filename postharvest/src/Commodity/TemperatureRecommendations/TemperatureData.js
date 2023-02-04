import '../Commodity';
import { v4 as uuid } from 'uuid';
import React, { useState, useContext } from 'react';
import { Table, Modal } from 'reactstrap';
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

	const [
		addTemp,
		setAddTemp
	] = useState(false);

	const toggleAddTemp = () => {
		addTemp ? setAddTemp(false) : setAddTemp(true);
	};
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
		showAddTempForm,
		setShowAddTempForm
	] = useState(false);

	const editTempForm = () => {
		showEditTempForm ? setShowEditTempForm(false) : setShowEditTempForm(true);
	};

	const toggleAddTempForm = () => {
		console.log(showAddTempForm);
		showAddTempForm ? setShowAddTempForm(false) : setShowAddTempForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			{user.current.isAdmin && <button onClick={toggleEdit}>{editMode ? 'View' : 'Edit'}</button>}

			<Table>
				<thead>
					<tr>
						<th>Description</th>
						<th>Minimum Temperature ({'\u00b0'}C)</th>
						<th>Optimum Temperature</th>
						<th>Relative Humidity</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{temperatureRecommendations.map((t) => (
						<Modal key={uuid()} isOpen={showEditTempForm} toggle={editTempForm}>
							<EditTempForm tempData={t} />
						</Modal>
					))}
					{temperatureRecommendations.map((t) => (
						<tr className={!showEditTempForm ? 'edit-mode add' : 'view-mode'} key={uuid()}>
							<td>{t.description}</td>
							<td>{t.minTemp}</td>
							<td>{t.optimumTemp}</td>
							<td>{t.rh}</td>
							<td>
								<a
									className={editMode ? 'edit-mode edit' : 'view-mode'}
									onClick={() => {
										editTempForm(id);
										// PostharvestApi.updateTempRec(t.id);
										// window.location.reload(false);
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
			<button onClick={toggleAddTempForm} className={editMode ? 'edit-mode add' : 'view-mode'}>
				<FontAwesomeIcon icon="fa-solid fa-plus" /> Storage Recommendation
			</button>

			<Modal key={uuid()} isOpen={showAddTempForm} toggle={toggleAddTempForm}>
				<AddTempForm id={id} />
			</Modal>
		</div>
	);
}

export default TemperatureData;
