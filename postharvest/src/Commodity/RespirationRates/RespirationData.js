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

import AddRespirationForm from './AddRespiration';
import EditRespirationForm from './EditRespiration';

function RespirationData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, respirationRate, climacteric } = commodity.commodity;

	const { user } = useContext(ItemContext);

	// Loop through each object in respirationRate, set the first object that has a rrClass value as respirationClass value.
	let respirationClass;
	function getRespirationClass() {
		if (respirationRate.length) {
			for (let resp of respirationRate) {
				if (resp.rrClass !== '') {
					respirationClass = resp.rrClass;
					break;
				}
			}
			// I entered 'mod' for some commodities. That was dumb.
			if (respirationClass === 'mod') respirationClass = 'moderate';
		}
	}
	getRespirationClass();

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
			<CardTitle tag="h2">
				Respiration{' '}
				{user.current.isAdmin && (
					<a onClick={toggleAddRespirationForm} className="edit-commodity-link">
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
			{climacteric === true && <CardTitle className="climacteric">Climacteric</CardTitle>}
			{climacteric === false && <CardTitle className="climacteric">Non-Climacteric</CardTitle>}
			{respirationClass && <CardTitle className="commodity-class">Class: {respirationClass}</CardTitle>}
			<div className="table-responsive">
				<Table>
					{respirationRate.length ? (
						<thead>
							<tr>
								<th>Temperature ({'\u00b0'}C)</th>
								<th>Respiration Rate (ml/kg·hr)</th>

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

								<td className="edit-col">
									<a
										className={editMode ? 'edit-mode edit edit-commodity-link' : 'view-mode'}
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
										<FontAwesomeIcon icon="  fa-circle-xmark" />
									</a>
								</td>
							</tr>
						))}
						<tr />
					</tbody>
				</Table>

				<Modal key={uuid()} isOpen={showAddRespirationForm} toggle={toggleAddRespirationForm}>
					<AddRespirationForm id={id} />
				</Modal>
			</div>
		</div>
	);
}

export default RespirationData;
