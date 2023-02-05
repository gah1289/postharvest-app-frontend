import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';

import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, InputGroup, Table, Modal, Spinner } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import AddWindhamStudyForm from './EditWindhamStudyCommodities;';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import EditWindhamStudyForm from './EditWindhamStudy';
import EditWindhamStudyCommodities from './EditWindhamStudyCommodities;';

function StudiesList() {
	library.add(faDownload, faPlus, faPenToSquare, faCircleXmark);

	const navigate = useNavigate();

	const [
		studies,
		setStudies
	] = useState([]);

	const [
		editMode,
		setEditMode
	] = useState(false);

	const [
		editStudyData,
		setEditStudyData
	] = useState();
	const [
		editCommodityData,
		setEditCommodityData
	] = useState();

	const [
		showEditCommodityForm,
		setShowEditCommodityForm
	] = useState(false);

	const editCommodityForm = () => {
		showEditCommodityForm ? setShowEditCommodityForm(false) : setShowEditCommodityForm(true);
	};

	const [
		showEditStudyForm,
		setShowEditStudyForm
	] = useState(false);

	const editStudyForm = () => {
		showEditStudyForm ? setShowEditStudyForm(false) : setShowEditStudyForm(true);
	};

	const toggleEdit = () => {
		editMode ? setEditMode(false) : setEditMode(true);
	};

	const [
		isLoading,
		setIsLoading
	] = useState(true);

	const filterStudies = (s) => {
		setStudies(s);
	};
	const location = useLocation();

	useEffect(() => {
		async function getStudies(data) {
			if (location.state) {
				setStudies(location.state.props);
			}
			else {
				try {
					let studiesFromApi = await PostharvestApi.getStudies();
					filterStudies(studies);
					setStudies(studiesFromApi);
				} catch (e) {
					if (e[0] === 'Unauthorized') {
						return navigate('/');
					}
				}
			}

			setIsLoading(false);
		}
		getStudies();
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<h1>Windham Packaging Shelf Life Studies</h1>
			{/* Edit study commodities modal */}
			<Modal key={uuid()} isOpen={showEditCommodityForm} toggle={editCommodityForm}>
				<EditWindhamStudyCommodities id={editCommodityData} />
			</Modal>
			{/* Edit study modal */}
			<Modal key={uuid()} isOpen={showEditStudyForm} toggle={editStudyForm}>
				<EditWindhamStudyForm id={editStudyData} />
			</Modal>

			{<button onClick={toggleEdit}>{editMode ? 'View' : 'Edit'}</button>}

			{/* List of studies */}
			<Table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Date</th>
						<th>Objective</th>
						<th>Commodities</th>
					</tr>
				</thead>
				<tbody>
					{studies.map((study) => (
						<tr key={uuid()}>
							<td>{study.study.title}</td>
							<td>{study.study.date.slice(0, 10)}</td>
							<td>{study.study.objective}</td>
							<td>
								{study.study.commodities.map((c) => (
									<div key={uuid()}>
										<a href={`/commodity/${c.id}`}>
											{c.commodityName} {c.variety}
										</a>{' '}
									</div>
								))}
								<button
									onClick={() => {
										setEditCommodityData(study);
										editCommodityForm();
									}}
									// onclick={() => {
									// 	setEditCommodityData(study);
									// 	toggleEditCommodityForm();
									// }}
								>
									Edit Commodities
								</button>
							</td>
							<td>
								<a href={study.study.source} download>
									<FontAwesomeIcon icon="fa-solid fa-download" />
								</a>
							</td>
							<td>
								<a
									className={editMode ? 'edit-mode edit' : 'view-mode'}
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
	);
}

export default StudiesList;
