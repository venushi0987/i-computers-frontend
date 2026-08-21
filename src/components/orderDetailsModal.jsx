import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaTimes, FaBoxOpen, FaMapMarkerAlt, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import Modal from "react-modal";
import getFormattedPrice from "../lib/price-format";
import formatTimestamp from "../lib/date-format";

Modal.setAppElement("#root");

export default function OrderDetailsModal(props) {
	const order = props.order;
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsModalOpen(true)}
				className="p-2 bg-blue-50 text-accent hover:bg-accent hover:text-white rounded-lg transition-all cursor-pointer"
				title="View Order Details"
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
						maxWidth: "580px",
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
								<p className="text-xs text-white/80 mt-0.5">Order Details & Receipt Breakdown</p>
							</div>
						</div>

						<button
							onClick={() => setIsModalOpen(false)}
							className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
						>
							<FaTimes />
						</button>
					</div>

					{/* Modal Body Content */}
					<div className="p-6 overflow-y-auto space-y-6">
						{/* Summary Stats Row */}
						<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs">
							<div>
								<span className="text-gray-400 block font-medium mb-0.5">Total Amount</span>
								<span className="font-extrabold text-accent text-base">
									{getFormattedPrice(order.totalAmount)}
								</span>
							</div>

							<div>
								<span className="text-gray-400 block font-medium mb-0.5">Total Items</span>
								<span className="font-bold text-secondary text-sm">
									{order.items?.length || 0} item(s)
								</span>
							</div>

							<div className="col-span-2 sm:col-span-1">
								<span className="text-gray-400 block font-medium mb-0.5">Status</span>
								<span
									className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold inline-block ${
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

						{/* Timestamp & Recipient Information */}
						<div className="space-y-3 text-xs">
							<div className="flex items-center gap-2 text-gray-500 font-medium">
								<FaCalendarAlt className="text-accent" />
								<span>Date Placed: {formatTimestamp(order.date)}</span>
							</div>

							<div className="flex items-start gap-2 text-gray-700 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
								<FaMapMarkerAlt className="text-accent mt-0.5 text-sm flex-shrink-0" />
								<div>
									<p className="font-bold text-secondary text-sm">
										{order.firstName} {order.lastName}
									</p>
									<p className="text-gray-600 mt-0.5">
										{order.addressLine1}
										{order.addressLine2 ? `, ${order.addressLine2}` : ""}, {order.city}
										{order.postalCode ? `, ${order.postalCode}` : ""}
									</p>
									<p className="text-gray-500 mt-1 font-semibold">
										Phone: {order.phone} {order.secondaryPhone ? `/ ${order.secondaryPhone}` : ""}
									</p>
								</div>
							</div>

							{order.customerNotes && (
								<div className="flex items-start gap-2 text-gray-600 bg-amber-50/60 p-3 rounded-xl border border-amber-100">
									<FaFileAlt className="text-amber-600 mt-0.5 flex-shrink-0" />
									<span>
										<strong>Notes:</strong> {order.customerNotes}
									</span>
								</div>
							)}
						</div>

						{/* Purchased Items List */}
						<div className="space-y-3">
							<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
								Purchased Items ({order.items?.length || 0})
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
					<div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
						<button
							onClick={() => setIsModalOpen(false)}
							className="px-5 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-300 transition-colors cursor-pointer"
						>
							Close Receipt
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}