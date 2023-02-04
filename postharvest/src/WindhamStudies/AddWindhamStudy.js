// import '../Commodities.css';

import React, { useState } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

function AddWindhamStudyForm(id) {
	library.add(faPlus);
	const commodityId = id.id;

	const INITIAL_STATE = {
		title     : '0',
		objective : '0',
		source    : '',
		date      : ''
	};

	const [
		commodities,
		setCommodities
	] = useState([]);

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
			const data = await PostharvestApi.addRespirationData(commodityId, formData);
			console.log(data);
			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	useEffect(() => {
		async function getCommodities() {
			let res = await PostharvestApi.getCommodities();
			setCommodities(res.commodities);
			setIsLoading(false);
		}
		getCommodities();
	}, []);

	const selectOptions = [];
	function getSelectOptions() {
		for (let commodity of commodities) {
			if (commodity.variety) {
				selectOptions.push(
					<option value={commodity.id}>
						{' '}
						{commodity.commodityName}, {commodity.variety}{' '}
					</option>
				);
			}
			else {
				selectOptions.push(
					<option key={commodity.id} value={commodity.commodityId}>
						{commodity.commodityName}
					</option>
				);
			}
		}
	}
	getSelectOptions();
	selectOptions.map((option) => console.log(option));

	return (
		<div>
			<ModalHeader>Add Shelf Life Study</ModalHeader>
			<ModalBody>
				<Form onSubmit={handleSubmit}>
					<FormGroup>
						<Label htmlFor="title">Title:</Label>
						<Input
							type="text"
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
						<Label htmlFor="source">Commodities:</Label>
						<select name="source" id="commodities">
							{selectOptions.map((option) => option)}
						</select>
						<Input
							type="select"
							name="source"
							id="source"
							onChange={handleChange}
							value={formData.source || ''}
						/>{' '}
						<Label htmlFor="source">Source:</Label>
						<Input
							type="file"
							name="source"
							id="source"
							onChange={handleChange}
							value={formData.source || ''}
						/>{' '}
						<button>Add Study</button>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default AddWindhamStudyForm;
