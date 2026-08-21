import { useEffect, useState } from "react";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import BlockUserModal from "../../components/blockUserModal";
import ChangeRoleOfUserModal from "../../components/changeRoleOfUserModal";
import { FiUsers, FiRefreshCw, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function AdminUsersPage() {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [pageSize, setPageSize] = useState(5);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalUsers, setTotalUsers] = useState(0);

	useEffect(() => {
		const token = localStorage.getItem("token");
		api.get("/users/" + pageSize + "/" + currentPage, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((response) => {
			if (isLoading) {
				setUsers(response.data.users);
				setTotalPages(response.data.totalPages);
				setTotalUsers(response.data.totalCount);
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
						<FiUsers className="text-2xl" />
					</div>
					<div>
						<h1 className="text-2xl font-extrabold text-secondary tracking-tight">User Accounts</h1>
						<p className="text-sm text-gray-500 font-normal mt-0.5">Manage user roles, permissions, and account status</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="bg-accent/10 text-accent font-bold text-sm px-4 py-2 rounded-full border border-accent/20">
						Total Users: {totalUsers}
					</span>

					<button
						onClick={() => setIsLoading(true)}
						className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
					>
						<FiRefreshCw className="text-xs" /> Refresh
					</button>
				</div>
			</div>

			{/* Users Table Card */}
			<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-accent text-white uppercase text-xs font-extrabold tracking-wider border-b border-white/10">
							<tr>
								<th className="py-4 px-5 text-center">Avatar</th>
								<th className="py-4 px-5">User Details</th>
								<th className="py-4 px-5">Email</th>
								<th className="py-4 px-5 text-center">Role</th>
								<th className="py-4 px-5 text-center">Email Verification</th>
								<th className="py-4 px-5 text-center">Account Status</th>
								<th className="py-4 px-5 text-center">Actions</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-100 text-sm text-secondary">
							{users.map((item) => {
								const fullName = `${item.firstName || ""} ${item.lastName || ""}`.trim() || "User";
								return (
									<tr key={item.email} className="hover:bg-blue-50/50 transition-colors">
										<td className="py-4 px-5 text-center">
											{item.image ? (
												<img
													src={item.image}
													alt={fullName}
													className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm mx-auto"
												/>
											) : (
												<div className="w-11 h-11 bg-accent/10 text-accent rounded-full flex items-center justify-center font-extrabold text-base mx-auto">
													{fullName.charAt(0)}
												</div>
											)}
										</td>

										<td className="py-4 px-5 font-bold text-base text-secondary">{fullName}</td>

										<td className="py-4 px-5 text-sm text-gray-700 font-medium">{item.email}</td>

										<td className="py-4 px-5 text-center">
											<span
												className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
													item.isAdmin
														? "bg-purple-100 text-purple-700 border border-purple-200"
														: "bg-blue-100 text-accent border border-blue-200"
												}`}
											>
												{item.isAdmin ? "Admin" : "Customer"}
											</span>
										</td>

										<td className="py-4 px-5 text-center">
											<span
												className={`px-3 py-1 rounded-full text-xs font-bold ${
													item.isEmailVerified
														? "bg-green-100 text-green-700"
														: "bg-amber-100 text-amber-700"
												}`}
											>
												{item.isEmailVerified ? "Verified" : "Unverified"}
											</span>
										</td>

										<td className="py-4 px-5 text-center">
											<span
												className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
													item.isBlocked
														? "bg-red-100 text-red-700 border border-red-200"
														: "bg-emerald-100 text-emerald-700 border border-emerald-200"
												}`}
											>
												{item.isBlocked ? "Blocked" : "Active"}
											</span>
										</td>

										<td className="py-4 px-5 text-center">
											<div className="flex justify-center items-center gap-2">
												<BlockUserModal refresh={() => setIsLoading(true)} user={item} />
												<ChangeRoleOfUserModal refresh={() => setIsLoading(true)} user={item} />
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