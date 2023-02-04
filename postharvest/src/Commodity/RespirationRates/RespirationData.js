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

import AddRespirationForm from './AddRespiration';
import EditRespirationForm from './EditRespiration';

function RespirationData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, respirationRate } = commodity.commodity;

	const { user } = useContext(ItemContext);

	const [
		editMode,
		setEditMode
	] = useState(false);
	const [
		editRespirationData,
		setEditRespirationData
	] = useState();

	const [
		showAddRespirationForm,
		setShowAddRespirationForm
	] = useState(false);

	const toggleAddRespirationForm = () => {
		showAddRespirationForm ? setShowAddRespirationForm(false) : setShowAddRespirationForm(true);
	};

	const [
		showEditRespirationForm,
		setShowEditRespirationForm
	] = useState(false);

	const editRespirationForm = () => {
		showEditRespirationForm ? setShowEditRespirationForm(false) : setShowEditRespirationForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			{user.current.isAdmin && <button onClick={toggleEdit}>{editMode ? 'View' : 'Edit'}</button>}

			<Table>
				{respirationRate.length ? (
					<thead>
						<tr>
							<th>Temperature ({'\u00b0'}C)</th>
							<th>Respiration Rate</th>
							<th>Class</th>
							<th />
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
					<Modal key={uuid()} isOpen={showEditRespirationForm} toggle={editRespirationForm}>
						<EditRespirationForm respirationData={editRespirationData} />
					</Modal>

					{respirationRate.map((s) => (
						<tr className={!showEditRespirationForm ? 'edit-mode ' : 'view-mode'} key={uuid()}>
							<td>{s.temperature}</td>
							<td>{s.rrRate}</td>
							<td>{s.rrClass}</td>

							<td>
								<a
									className={editMode ? 'edit-mode edit' : 'view-mode'}
									onClick={() => {
										setEditRespirationData(s);
										editRespirationForm(id);
									}}
								>
									<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
								</a>
								<a
									className={editMode ? 'edit-mode delete' : 'view-mode'}
									onClick={() => {
										PostharvestApi.deleteRespirationData(s.id);
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
			<button onClick={toggleAddRespirationForm} className={editMode ? 'edit-mode add' : 'view-mode'}>
				<FontAwesomeIcon icon="fa-solid fa-plus" /> Respiration Rate
			</button>

			<Modal key={uuid()} isOpen={showAddRespirationForm} toggle={toggleAddRespirationForm}>
				<AddRespirationForm id={id} />
			</Modal>
		</div>
	);
}

export default RespirationData;
