// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function EditWindhamStudyForm(id) {
	library.add(faPlus);

	const { title, objective, date } = id.id.study;
	const studyId = id.id.study.id;

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
			const res = await PostharvestApi.updateStudy(studyId, formData);

			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	return (
		<div>
			<ModalHeader>Edit Study:</ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						<Label htmlFor="title">Title:</Label>
						<Input
							type="text"
							name="title"
							id="title"
							placeholder={title}
							onChange={handleChange}
							value={formData.title || ''}
						/>
						<Label htmlFor="objective">Objective</Label>
						<Input
							type="text"
							name="objective"
							id="objective"
							onChange={handleChange}
							placeholder={objective}
							value={formData.objective || ''}
						/>
						<Label htmlFor="date">Date:</Label>
						<Input
							type="date"
							name="date"
							id="date"
							onChange={handleChange}
							placeholder={date}
							value={formData.date || ''}
						/>

						<button onClick={handleSubmit}>Make Changes</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditWindhamStudyForm;
