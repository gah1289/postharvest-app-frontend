import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import './WindhamStudies.css';

import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Table, Modal, Spinner } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import AddWindhamStudyForm from './AddWindhamStudy';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import EditWindhamStudyForm from './EditWindhamStudy';
import EditWindhamStudyCommodities from './EditWindhamStudyCommodities;';
import ItemContext from '../ItemContext';

function StudiesList() {
	const iconList = Object.keys(Icons).filter((key) => key !== 'fas' && key !== 'prefix').map((icon) => Icons[icon]);

	library.add(...iconList);

	const { user } = useContext(ItemContext);

	const navigate = useNavigate();

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	// Set all studies in db
	const [
		studies,
		setStudies
	] = useState([]);

	// Add study form
	const [
		showAddStudyForm,
		setShowAddStudyForm
	] = useState(false);

	const addStudyForm = () => {
		showAddStudyForm ? setShowAddStudyForm(false) : setShowAddStudyForm(true);
	};

	// false - hide edit and delete buttons next to each study
	// true - show
	const [
		editMode,
		setEditMode
	] = useState(false);

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	// edit study form
	const [
		showEditStudyForm,
		setShowEditStudyForm
	] = useState(false);

	const [
		editStudyData,
		setEditStudyData
	] = useState();

	const editStudyForm = () => {
		showEditStudyForm ? setShowEditStudyForm(false) : setShowEditStudyForm(true);
	};

	// checklist for all commodities. Used to set associated commodities with each study
	const [
		showEditCommodityForm,
		setShowEditCommodityForm
	] = useState(false);

	// array for commodities associated with each study
	const [
		editCommodityData,
		setEditCommodityData
	] = useState();

	const editCommodityForm = () => {
		showEditCommodityForm ? setShowEditCommodityForm(false) : setShowEditCommodityForm(true);
	};

	// Set up for eventual filtering of studies
	// const filterStudies = (s) => {
	// 	setStudies(s);
	// };
	// const location = useLocation();

	useEffect(() => {
		async function getStudies(data) {
			// if (location.state) {
			// 	setStudies(location.state.props);
			// }
			// else {
			try {
				let studiesFromApi = await PostharvestApi.getStudies();
				// filterStudies(studies);
				setStudies(studiesFromApi);
			} catch (e) {
				if (e[0] === 'Unauthorized') {
					return navigate('/');
				}
			}
			// }

			setIsLoading(false);
		}
		getStudies();
	}, []);

	if (isLoading) {
		return <Spinner variant="primary" />;
	}

	if (!user.current.isAdmin) {
		return <Navigate to="/" />;
	}

	return (
		<div className="studies-list">
			{/* Studies list */}
			<h1 className="study-list-header">
				Windham Packaging Shelf Life Studies
				<div className="study-list-header">
					<a className="  edit-list" onClick={addStudyForm}>
						Add <FontAwesomeIcon icon=" fa-circle-plus" />
					</a>
					{!editMode && (
						<a className="edit-list" onClick={toggleEdit}>
							Edit <FontAwesomeIcon icon=" fa-edit" />
						</a>
					)}
					{editMode && (
						<a className="edit-list" onClick={toggleEdit}>
							<FontAwesomeIcon icon=" fa-eye" />
						</a>
					)}
				</div>
			</h1>
			{/* Add study modal */}
			<Modal key={uuid()} isOpen={showAddStudyForm} toggle={addStudyForm}>
				<AddWindhamStudyForm />
			</Modal>
			{/* Edit study commodities modal */}
			<Modal key={uuid()} isOpen={showEditCommodityForm} toggle={editCommodityForm}>
				<EditWindhamStudyCommodities id={editCommodityData} />
			</Modal>
			{/* Edit study modal */}
			<Modal key={uuid()} isOpen={showEditStudyForm} toggle={editStudyForm}>
				<EditWindhamStudyForm id={editStudyData} />
			</Modal>

			{/* List of studies */}
			<div className="table-responsive">
				<Table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Date</th>
							<th>Objective</th>
							<th>Commodities</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{studies.map((study) => (
							<tr key={uuid()}>
								<td className="title-col">{study.study.title}</td>
								<td className="date-col">{study.study.date.slice(0, 10)}</td>
								<td className="objective-col">{study.study.objective}</td>
								<td className="commodities-col">
									{study.study.commodities.map((c) => (
										<div className="commodities-list" key={uuid()}>
											<FontAwesomeIcon className="bullet" icon=" fa-circle" />
											<a href={`/commodity/${c.id}`}>
												{c.commodityName} {c.variety}
											</a>{' '}
										</div>
									))}
									{user.current.isAdmin && (
										<div className=" edit-commodity-btn ">
											<a
												onClick={() => {
													setEditCommodityData(study);
													editCommodityForm();
												}}
											>
												Edit Commodities
											</a>
										</div>
									)}
								</td>
								<td>
									<a href={study.study.source} download>
										<FontAwesomeIcon icon=" fa-download" />
									</a>
								</td>
								<td>
									<a
										className={editMode ? 'edit-mode edit edit-commodity-link' : 'view-mode'}
										onClick={() => {
											setEditStudyData(study);
											editStudyForm();
										}}
									>
										<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
									</a>
									<a
										className={editMode ? 'edit-mode delete' : 'view-mode'}
										onClick={async () => {
											await PostharvestApi.deleteStudy(study.study.id);

											window.location.reload(false);
										}}
									>
										<FontAwesomeIcon icon=" fa-solid fa-circle-xmark" />
									</a>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default StudiesList;
