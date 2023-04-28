import '../Commodity';
import { v4 as uuid } from 'uuid';
import React, { useState, useContext } from 'react';
import { Table, Modal, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ItemContext from '../../ItemContext';

import AddEthyleneForm from './AddEthylene';
import EditEthyleneForm from './EditEthylene';

function EthyleneData(commodity) {
	const { id, ethyleneSensitivity } = commodity.commodity;

	const { user } = useContext(ItemContext);

	// Loop through each object in ethyleneSensitivity, set the first object that has a c2h4Class value as ethylene class as the value.
	let ethyleneClass;
	function getEthyleneClass() {
		if (ethyleneSensitivity.length) {
			for (let eth of ethyleneSensitivity) {
				if (eth.c2h4Class !== '') {
					ethyleneClass = eth.c2h4Class;
					break;
				}
			}
		}
	}
	getEthyleneClass();

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

	return (
		<div>
			<CardTitle tag="h2">Ethylene </CardTitle>
			{ethyleneClass && <CardTitle className="commodity-class">Class: {ethyleneClass}</CardTitle>}
			<div className="table-responsive">
				<Table>
					{ethyleneSensitivity.length ? (
						<thead>
							<tr>
								<th>Temperature ({'\u00b0'}C)</th>
								<th>Ethylene Production (µl/kg·hr)</th>
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
								<td className="edit-col">
									{user.current.isAdmin && (
										<a
											onClick={() => {
												setEditEthyleneData(e);
												editEthyleneForm(id);
											}}
										>
											<i class="fa-light fa-pen" />
										</a>
									)}
								</td>
							</tr>
						))}
						<tr />
						{user.current.isAdmin && <AddEthyleneForm id={id} />}
					</tbody>
				</Table>
			</div>
			{/* <Modal key={uuid()} isOpen={showAddEthyleneForm} toggle={toggleAddEthyleneForm}>
				<AddEthyleneForm id={id} />
			</Modal> */}
		</div>
	);
}

export default EthyleneData;
