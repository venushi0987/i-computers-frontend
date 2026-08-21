import { useEffect, useState } from "react";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import getFormattedPrice from "../../lib/price-format";
import formatTimestamp from "../../lib/date-format";
import AdminOrderDetailsModal from "../../components/adminOrderDetailsModal";
import { BsCartCheck } from "react-icons/bs";
import { FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AdminOrdersPage() {
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
		<div className="w-full space-y-6 pb-20 font-sans">
			{isLoading && <LoadingAnimation />}

			{/* Page Header Bar */}
			<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-accent/10 text-accent rounded-xl">
						<BsCartCheck className="text-2xl" />
					</div>
					<div>
						<h1 className="text-2xl font-extrabold text-secondary tracking-tight">Customer Orders</h1>
						<p className="text-sm text-gray-500 font-normal mt-0.5">Track and manage customer purchases and order fulfillment</p>
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
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-accent text-white uppercase text-xs font-extrabold tracking-wider border-b border-white/10">
							<tr>
								<th className="py-4 px-5">Order ID</th>
								<th className="py-4 px-5">Date</th>
								<th className="py-4 px-5">Customer</th>
								<th className="py-4 px-5">City / Phone</th>
								<th className="py-4 px-5 text-center">Items</th>
								<th className="py-4 px-5">Total Amount</th>
								<th className="py-4 px-5 text-center">Status</th>
								<th className="py-4 px-5 text-center">Actions</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-100 text-sm text-secondary">
							{orders.map((item) => {
								const customerName = `${item.firstName || ""} ${item.lastName || ""}`.trim() || "Customer";
								return (
									<tr key={item.orderId} className="hover:bg-blue-50/50 transition-colors">
										<td className="py-4 px-5 font-bold text-base text-accent">
											{item.orderId}
										</td>

										<td className="py-4 px-5 text-sm text-gray-700 font-medium">
											{formatTimestamp(item.date)}
										</td>

										<td className="py-4 px-5">
											<p className="font-bold text-base text-secondary">{customerName}</p>
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
											<div className="flex justify-center items-center gap-2">
												<AdminOrderDetailsModal order={item} refresh={() => setIsLoading(true)} />
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modern Pagination Toolbar */}
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
		</div>
	);
}