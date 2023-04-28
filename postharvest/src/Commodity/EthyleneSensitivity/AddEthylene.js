import '../Commodities.css';
import React, { useState } from 'react';
import { Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostharvestApi from '../../api';

function AddEthyleneForm(id) {
	const commodityId = id.id;

	const INITIAL_STATE = {
		temperature    : '',
		c2h4Production : '',
		c2h4Class      : ''
	};

	const [
		showAddEthyleneForm,
		setShowAddEthyleneForm
	] = useState(false);

	const toggleAddEthyleneForm = () => {
		showAddEthyleneForm ? setShowAddEthyleneForm(false) : setShowAddEthyleneForm(true);
	};

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const handleChange = async (e) => {
		const { name, value } = e.target;

		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await PostharvestApi.addEthyleneData(commodityId, formData);

			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<tr className="add-data">
			{showAddEthyleneForm && (
				<td>
					<Input
						type="text"
						placeholder={`Temperature (\u00b0C)`}
						name="temperature"
						id="temperature"
						onChange={handleChange}
						value={formData.temperature || ''}
					>
						{' '}
					</Input>
				</td>
			)}

			{showAddEthyleneForm && (
				<td>
					<Input
						type="text"
						name="c2h4Production"
						placeholder="Ethylene Production"
						id="c2h4Production"
						onChange={handleChange}
						value={formData.c2h4Production || ''}
					/>
				</td>
			)}
			{!showAddEthyleneForm && (
				<td colSpan={3}>
					<a onClick={toggleAddEthyleneForm} className="edit-commodity-link">
						<i class="fa-solid fa-circle-plus" /> Ethylene Data
					</a>
				</td>
			)}
			{showAddEthyleneForm && (
				<td>
					<a onClick={handleSubmit} className="edit-commodity-link">
						<i class="fa-solid fa-floppy-disk" />
					</a>
					<a onClick={toggleAddEthyleneForm} className="edit-commodity-link">
						<i class="fa-regular fa-xmark" />
					</a>
				</td>
			)}
		</tr>
	);
}

export default AddEthyleneForm;
