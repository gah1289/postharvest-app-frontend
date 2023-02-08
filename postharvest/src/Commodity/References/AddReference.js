// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddReferenceForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		source : ''
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
			const data = await PostharvestApi.addReference(commodityId, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader className="add-modal">Add Reference</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="source">Source :</Label>
						<Input
							type="text"
							name="source"
							id="source"
							onChange={handleChange}
							value={formData.source || ''}
						/>

						<div className="modal-btn">
							<button>
								<FontAwesomeIcon icon="plus" /> Reference
							</button>
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddReferenceForm;
