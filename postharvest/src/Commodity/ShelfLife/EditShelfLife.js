// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function EditShelfLifeForm(shelfLifeData) {
	console.log(shelfLifeData);
	library.add(faPlus);

	const { id, temperature, shelfLife, description, packaging } = shelfLifeData.shelfLifeData;

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
			await PostharvestApi.updateShelfLifeData(id, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Edit Shelf Life Data</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="temperature">Temperature ({'\u00b0'}C):</Label>
						<Input
							type="number"
							name="temperature"
							id="temperature"
							placeholder={temperature}
							onChange={handleChange}
							value={formData.temperature || ''}
						/>
						<Label htmlFor="shelfLife">Shelf Life:</Label>
						<Input
							type="text"
							name="shelfLife"
							id="shelfLife"
							onChange={handleChange}
							placeholder={shelfLife}
							value={formData.shelfLife || ''}
						/>
						<Label htmlFor="packaging">Packaging:</Label>
						<Input
							type="text"
							name="packaging"
							id="packaging"
							onChange={handleChange}
							placeholder={packaging}
							value={formData.packaging || ''}
						/>
						<Label htmlFor="description">Description:</Label>
						<Input
							type="text"
							name="description"
							id="description"
							placeholder={description}
							onChange={handleChange}
							value={formData.description || ''}
						/>

						<button>Make Changes</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditShelfLifeForm;
