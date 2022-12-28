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
	getDoc,
	where,
	increment,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";
import CustomAlert from "../components/CustomAlert";
import CustomModal from "../components/CustomModal";

const Orders = () => {
	const [orders, setOrders] = useState([]);
	const [reload, setReload] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [tbdDocId, setTbdDocId] = useState(undefined);

	
	function handleModalClose() {
		setOpenModal(false);
	}

	const handleOrderDelete = async () => {
		// handle order delete
		console.log("TBD DOC ID : ", tbdDocId);

		if (tbdDocId === undefined) {
			return;
		}
		setLoading(true);
		await deleteDoc(doc(db, "orders", tbdDocId));
		setTbdDocId(undefined);
		setLoading(false);
		handleModalClose();
		setReload(!reload);
	};

	const sendMessage = (phoneNumber , orderNumber , itemName , quantity , price) => {
		console.log("Phone : ", phoneNumber);
		const options = {
			method: "POST",
			url: `https://urja-proxy-api-production.up.railway.app/api/send/`,
			params: {
				phone: phoneNumber,
				order_number : orderNumber,
				item_name : itemName,
				quantity : quantity,
				total : Number(price) * Number(quantity),
				type : "orderdelivered"
			},
		};
		axios
			.request(options)
			.then((res) => {
				console.log("status : ", res.status);
				console.log(res.body);
			})
			.catch((err) => console.log(err));
	};

	const updateInventory = async (productDocId, currentQuantity) => {
		await updateDoc(doc(db, "products", productDocId), {
			quantity: increment(currentQuantity * -1),
		});
		setLoading(false);
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
								await updateDoc(doc(db, "orders", params.row.docId), {
									orderStatus: "Fulfilled",
								});

								//update inventory
								const qu = query(
									collection(db, "products"),
									where("productId", "==", params.row.productId)
								);
								const productQuerySnapshot = await getDocs(qu);
								productQuerySnapshot.forEach((doc) => {
									updateInventory(doc.id, params.row.quantity);
								});

								//Send message to the user
								const q = query(
									collection(db, "users"),
									where("uid", "==", params.row.uid)
								);
								const userQuerySnapshot = await getDocs(q);
								//could have been done in a better way !
								userQuerySnapshot.forEach((doc) => {
									sendMessage(doc.data().phone , params.row.orderId , params.row.productName , params.row.quantity , params.row.price);
								});
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
