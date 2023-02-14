import React, { useState, useEffect } from 'react';
import { Form, FormGroup, ModalBody, ModalHeader, Label, Input, Spinner } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import PostharvestApi from '../api';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';

// Show a list of all commodities. Have current commddities checked.
// Select commodoties, turn to array of [commodityIds]
// commodityId.map => PostharvestApi.addCommoditiesToShelflife(commodityIds)

function EditWindhamStudyCommodities(id) {
	library.add(faPlus, faCircleXmark);

	const INITIAL_STATE = { commodityId: [] };

	const [
		commodities,
		setCommodities
	] = useState(new Set());
	const [
		allCommodities,
		setAllCommodities
	] = useState([]);

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const [
		formData,
		setFormData
	] = useState(INITIAL_STATE);

	const handleChange = async (e) => {
		const { name, value } = e.target;

		if (e.target.checked) {
			commodities.add(value);
		}
		else {
			commodities.delete(value);
		}

		setFormData((formData) => ({ ...formData, [name]: commodities }));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const studyId = id.id.study.id;
			// if commodities are checked, add them to study
			if (commodities.size) {
				// if the study already has commodities, clear them.
				if (id.id.study.commodities.length) {
					await PostharvestApi.clearCommoditiesFromStudy(studyId);
				}
				await PostharvestApi.addCommoditiesToShelflife(commodities, studyId);
			}
			else {
				// if no commodities are checked, remove all commodities from study
				await PostharvestApi.clearCommoditiesFromStudy(studyId);
			}

			// refresh page and automatically show new data
			window.location.reload(false);
		} catch (e) {
			console.log({ e });
		}

		setFormData(INITIAL_STATE);
	};

	useEffect(() => {
		// Get all commodities from the database
		async function getCommodities() {
			let res = await PostharvestApi.getCommodities();
			setAllCommodities(res.commodities);
			setIsLoading(false);
		}

		getCommodities();
		//set the commodities that are currently associated with the study
		id.id.study.commodities.map((c) => setCommodities((commodities) => commodities.add(c.id), ...commodities));
	}, []);

	// List all commodities in the db as checkbox options. If a commodity is already associated with a study, the checkbox should be checked.

	const selectOptions = [];

	function getSelectOptions() {
		for (let commodity of allCommodities) {
			if (commodity.variety) {
				selectOptions.push(
					<div key={commodity.id}>
						<Label check>
							<Input
								type="checkbox"
								checked={commodities.has(commodity.id)}
								name="commodityId"
								onChange={handleChange}
								key={commodity.id}
								value={commodity.id}
							/>{' '}
							{commodity.commodityName},
							{commodity.variety}
						</Label>
					</div>
				);
			}
			else {
				selectOptions.push(
					<div key={commodity.id}>
						<Label check>
							<Input
								type="checkbox"
								onChange={handleChange}
								checked={commodities.has(commodity.id)}
								key={commodity.id}
								name="commodityId"
								value={commodity.id}
							/>{' '}
							{commodity.commodityName}
						</Label>
					</div>
				);
			}
		}
	}
	getSelectOptions();

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<ModalHeader>Associated Commodities: </ModalHeader>
			<ModalBody>
				<Form>
					<FormGroup>
						{selectOptions}
						<div className="modal-btn">
							<button onClick={handleSubmit}>Update Commodities</button>
						</div>
					</FormGroup>
				</Form>
			</ModalBody>
		</div>
	);
}

export default EditWindhamStudyCommodities;
