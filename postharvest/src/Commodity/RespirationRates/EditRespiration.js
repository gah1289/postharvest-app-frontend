// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function EditRespirationForm(respirationData) {
	library.add(faPlus);

	const { id, temperature, rrRate, rrClass } = respirationData.respirationData;

	const INITIAL_STATE = {};

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const handleChange = async (e) => {
		const { name, value } = e.target;
		console.log(name, value);

		setFormData((formData) => ({ ...formData, [name]: value }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await PostharvestApi.updateRespirationData(id, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Edit Respiration Rate</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="temperature">Temperature ({'\u00b0'}C):</Label>
						<Input
							type="text"
							name="temperature"
							id="temperature"
							placeholder={temperature}
							onChange={handleChange}
							value={formData.temperature || ''}
						/>
						<Label htmlFor="rrRate">
							Respiration Rate<br /> (ml/kg·hr)
						</Label>
						<Input
							type="text"
							name="rrRate"
							id="rrRate"
							onChange={handleChange}
							placeholder={rrRate}
							value={formData.rrRate || ''}
						/>
						<Label htmlFor="rrClass">Class:</Label>
						<Input
							type="text"
							name="rrClass"
							id="rrClass"
							onChange={handleChange}
							placeholder={rrClass}
							value={formData.rrClass || ''}
						/>

						<button>Make Changes</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditRespirationForm;
