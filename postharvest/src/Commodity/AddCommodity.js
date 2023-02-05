// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddCommodityForm() {
	library.add(faPlus);

	const INITIAL_STATE = {
		commodityName  : '',
		variety        : '',
		scientificName : '',
		coolingMethod  : ''
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
			await PostharvestApi.addCommodity(formData);

			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Add Commodity</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="commodityName">Commodity Name:</Label>
						<Input
							type="text"
							name="commodityName"
							id="commodityName"
							required
							onChange={handleChange}
							value={formData.commodityName || ''}
						/>
						<Label htmlFor="variety">Variety:</Label>
						<Input
							type="text"
							name="variety"
							id="variety"
							onChange={handleChange}
							value={formData.variety || ''}
						/>
						<Label htmlFor="scientificName">Scientific Name:</Label>
						<Input
							type="text"
							name="scientificName"
							id="scientificName"
							onChange={handleChange}
							value={formData.scientificName || ''}
						/>
						<Label htmlFor="coolingMethod">Cooling Methods:</Label>
						<Input
							type="textarea"
							name="coolingMethod"
							id="coolingMethod"
							onChange={handleChange}
							value={formData.coolingMethod || ''}
						/>
						<Label htmlFor="climacteric">Climacteric:</Label>
						<Input type="select" name="climacteric" id="climacteric" onChange={handleChange}>
							{' '}
							<option> </option>
							<option value={true}>Climacteric</option>
							<option value={false}>Non-climacteric</option>
						</Input>

						<button>Add Data</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddCommodityForm;
