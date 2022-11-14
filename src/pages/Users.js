import React  , {useState , useEffect} from "react";
import "./Users.css";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const columns = [
	{ field: "name", headerName: "Name", flex: 1 },
	{ field: "phone", headerName: "Phone", flex: 1 },
	{ field: "gstin", headerName: "GSTIN", flex: 2 },
	{
		field: "disc5",
		headerName: "Discount 5KG",
		flex: 1.1,
	},
	{
		field: "disc19",
		headerName: "Discount 19KG",
		flex: 1.2,
	},
	{
		field: "disc47",
		headerName: "Discount 47KG",
		flex: 1.2,
	},
	{
		field: "disc430",
		headerName: "Discount 430KG",
		flex: 1.2,
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 0.8,
		renderCell: (params) => {
			return (
				<div>
					<Link to={`/users/${params.row.uid}`}>
						<button className="editButton">Edit</button>
					</Link>
				</div>
			);
		},
	},
];


const Users = () => {
	const [users, setUsers] = useState([]);

	async function fetchUsers() {
		const querySnapshot = await getDocs(collection(db, "users"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log("user : ");
			console.log(doc.id, " => ", doc.data());
			arr.push(doc.data());
		});
		setUsers(arr);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div className="container">
			<div className="headingContainerUsers">
				<h1>Users</h1>
			</div>

			<div className="usersDataTable">
				<DataGrid
					rows={users}
					columns={columns}
					pageSize={10}
					rowsPerPageOptions={[10]}
					getRowId = {(row) => row.uid}
				/>
			</div>
		</div>
	);
};

export default Users;
