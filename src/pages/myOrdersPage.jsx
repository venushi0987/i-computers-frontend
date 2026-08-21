import { useEffect, useState } from "react";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import formatTimestamp from "../lib/date-format";
import getFormattedPrice from "../lib/price-format";
import OrderDetailsModal from "../components/orderDetailsModal";
import { BsBagCheckFill } from "react-icons/bs";
import { FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function MyOrdersPage() {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalOrders, setTotalOrders] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("token");
		api.get("/orders/" + pageSize + "/" + currentPage, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			if (isLoading) {
				setOrders(response.data.orders);
				setTotalPages(response.data.totalPages);
				setTotalOrders(response.data.totalCount);
				setIsLoading(false);
			}
		});
	}, [isLoading, pageSize, currentPage]);

	return (
		<div className="w-full max-w-7xl mx-auto py-8 px-4 font-sans space-y-6">
			{isLoading && <LoadingAnimation />}

			{/* Page Header Bar */}
			<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-accent/10 text-accent rounded-xl">
						<BsBagCheckFill className="text-2xl" />
					</div>
					<div>
						<h1 className="text-2xl font-extrabold text-secondary tracking-tight">My Order History</h1>
						<p className="text-sm text-gray-500 font-normal mt-0.5">Track your purchases and view order status</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="bg-accent/10 text-accent font-bold text-sm px-4 py-2 rounded-full border border-accent/20">
						Total Orders: {totalOrders}
					</span>

					<button
						onClick={() => setIsLoading(true)}
						className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
					>
						<FiRefreshCw className="text-xs" /> Refresh
					</button>
				</div>
			</div>

			{/* Orders Table Card */}
			<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
				{orders.length === 0 && !isLoading ? (
					<div className="p-12 text-center text-gray-500 space-y-3">
						<BsBagCheckFill className="text-5xl text-gray-300 mx-auto" />
						<p className="text-lg font-bold text-secondary">No Orders Found</p>
						<p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left border-collapse">
							<thead className="bg-accent text-white uppercase text-xs font-extrabold tracking-wider border-b border-white/10">
								<tr>
									<th className="py-4 px-5">Order ID</th>
									<th className="py-4 px-5">Date</th>
									<th className="py-4 px-5">Recipient</th>
									<th className="py-4 px-5">City / Phone</th>
									<th className="py-4 px-5 text-center">Items</th>
									<th className="py-4 px-5">Total Amount</th>
									<th className="py-4 px-5 text-center">Status</th>
									<th className="py-4 px-5 text-center">View</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-gray-100 text-sm text-secondary">
								{orders.map((item) => {
									const recipientName = `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Customer";
									return (
										<tr key={item.orderId} className="hover:bg-blue-50/50 transition-colors">
											<td className="py-4 px-5 font-bold text-base text-accent">
												{item.orderId}
											</td>

											<td className="py-4 px-5 text-sm text-gray-700 font-medium">
												{formatTimestamp(item.date)}
											</td>

											<td className="py-4 px-5">
												<p className="font-bold text-base text-secondary">{recipientName}</p>
												<p className="text-sm text-gray-600 font-medium mt-0.5">{item.email}</p>
											</td>

											<td className="py-4 px-5 text-sm text-gray-700">
												<p className="font-bold text-secondary text-sm">{item.city || "-"}</p>
												<p className="text-gray-600 font-medium text-xs mt-0.5">{item.phone || "-"}</p>
											</td>

											<td className="py-4 px-5 text-center">
												<span className="bg-gray-100 text-gray-800 text-xs px-3.5 py-1.5 rounded-full font-extrabold inline-block">
													{item.items?.length || 0} item(s)
												</span>
											</td>

											<td className="py-4 px-5 font-extrabold text-base text-accent">
												{getFormattedPrice(item.totalAmount)}
											</td>

											<td className="py-4 px-5 text-center">
												<span
													className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold inline-block ${
														item.status === "completed" || item.status === "Delivered"
															? "bg-green-100 text-green-700 border border-green-200"
															: item.status === "cancelled"
															? "bg-red-100 text-red-700 border border-red-200"
															: "bg-amber-100 text-amber-800 border border-amber-200"
													}`}
												>
													{item.status || "Pending"}
												</span>
											</td>

											<td className="py-4 px-5 text-center">
												<div className="flex justify-center items-center">
													<OrderDetailsModal order={item} />
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{/* Modern Pagination Toolbar */}
			{orders.length > 0 && (
				<div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-2xl shadow-md border border-gray-200 gap-4">
					<div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
						<span>Items per page:</span>
						<select
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
								setCurrentPage(1);
								setIsLoading(true);
							}}
							className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-accent outline-none"
						>
							<option value={3}>3</option>
							<option value={5}>5</option>
							<option value={10}>10</option>
						</select>
					</div>

					<div className="flex items-center gap-3">
						<button
							disabled={currentPage === 1}
							onClick={() => {
								setCurrentPage(currentPage - 1);
								setIsLoading(true);
							}}
							className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
						>
							<FiChevronLeft /> Previous
						</button>

						<span className="text-sm font-bold text-secondary">
							Page {currentPage} of {totalPages}
						</span>

						<button
							disabled={currentPage === totalPages}
							onClick={() => {
								setCurrentPage(currentPage + 1);
								setIsLoading(true);
							}}
							className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm font-semibold flex items-center gap-1 transition-colors"
						>
							Next <FiChevronRight />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}