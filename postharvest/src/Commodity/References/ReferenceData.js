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

import AddReferenceForm from './AddReference';

function ReferenceData(commodity) {
	library.add(faPlus, faPenToSquare);
	const { id, references } = commodity.commodity;

	const { user } = useContext(ItemContext);

	const [
		editMode,
		setEditMode
	] = useState(false);

	const [
		showAddReferenceForm,
		setShowAddReferenceForm
	] = useState(false);

	const toggleAddReferenceForm = () => {
		showAddReferenceForm ? setShowAddReferenceForm(false) : setShowAddReferenceForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	return (
		<div>
			{user.current.isAdmin && <button onClick={toggleEdit}>{editMode ? 'View' : 'Edit'}</button>}

			<Table>
				{references.length ? (
					<thead>
						<tr>
							<th />

							<th />
							<th />
						</tr>
					</thead>
				) : (
					<thead>
						<tr>
							<td>No References Entered Yet</td>
						</tr>
					</thead>
				)}

				<tbody>
					{references.map((r) => (
						<tr key={uuid()}>
							<td>{r.source}</td>

							<td>
								<a
									className={editMode ? 'edit-mode delete' : 'view-mode'}
									onClick={() => {
										PostharvestApi.deleteReference(r.commodityId, r.source);
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
			<button onClick={toggleAddReferenceForm} className={editMode ? 'edit-mode add' : 'view-mode'}>
				<FontAwesomeIcon icon="fa-solid fa-plus" /> Reference
			</button>

			<Modal key={uuid()} isOpen={showAddReferenceForm} toggle={toggleAddReferenceForm}>
				<AddReferenceForm id={id} />
			</Modal>
		</div>
	);
}

export default ReferenceData;
