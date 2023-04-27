import '../Commodity';

import React from 'react';
import { Table, CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faDownload } from '@fortawesome/free-solid-svg-icons/faDownload';

import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons/faPenToSquare';

function WindhamStudies(commodity) {
	library.add(faPlus, faPenToSquare, faDownload);
	const { windhamStudies } = commodity.commodity;

	return (
		<div>
			<CardTitle tag="h2">Shelf Life Studies </CardTitle>
			<div class="table-responsive">
				<Table>
					{windhamStudies.length ? (
						<thead>
							<tr>
								<th>Title</th>
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
								<td>{s.date.slice(0, 10)}</td>
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
		</div>
	);
}

export default WindhamStudies;
