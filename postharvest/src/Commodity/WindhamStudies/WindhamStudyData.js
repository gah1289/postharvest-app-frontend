import '../Commodity';
import { v4 as uuid } from 'uuid';
import React, { useState, useContext } from 'react';
import { Table, Modal } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import PostharvestApi from '../../api';
import ItemContext from '../../ItemContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';

function WindhamStudies(commodity) {
	library.add(faPlus, faPenToSquare, faDownload);
	const { windhamStudies } = commodity.commodity;

	return (
		<div>
			<Table>
				{windhamStudies.length ? (
					<thead>
						<tr>
							<th>Title ({'\u00b0'}C)</th>
							<th>Date</th>
							<th>Objective</th>
							<th />
							<th />
						</tr>
					</thead>
				) : (
					<thead>
						<tr>
							<td>No Data Entered yet</td>
						</tr>
					</thead>
				)}

				<tbody>
					{windhamStudies.map((s) => (
						<tr>
							<td>{s.title}</td>
							<td>{s.date.slice(0, 9)}</td>
							<td>{s.objective}</td>
							<td>
								<a href={s.source} download>
									<FontAwesomeIcon icon="fa-solid fa-download" />
								</a>
							</td>

							<td />
						</tr>
					))}
					<tr />
				</tbody>
			</Table>
		</div>
	);
}

export default WindhamStudies;
