import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaTimes, FaBoxOpen, FaMapMarkerAlt, FaCalendarAlt, FaFileAlt, FaCheck, FaSyncAlt } from "react-icons/fa";
import Modal from "react-modal";
import getFormattedPrice from "../lib/price-format";
import formatTimestamp from "../lib/date-format";
import api from "../lib/api";
import { toast } from "react-hot-toast";

Modal.setAppElement("#root");

export default function AdminOrderDetailsModal(props) {
	const refresh = props.refresh;
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [status, setStatus] = useState(order.status || "Pending");
	const [isSaving, setIsSaving] = useState(false);

	async function updateOrderStatus() {
		try {
			setIsSaving(true);
			const token = localStorage.getItem("token");

			await api.put(
				"/orders/" + order.orderId + "/" + status,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			toast.success("Order status updated to " + status);
			if (refresh) refresh();
			setIsModalOpen(false);
		} catch (err) {
			console.log(err);
			toast.error("Failed to update order status");
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="p-2 bg-blue-50 text-accent hover:bg-accent hover:text-white rounded-xl transition-all cursor-pointer"
				title="View & Edit Order"
			>
				<IoEyeOutline className="text-lg" />
			</button>

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				style={{
					overlay: {
						backgroundColor: "rgba(0, 0, 0, 0.65)",
						backdropFilter: "blur(4px)",
						zIndex: 1000,
					},
					content: {
						top: "50%",
						left: "50%",
						right: "auto",
						bottom: "auto",
						marginRight: "-50%",
						transform: "translate(-50%, -50%)",
						border: "none",
						background: "none",
						padding: "0",
						maxWidth: "600px",
						width: "92%",
						maxHeight: "90vh",
					},
				}}
			>
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col font-sans max-h-[90vh]">
					{/* Modal Header */}
					<div className="bg-accent p-6 text-white flex justify-between items-center relative">
						<div className="flex items-center gap-3">
							<div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md">
								<FaBoxOpen className="text-2xl text-yellow-400" />
							</div>
							<div>
								<h2 className="text-xl font-extrabold tracking-tight">Order #{order.orderId}</h2>
								<p className="text-xs text-white/80 mt-0.5">Admin Management & Customer Details</p>
							</div>
						</div>

						<button
							onClick={() => setIsModalOpen(false)}
							className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
						>
							<FaTimes />
						</button>
					</div>

					{/* Modal Body */}
					<div className="p-6 overflow-y-auto space-y-6">
						{/* Status Change Selector Box */}
						<div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
							<div>
								<label className="block text-xs font-extrabold text-secondary uppercase tracking-wider mb-1">
									Update Order Status
								</label>
								<p className="text-xs text-gray-500 font-medium">Select fulfillment status for customer tracking</p>
							</div>

							<div className="flex items-center gap-2 w-full sm:w-auto">
								<select
									value={status}
									onChange={(e) => setStatus(e.target.value)}
									className="px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs font-bold text-accent outline-none shadow-sm focus:ring-2 focus:ring-accent/20 cursor-pointer"
								>
									<option value="Pending">Pending</option>
									<option value="Processing">Processing</option>
									<option value="Shipped">Shipped</option>
									<option value="Delivered">Delivered</option>
									<option value="Cancelled">Cancelled</option>
								</select>

								{status !== order.status && (
									<button
										disabled={isSaving}
										onClick={updateOrderStatus}
										className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
									>
										{isSaving ? <FaSyncAlt className="animate-spin" /> : <FaCheck />} Save Status
									</button>
								)}
							</div>
						</div>

						{/* Stats Summary Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
							<div>
								<span className="text-gray-400 block font-medium mb-0.5">Total Amount</span>
								<span className="font-extrabold text-accent text-base">
									{getFormattedPrice(order.totalAmount)}
								</span>
							</div>

							<div>
								<span className="text-gray-400 block font-medium mb-0.5">Items Purchased</span>
								<span className="font-bold text-secondary text-sm">
									{order.items?.length || 0} item(s)
								</span>
							</div>

							<div className="col-span-2 sm:col-span-1">
								<span className="text-gray-400 block font-medium mb-0.5">Current Status</span>
								<span
									className={`px-3 py-1 rounded-full text-xs font-extrabold inline-block ${
										order.status === "completed" || order.status === "Delivered"
											? "bg-green-100 text-green-700"
											: order.status === "cancelled"
											? "bg-red-100 text-red-700"
											: "bg-amber-100 text-amber-800"
									}`}
								>
									{order.status || "Pending"}
								</span>
							</div>
						</div>

						{/* Customer Details */}
						<div className="space-y-3 text-xs">
							<div className="flex items-center gap-2 text-gray-500 font-medium">
								<FaCalendarAlt className="text-accent" />
								<span>Order Date: {formatTimestamp(order.date)}</span>
							</div>

							<div className="flex items-start gap-3 text-gray-700 bg-gray-50 p-4 rounded-2xl border border-gray-100">
								<FaMapMarkerAlt className="text-accent mt-0.5 text-base flex-shrink-0" />
								<div className="space-y-1">
									<p className="font-bold text-secondary text-sm">
										{order.firstName} {order.lastName}
									</p>
									<p className="text-gray-600 font-medium">
										{order.addressLine1}
										{order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}
										{order.postalCode ? `, ${order.postalCode}` : ""}
									</p>

									<div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-gray-500 font-semibold">
										<span>Email: {order.email}</span>
										<span>Phone: {order.phone} {order.secondaryPhone ? `/ ${order.secondaryPhone}` : ""}</span>
									</div>
								</div>
							</div>

							{order.customerNotes && (
								<div className="flex items-start gap-2 text-gray-700 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs">
									<FaFileAlt className="text-amber-600 mt-0.5 flex-shrink-0 text-sm" />
									<div>
										<strong className="text-amber-900 block font-bold mb-0.5">Special Customer Instructions:</strong>
										<span>{order.customerNotes}</span>
									</div>
								</div>
							)}
						</div>

						{/* Purchased Items List */}
						<div className="space-y-3">
							<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
								Items Breakdown ({order.items?.length || 0})
							</h3>

							<div className="space-y-3 divide-y divide-gray-100">
								{order.items?.map((item, index) => {
									const itemPrice = item.product?.price || item.price || 0;
									const qty = item.qty || item.quantity || 1;
									const itemImage = item.product?.images?.[0] || item.product?.image || "/placeholder.jpg";
									const itemName = item.product?.name || "Product";

									return (
										<div key={index} className="pt-3 flex items-center gap-4">
											<img
												src={itemImage}
												alt={itemName}
												className="w-14 h-14 object-cover rounded-xl border border-gray-200 shadow-sm flex-shrink-0"
											/>
											<div className="flex-1 min-w-0">
												<h4 className="font-bold text-sm text-secondary truncate">{itemName}</h4>
												<p className="text-xs text-gray-500 mt-0.5">
													{getFormattedPrice(itemPrice)} × {qty}
												</p>
											</div>
											<div className="text-right">
												<span className="font-extrabold text-sm text-accent">
													{getFormattedPrice(itemPrice * qty)}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
						<span className="text-xs text-gray-400 font-medium">Order ID: {order.orderId}</span>
						<button
							onClick={() => setIsModalOpen(false)}
							className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs hover:bg-gray-300 transition-colors cursor-pointer"
						>
							Close Modal
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}
