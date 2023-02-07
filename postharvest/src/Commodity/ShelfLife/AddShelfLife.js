// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddShelfLifeForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		temperature : '',
		shelfLife   : '',
		description : '',
		packaging   : ''
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
			const data = await PostharvestApi.addShelfLifeData(commodityId, formData);

			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="add-modal">
			<ModalHeader className="modal-header">Add Shelf Life Data</ModalHeader>
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
						<Label htmlFor="shelfLife">Shelf Life:</Label>
						<Input
							type="text"
							name="shelfLife"
							id="shelfLife"
							onChange={handleChange}
							value={formData.shelfLife || ''}
						/>
						<Label htmlFor="packaging">Packaging:</Label>
						<Input
							type="text"
							name="packaging"
							id="packaging"
							onChange={handleChange}
							value={formData.packaging || ''}
						/>
						<Label htmlFor="description">Description:</Label>
						<Input
							type="text"
							name="description"
							id="description"
							onChange={handleChange}
							value={formData.description || ''}
						/>
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

export default AddShelfLifeForm;
