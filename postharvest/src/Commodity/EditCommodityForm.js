// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostharvestApi from '../api';

function EditCommodityForm(commodityData) {
	const { id, commodityName, variety, scientificName, coolingMethod, climacteric } = commodityData.commodityData;

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
			await PostharvestApi.editCommodity(id, formData);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Edit Commodity: {commodityName}</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="commodityName">Commodity Name:</Label>
						<Input
							type="text"
							name="commodityName"
							id="commodityName"
							placeholder={commodityName}
							onChange={handleChange}
							value={formData.commodityName || ''}
						/>
						<Label htmlFor="variety">Variety:</Label>
						<Input
							type="text"
							name="variety"
							id="variety"
							onChange={handleChange}
							placeholder={variety}
							value={formData.variety || ''}
						/>
						<Label htmlFor="scientificName">Scientific Name:</Label>
						<Input
							type="text"
							name="scientificName"
							id="scientificName"
							onChange={handleChange}
							placeholder={scientificName}
							value={formData.scientificName || ''}
						/>
						<Label htmlFor="coolingMethod">Cooling Methods:</Label>
						<Input
							type="textarea"
							name="coolingMethod"
							id="coolingMethod"
							placeholder={coolingMethod}
							onChange={handleChange}
							value={formData.coolingMethod || ''}
						/>
						<Label htmlFor="climacteric">Climacteric: </Label>
						<Input
							type="select"
							name="climacteric"
							id="climacteric"
							placeholder={climacteric ? 'Climacteric' : 'Non-climacteric'}
							onChange={handleChange}
						>
							{' '}
							<option value={null}> </option>
							<option value={true}>Climacteric</option>
							<option value={false}>Non-climacteric</option>
						</Input>
						<div className="modal-btn">
							<button
								disabled={
									!formData.climacteric &&
									!formData.commodityName &&
									!formData.variety &&
									!formData.coolingMethod &&
									!formData.scientificName
								}
							>
								Make Changes
							</button>
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditCommodityForm;
