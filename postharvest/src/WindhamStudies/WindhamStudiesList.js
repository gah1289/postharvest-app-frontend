import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import './WindhamStudies.css';

import { useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, InputGroup, Table, Modal, Spinner } from 'reactstrap';
import { v4 as uuid } from 'uuid';
import PostharvestApi from '../api';
import AddWindhamStudyForm from './EditWindhamStudyCommodities;';
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
		<div className="studies-list">
			<h1>
				Windham Packaging Shelf Life Studies
				{!editMode && (
					<a className="edit-list" onClick={toggleEdit}>
						<FontAwesomeIcon icon=" fa-edit" />
					</a>
				)}
				{editMode && (
					<a className="edit-list" onClick={toggleEdit}>
						<FontAwesomeIcon icon=" fa-eye" />
					</a>
				)}
			</h1>
			{/* Edit study commodities modal */}
			<Modal key={uuid()} isOpen={showEditCommodityForm} toggle={editCommodityForm}>
				<EditWindhamStudyCommodities id={editCommodityData} />
			</Modal>
			{/* Edit study modal */}
			<Modal key={uuid()} isOpen={showEditStudyForm} toggle={editStudyForm}>
				<EditWindhamStudyForm id={editStudyData} />
			</Modal>

			{/* List of studies */}
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
	);
}

export default StudiesList;
