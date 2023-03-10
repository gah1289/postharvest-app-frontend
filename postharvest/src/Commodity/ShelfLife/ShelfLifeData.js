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
import AddShelfLifeForm from './AddShelfLife';
import EditShelfLifeForm from './EditShelfLife';

function ShelfLifeData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, shelfLife } = commodity.commodity;

	const { user } = useContext(ItemContext);

	const [
		editMode,
		setEditMode
	] = useState(false);
	const [
		editShelfLifeData,
		setEditShelfLifeData
	] = useState();

	const [
		showAddShelfLifeForm,
		setShowAddShelfLifeForm
	] = useState(false);

	const toggleAddShelfLifeForm = () => {
		showAddShelfLifeForm ? setShowAddShelfLifeForm(false) : setShowAddShelfLifeForm(true);
	};

	const [
		showEditShelfLifeForm,
		setShowEditShelfLifeForm
	] = useState(false);

	const editShelfLifeForm = () => {
		showEditShelfLifeForm ? setShowEditShelfLifeForm(false) : setShowEditShelfLifeForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			<CardTitle tag="h2">
				Shelf Life{' '}
				{user.current.isAdmin && (
					<a onClick={toggleAddShelfLifeForm} className="edit-commodity-link">
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
			<div class="table-responsive">
				<Table>
					{shelfLife.length ? (
						<thead>
							<tr>
								<th>Temperature ({'\u00b0'}C)</th>
								<th>Shelf Life</th>
								<th>Packaging</th>
								<th>Description </th>
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
						<Modal key={uuid()} isOpen={showEditShelfLifeForm} toggle={editShelfLifeForm}>
							<EditShelfLifeForm shelfLifeData={editShelfLifeData} />
						</Modal>

						{shelfLife.map((s) => (
							<tr className={!showEditShelfLifeForm ? 'edit-mode ' : 'view-mode'} key={uuid()}>
								<td>{s.temperature}</td>
								<td>{s.shelfLife}</td>
								<td>{s.packaging}</td>
								<td>{s.description}</td>

								<td>
									{editMode && (
										<a
											className="edit-commodity-link"
											onClick={() => {
												setEditShelfLifeData(s);
												editShelfLifeForm(id);
											}}
										>
											<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
										</a>
									)}

									<a
										className={editMode ? 'edit-mode delete' : 'view-mode'}
										onClick={() => {
											PostharvestApi.deleteShelfLifeData(s.id);
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
			</div>
			<Modal key={uuid()} isOpen={showAddShelfLifeForm} toggle={toggleAddShelfLifeForm}>
				<AddShelfLifeForm id={id} />
			</Modal>
		</div>
	);
}

export default ShelfLifeData;
