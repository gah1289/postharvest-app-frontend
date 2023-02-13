// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function EditTempForm(tempData) {
	library.add(faPlus);

	const { id, minTemp, optimumTemp, description, rh } = tempData.tempData;

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
			await PostharvestApi.updateTempRec(id, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Edit Storage Recommendation</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="description">Description:</Label>
						<Input
							type="text"
							name="description"
							id="description"
							placeholder={description}
							onChange={handleChange}
							value={formData.description || ''}
						/>
						<Label htmlFor="minTemp">Minimum Temperature ({'\u00b0'}C):</Label>
						<Input
							type="text"
							name="minTemp"
							id="minTemp"
							onChange={handleChange}
							placeholder={minTemp}
							value={formData.minTemp || ''}
						/>
						<Label htmlFor="optimumTemp">Optimum Temperature ({'\u00b0'}C):</Label>
						<Input
							type="text"
							name="optimumTemp"
							id="optimumTemp"
							onChange={handleChange}
							placeholder={optimumTemp}
							value={formData.optimumTemp || ''}
						/>
						<Label htmlFor="rh">Relative Humidity:</Label>
						<Input
							type="text"
							name="rh"
							id="rh"
							placeholder={rh}
							onChange={handleChange}
							value={formData.rh || ''}
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

export default EditTempForm;
