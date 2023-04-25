// In progress: form for adding a shelf life study.
// It's functioning and uploads a file path to the database
// TO DO:
// Figure out how to add that file to the public folder so it can be downloaded.
// figure out how to add comodities to link study to windham_studies_commodities table

// AddWindhamStudy.js -->

import React, { useState } from 'react';

import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import PostharvestApi from '../api';

function AddWindhamStudyForm() {
	const INITIAL_STATE = {
		title     : '',
		objective : '',
		source    : '',
		date      : '1990-01-01'
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
			formData.source = formData.source.replace(/ /g, '');
			const data = await PostharvestApi.addStudy(formData);

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
			<ModalHeader style={{ opacity: 1 }}>Add Shelf Life Study</ModalHeader>

			<ModalBody>
				<Form>
					<FormGroup>
						<Label htmlFor="title">Title:</Label>
						<Input
							type="text"
							required
							name="title"
							id="title"
							onChange={handleChange}
							value={formData.title || ''}
						/>
						<Label htmlFor="date">Date:</Label>
						<Input type="date" name="date" id="date" onChange={handleChange} value={formData.date || ''} />
						<Label htmlFor="objective">Objective:</Label>
						<Input
							type="textarea"
							name="objective"
							id="objective"
							onChange={handleChange}
							value={formData.objective || ''}
						/>{' '}
						<Label htmlFor="source">Source:</Label>
						<Input
							type="file"
							required
							name="source"
							id="source"
							onChange={handleChange}
							value={formData.source || ''}
						/>{' '}
						<div className="modal-btn">
							<button onClick={handleSubmit}>Add Study</button>{' '}
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddWindhamStudyForm;
