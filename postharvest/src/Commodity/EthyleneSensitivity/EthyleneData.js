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
import AddEthyleneForm from './AddEthylene';
import EditEthyleneForm from './EditEthylene';

function EthyleneData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, ethyleneSensitivity } = commodity.commodity;

	const { user } = useContext(ItemContext);

	// const ethyleneClass = () => {
	// 	let ethyleneClass;
	// 	while (!ethyleneSensitivity.c2h4Class || ethyleneSensitivity.c2h4Class === '') {
	// 		ethyleneClass = commodity.ethyleneSensitivity;
	// 	}
	// 	return ethyleneClass;
	// };

	const [
		editMode,
		setEditMode
	] = useState(false);
	const [
		editEthyleneData,
		setEditEthyleneData
	] = useState();

	const [
		showAddEthyleneForm,
		setShowAddEthyleneForm
	] = useState(false);

	const toggleAddEthyleneForm = () => {
		showAddEthyleneForm ? setShowAddEthyleneForm(false) : setShowAddEthyleneForm(true);
	};

	const [
		showEditEthyleneForm,
		setShowEditEthyleneForm
	] = useState(false);

	const editEthyleneForm = () => {
		showEditEthyleneForm ? setShowEditEthyleneForm(false) : setShowEditEthyleneForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			<CardTitle tag="h2">
				Ethylene{' '}
				{user.current.isAdmin && (
					<a onClick={toggleAddEthyleneForm} className="edit-commodity-link">
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
			<CardTitle className="climacteric">Class: {ethyleneSensitivity[0].c2h4Class}</CardTitle>

			<Table>
				{ethyleneSensitivity.length ? (
					<thead>
						<tr>
							<th>Temperature ({'\u00b0'}C)</th>
							<th>Ethylene Production (µl/kg·hr)</th>
							<th>Class</th>

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
					<Modal key={uuid()} isOpen={showEditEthyleneForm} toggle={editEthyleneForm}>
						<EditEthyleneForm ethyleneData={editEthyleneData} />
					</Modal>

					{ethyleneSensitivity.map((e) => (
						<tr className={!showEditEthyleneForm ? 'edit-mode ' : 'view-mode'} key={uuid()}>
							<td>{e.temperature}</td>
							<td>{e.c2h4Production}</td>
							<td>{e.c2h4Class}</td>

							<td>
								<a
									className={editMode ? 'edit-mode edit' : 'view-mode'}
									onClick={() => {
										setEditEthyleneData(e);
										editEthyleneForm(id);
									}}
								>
									<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
								</a>
								<a
									className={editMode ? 'edit-mode delete' : 'view-mode'}
									onClick={() => {
										PostharvestApi.deleteEthyleneData(e.id);
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
			<button onClick={toggleAddEthyleneForm} className={editMode ? 'edit-mode add' : 'view-mode'}>
				<FontAwesomeIcon icon="fa-solid fa-plus" /> Ethylene Data
			</button>

			<Modal key={uuid()} isOpen={showAddEthyleneForm} toggle={toggleAddEthyleneForm}>
				<AddEthyleneForm id={id} />
			</Modal>
		</div>
	);
}

export default EthyleneData;
