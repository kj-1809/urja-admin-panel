import React, { useEffect, useState } from "react";
import "./Orders.css";
import { DataGrid } from "@mui/x-data-grid";
import LinearIndeterminate from "../components/LinearIndeterminate";
import {
	collection,
	getDocs,
	orderBy,
	query,
	updateDoc,
	doc,
	where,
	increment,
	deleteDoc,
	writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import CustomModal from "../components/CustomModal";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [reload, setReload] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [tbdDocId, setTbdDocId] = useState(undefined);

	const handleModalClose = () => {
		setOpenModal(false);
	};

	const handleOrderDelete = async () => {
		// handle order delete

		if (tbdDocId === undefined) {
			return;
		}
		setLoading(true);
		try {
			await deleteDoc(doc(db, "orders", tbdDocId));
		} catch (err) {
			alert(`some error occured : ${err}`);
		}
		setTbdDocId(undefined);
		setLoading(false);
		handleModalClose();
		setReload(!reload);
	};

	const getUserPhoneNumber = async (userId) => {
		const q = query(collection(db, "users"), where("uid", "==", userId));
		let userPhoneNumber = "";
		const userQuerySnapshot = await getDocs(q);
		userQuerySnapshot.forEach((doc) => {
			userPhoneNumber = doc.data().phone;
		});
		return userPhoneNumber;
	};

	const sendMessage = (phoneNumber, itemName, price) => {
		const options = {
			method: "POST",
			url: "https://urja-proxy-api-production.up.railway.app/api/send",
			params: {
				phone: phoneNumber,
				item_name: itemName,
				price: price,
				type: "orderdelivered",
			},
		};
		axios
			.request(options)
			.then((response) => {
				console.log("Status : ", response.status);
				console.log("Message sent from the server!");
			})
			.catch((error) => {
				console.log("error while sending the message")
				console.error(error);
			});	
	};

	const columns = [
		{
			field: "createdAt",
			headerName: "Time",
			flex: 1.7,
			renderCell: (params) => {
				const seconds = params.row.createdAt.seconds;
				const currentTime = new Date(seconds * 1000);
				const options = {
					year: "numeric",
					month: "short",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
				};
				return <span>{currentTime.toLocaleString("en-GB", options)}</span>;
			},
		},
		{ field: "orderId", headerName: "Order ID", flex: 0.8 },
		{ field: "productName", headerName: "Product Name", flex: 1.5 },
		{ field: "quantity", headerName: "Quantity", flex: 0.7 },
		{
			field: "price",
			headerName: "Price",
			flex: 1,
			renderCell: (params) => {
				return <span>Rs. {params.row.price}</span>;
			},
		},
		{
			field: "total",
			headerName: "Total",
			flex: 1.2,
			renderCell: (params) => {
				return <span>Rs. {params.row.price * params.row.quantity}</span>;
			},
		},
		{
			field: "orderStatus",
			headerName: "Order Status",
			flex: 1,
			renderCell: (params) => {
				return (
					<span className={`statusTag ${params.row.orderStatus}`}>
						{params.row.orderStatus}
					</span>
				);
			},
		},
		{
			field: "actions",
			headerName: "Actions",
			flex: 2,
			renderCell: (params) => {
				return (
					<div className="actionsContainer">
						<button
							disabled={params.row.orderStatus == "Fulfilled"}
							className="markButton"
							onClick={async () => {
								setLoading(true);
								// update order status
								const batch = writeBatch(db);
								const orderStatusRef = doc(db, "orders", params.row.docId);
								batch.update(orderStatusRef, {
									orderStatus: "Fulfilled",
								});

								// update inventory
								const fetchProductDocId = new Promise(async (resolve , reject) => {
									const qu = query(
										collection(db, "products"),
										where("productId", "==", params.row.productId)
									);
									const productQuerySnapshot = await getDocs(qu);
									productQuerySnapshot.forEach((doc) => {
										resolve(doc.id);
									});
								})	

								const productDocumentId = await fetchProductDocId;

								const inventoryRef = doc(db, "products", productDocumentId);
								batch.update(inventoryRef, {
									quantity: increment(Number(params.row.quantity * -1)),
								});
								
								// push changes in a batch
								try {
									batch.commit();
								} catch (err) {
									console.log(err);
								}

								//Send message to the user
								const userPhoneNumber = await getUserPhoneNumber(
									params.row.uid
								);
								sendMessage(
									userPhoneNumber,
									params.row.productName,
									params.row.price
								);

								setLoading(false);
								setReload(!reload);
							}}
						>
							Mark as fulfilled
						</button>
						<button
							className="deleteButton"
							onClick={() => {
								setTbdDocId(params.row.docId);
								setOpenModal(true);
							}}
						>
							Delete
						</button>
					</div>
				);
			},
		},
	];

	async function fetchOrders() {
		setFetching(true);
		const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
		const querySnapshot = await getDocs(q);
		let arr = [];
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			let tempObj = doc.data();
			tempObj["docId"] = doc.id;
			arr.push(tempObj);
		});
		setOrders(arr);
		setFetching(false);
	}

	useEffect(() => {
		fetchOrders();
	}, [reload]);

	if (fetching) {
		return <LinearIndeterminate />;
	}

	return (
		<>
			<CustomModal
				open={openModal}
				onClose={handleModalClose}
				title="Delete"
				content="Are you sure you want to Delete an order ?"
				onAgree={handleOrderDelete}
				confirmatoryText="Delete"
			/>

			{loading ? <LinearIndeterminate /> : null}
			<div className="container">
				<div className="headingContainerOrders">
					<h1>Orders</h1>
				</div>
				<div className="dataTableContainer">
					<DataGrid
						rows={orders}
						columns={columns}
						pageSize={10}
						rowsPerPageOptions={[10]}
						key={orders.orderId}
						getRowId={(row) => row.orderId}
					/>
				</div>
			</div>
		</>
	);
};

export default Orders;
