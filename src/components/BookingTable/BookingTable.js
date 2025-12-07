import React from 'react';

const BookingTable = ({ bookedSpaces }) => {
	return (
		<div className='booking-table'>
			<h3>Зарезервированные места</h3>
			<table>
				<thead>
					<tr>
						<th>Место</th>
					</tr>
				</thead>
				<tbody>
					{bookedSpaces.map((space, index) => (
						<tr key={index}>
							<td>{space}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BookingTable;
