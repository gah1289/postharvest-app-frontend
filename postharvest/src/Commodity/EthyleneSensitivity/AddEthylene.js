// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddEthyleneForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		temperature    : '',
		c2h4Production : '',
		c2h4Class      : ''
	};

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
			const data = await PostharvestApi.addEthyleneData(commodityId, formData);
			console.log(data);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Add Ethylene Data</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="temperature">Temperature ({'\u00b0'}C):</Label>
						<Input
							type="text"
							name="temperature"
							id="temperature"
							onChange={handleChange}
							value={formData.temperature || ''}
						/>
						<Label htmlFor="c2h4Production">Ethylene Production:</Label>
						<Input
							type="text"
							name="c2h4Production"
							id="c2h4Production"
							onChange={handleChange}
							value={formData.c2h4Production || ''}
						/>
						<Label htmlFor="c2h4Class">Ethylene Class:</Label>
						<Input
							type="text"
							name="c2h4Class"
							id="c2h4Class"
							onChange={handleChange}
							value={formData.c2h4Class || ''}
						/>

						<button>Add Data</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddEthyleneForm;
