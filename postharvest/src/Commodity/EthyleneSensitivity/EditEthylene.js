// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function EditEthyleneForm(ethyleneData) {
	library.add(faPlus);

	const { id, temperature, c2h4Class, c2h4Production } = ethyleneData.ethyleneData;

	const INITIAL_STATE = {};

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
			await PostharvestApi.updateEthyleneData(id, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="edit-modal">
			<ModalHeader>Edit Ethylene Data</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="temperature">Temperature ({'\u00b0'}C):</Label>
						<Input
							type="text"
							name="temperature"
							id="temperature"
							onChange={handleChange}
							placeholder={temperature}
							value={formData.temperature || ''}
						/>
						<Label htmlFor="c2h4Production">Ethylene Production:</Label>
						<Input
							type="text"
							name="c2h4Production"
							id="c2h4Production"
							onChange={handleChange}
							placeholder={c2h4Production}
							value={formData.c2h4Production || ''}
						/>
						<Label htmlFor="c2h4Class">Ethylene Class:</Label>
						<Input
							type="text"
							name="c2h4Class"
							id="c2h4Class"
							onChange={handleChange}
							placeholder={c2h4Class}
							value={formData.c2h4Class || ''}
						/>
						<div className="modal-btn">
							<button>Edit</button>
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditEthyleneForm;
