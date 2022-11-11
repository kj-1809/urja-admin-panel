import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./BasicTable.css";

function createData(name, calories, fat, carbs, protein, time, status) {
	return { name, calories, fat, carbs, protein, time, status };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 12, "Pending"),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 12, "Fulfilled"),
	createData("Eclair", 262, 16.0, 24, 6.0, 1, "Pending"),
	createData("Cupcake", 305, 3.7, 67, 4.3, 12, "Fulfilled"),
	createData("Gingerbread", 356, 16.0, 49, 3.9, 2, "Fulfilled"),
];

export default function BasicTable() {
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell><span>Item Name</span></TableCell>
						<TableCell align="right"><span>Order ID</span></TableCell>
						<TableCell align="right"><span>Quantity</span></TableCell>
						<TableCell align="right"><span>Price</span></TableCell>
						<TableCell align="right"><span>Total</span></TableCell>
						<TableCell align="right"><span>Time</span></TableCell>
						<TableCell align="right"><span>Order Status</span></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.name}
						>
							<TableCell component="th" scope="row">
								{row.name}
							</TableCell>
							<TableCell align="right">{row.calories}</TableCell>
							<TableCell align="right">{row.fat}</TableCell>
							<TableCell align="right">{row.carbs}</TableCell>
							<TableCell align="right">{row.protein}</TableCell>
							<TableCell align="right">{row.time}</TableCell>
							<TableCell align="right">
								<span className={`statusTag ${row.status}`}>{row.status}</span>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
