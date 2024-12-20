import React  , {useState , useEffect} from "react";
import "./Users.css";

import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import LinearIndeterminate from "../components/LinearIndeterminate"

const columns = [
	{ field: "name", headerName: "Name", flex: 2 },
	{ field: "phone", headerName: "Phone", flex: 1.5 },
	{ field: "gstin", headerName: "GSTIN", flex: 2 },
	{
		field: "disc5",
		headerName: "Disc. 5KG",
		flex: 1,
	},
	{
		field: "disc19",
		headerName: "Disc. 19KG",
		flex: 1,
	},
	{
		field: "disc47",
		headerName: "Disc. 47KG",
		flex: 1,
	},
	{
		field: "disc430",
		headerName: "Disc. 430KG",
		flex: 1,
	},
	{
		field: "actions",
		headerName: "Actions",
		flex: 1,
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
	const [fetchingUsers , setFetchingUsers] = useState(false);

	async function fetchUsers() {
		setFetchingUsers(true);
		const querySnapshot = await getDocs(collection(db, "users"));
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			arr.push(doc.data());
		});
		setUsers(arr);
		setFetchingUsers(false);
	}

	useEffect(() => {
		fetchUsers();
	}, []);

	if(fetchingUsers){
		return <LinearIndeterminate />;
	}

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
