// import React, { useState } from 'react';
// import JoblyApi from '../api';
// import './Jobs.css';
// import { Button } from 'reactstrap';

// function CommoditySearchForm({ filterJobs }) {
// 	const INITIAL_STATE = {
// 		title     : undefined,
// 		minSalary : undefined,
// 		hasEquity : undefined
// 	};
// 	const [
// 		formData,
// 		setFormData
// 	] = useState(INITIAL_STATE);

// 	const [
// 		numResultsMsg,
// 		setNumResultsMsg
// 	] = useState();

// 	const handleChange = (e) => {
// 		let { name, value } = e.target;

// 		setFormData((formData) => ({ ...formData, [name]: value }));
// 	};

// 	const checkboxChange = (e) => {
// 		let { name, value } = e.target;
// 		e.target.checked ? (value = true) : (value = false);

// 		setFormData((formData) => ({ ...formData, [name]: value }));
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		// filter out jobs by search form data.
// 		const filteredJobs = await JoblyApi.getJobs({
// 			title     : formData.title,
// 			minSalary : formData.minSalary,
// 			hasEquity : formData.hasEquity
// 		});
// 		filterJobs(filteredJobs);
// 		setNumResultsMsg(`Found: ${filteredJobs.length} results`);
// 		setFormData(INITIAL_STATE);
// 	};

// 	return (
// 		<form className="jobs-form" onSubmit={handleSubmit}>
// 			<h2>Search by:</h2>
// 			<div>
// 				<label htmlFor="title">Title: </label>
// 				<input
// 					name="title"
// 					id="title"
// 					type="text"
// 					placeholder="Job Title"
// 					value={formData.title || ''}
// 					onChange={handleChange}
// 				/>
// 			</div>{' '}
// 			<div>
// 				<label>Minimum Salary: </label>
// 				<input
// 					name="minSalary"
// 					id="minSalary"
// 					type="number"
// 					placeholder="Minimum Salary"
// 					value={formData.minSalary || ''}
// 					onChange={handleChange}
// 				/>

// 				<label htmlFor="hasEquity">Equity </label>
// 				<input
// 					name="hasEquity"
// 					id="hasEquity"
// 					type="checkbox"
// 					value={formData.hasEquity || ''}
// 					onChange={checkboxChange}
// 				/>
// 			</div>{' '}
// 			<Button color="secondary">Search</Button>
// 			<div className="found-results">{numResultsMsg}</div>
// 		</form>
// 	);
// }

// export default JobSearchForm;
