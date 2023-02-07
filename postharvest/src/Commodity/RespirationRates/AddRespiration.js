// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddRespirationForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		temperature : '',
		rrRate      : '',
		rrClass     : ''
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
			const data = await PostharvestApi.addRespirationData(commodityId, formData);
			console.log(data);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="add-modal">
			<ModalHeader>Add Respiration Rate</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="temperature">Temperature ({'\u00b0'}C):</Label>
						<Input
							type="number"
							name="temperature"
							id="temperature"
							required
							onChange={handleChange}
							value={formData.temperature || ''}
						/>
						<Label htmlFor="rrRate">Respiration Rate (ml/kg·hr)</Label>
						<Input
							type="text"
							name="rrRate"
							id="rrRate"
							onChange={handleChange}
							value={formData.rrRate || ''}
						/>
						<Label htmlFor="rrClass">Class:</Label>
						<Input
							type="text"
							name="rrClass"
							id="rrClass"
							onChange={handleChange}
							value={formData.rrClass || ''}
						/>{' '}
						<div className="modal-btn">
							<button>
								<FontAwesomeIcon icon="plus" /> Data
							</button>
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddRespirationForm;
