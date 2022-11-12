import React from "react";
import "./EditUser.css";
import TextInput from "../components/TextInput"
const EditUser = () => {
	return (
		<div className="editUserContainer">
			<div className="headingContainerEditUser">
				<h1>Edit User</h1>
			</div>

			<div>
				<form>
					<TextInput placeholder="Name" />
					<TextInput placeholder="Phone" />
					<TextInput placeholder="GSTIN" />
					<TextInput placeholder="Email" />
					<TextInput placeholder="UserID" />
					<TextInput placeholder="Address" />
					<TextInput placeholder="Discount 5KG" />
					<TextInput placeholder="Discount 19KG" />
					<TextInput placeholder="Discount 47KG" />
					<TextInput placeholder="Discount 430KG" />
				</form>
			</div>
			<div className="buttonContainerEditUser">
				<button className="submitButton">Submit</button>
				<button className="deleteUserButton">Delete User</button>
			</div>
		</div>
	);
};

export default EditUser;
