// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddTempForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		minTemp     : '',
		optimumTemp : '',
		description : '',
		rh          : ''
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
			await PostharvestApi.addTempRec(commodityId, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div className="add-modal">
			<ModalHeader>Add Storage Recommendation</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="description">Description:</Label>
						<Input
							type="text"
							name="description"
							id="description"
							onChange={handleChange}
							value={formData.description || ''}
						/>
						<Label htmlFor="minTemp">Minimum Temperature:</Label>
						<Input
							type="text"
							name="minTemp"
							id="minTemp"
							onChange={handleChange}
							value={formData.minTemp || ''}
						/>
						<Label htmlFor="optimumTemp">Optimum Temperature:</Label>
						<Input
							type="text"
							name="optimumTemp"
							id="optimumTemp"
							onChange={handleChange}
							value={formData.optimumTemp || ''}
						/>
						<Label htmlFor="rh">Relative Humidity:</Label>
						<Input type="text" name="rh" id="rh" onChange={handleChange} value={formData.rh || ''} />
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

export default AddTempForm;
