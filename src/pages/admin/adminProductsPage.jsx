import { FaPlus, FaRedo, FaBoxOpen, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../lib/api";
import LoadingAnimation from "../../components/loadingAnimation";
import DeleteProductModel from "../../components/deleteProductModel";
import getFormattedPrice from "../../lib/price-format";

export default function AdminProductsPage() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		api.get("/products").then((res) => {
			if (isLoading) {
				setProducts(res.data);
				setIsLoading(false);
			}
		});
	}, [isLoading]);

	return (
		<div className="w-full space-y-6 pb-12 font-sans">
			{isLoading && <LoadingAnimation />}

			{/* Page Header Bar */}
			<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-accent/10 text-accent rounded-xl">
						<FaBoxOpen className="text-2xl" />
					</div>
					<div>
						<h1 className="text-2xl font-extrabold text-secondary tracking-tight">Products Catalog</h1>
						<p className="text-sm text-gray-500 font-normal mt-0.5">Manage all computer hardware and accessories</p>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<span className="bg-accent/10 text-accent font-bold text-sm px-4 py-2 rounded-full border border-accent/20">
						Total Products: {products.length}
					</span>

					<button
						onClick={() => setIsLoading(true)}
						className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
					>
						<FaRedo className="text-xs" /> Refresh
					</button>

					<Link
						to="/admin/add-product"
						className="px-5 py-2.5 bg-accent hover:bg-accent/90 text-white text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
					>
						<FaPlus /> Add Product
					</Link>
				</div>
			</div>

			{/* Products Table Card */}
			<div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead className="bg-accent text-white uppercase text-xs font-extrabold tracking-wider border-b border-white/10">
							<tr>
								<th className="py-4 px-5 text-center">Image</th>
								<th className="py-4 px-5">Product ID</th>
								<th className="py-4 px-5">Name</th>
								<th className="py-4 px-5">Price</th>
								<th className="py-4 px-5">Labelled Price</th>
								<th className="py-4 px-5 text-center">Stock</th>
								<th className="py-4 px-5 text-center">Status</th>
								<th className="py-4 px-5">Category</th>
								<th className="py-4 px-5">Brand / Model</th>
								<th className="py-4 px-5 text-center">Actions</th>
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-100 text-sm text-secondary">
							{products.map((item) => {
								return (
									<tr key={item.productId} className="hover:bg-blue-50/50 transition-colors">
										<td className="py-4 px-5 text-center">
											{item.images?.[0] ? (
												<img
													src={item.images[0]}
													alt={item.name}
													className="w-14 h-14 object-cover rounded-xl border border-gray-200 mx-auto shadow-sm"
												/>
											) : (
												<div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-xs text-gray-400 mx-auto">
													No Image
												</div>
											)}
										</td>

										<td className="py-4 px-5 font-bold text-sm text-accent">
											{item.productId}
										</td>

										<td className="py-4 px-5 font-bold text-base max-w-[220px] truncate text-secondary" title={item.name}>
											{item.name}
										</td>

										<td className="py-4 px-5 font-extrabold text-base text-accent">
											{getFormattedPrice(item.price)}
										</td>

										<td className="py-4 px-5 text-gray-400 line-through text-sm font-medium">
											{item.labelledPrice > item.price ? getFormattedPrice(item.labelledPrice) : "-"}
										</td>

										<td className="py-4 px-5 text-center font-bold">
											<span className={`px-3 py-1.5 rounded-full text-xs font-bold ${item.stock > 0 ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"}`}>
												{item.stock} pcs
											</span>
										</td>

										<td className="py-4 px-5 text-center">
											<span
												className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
													item.isAvailable
														? "bg-green-100 text-green-700 border border-green-200"
														: "bg-red-100 text-red-700 border border-red-200"
												}`}
											>
												{item.isAvailable ? "Available" : "Unavailable"}
											</span>
										</td>

										<td className="py-4 px-5">
											<span className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-lg font-semibold">
												{item.category || "General"}
											</span>
										</td>

										<td className="py-4 px-5 text-sm text-gray-700">
											<p className="font-bold text-secondary text-sm">{item.brand || "-"}</p>
											<p className="text-gray-500 font-medium text-xs mt-0.5">{item.model || ""}</p>
										</td>

										<td className="py-4 px-5 text-center">
											<div className="flex items-center justify-center gap-2">
												<Link
													state={item}
													to="/admin/edit-product"
													className="p-2.5 bg-blue-50 text-accent hover:bg-accent hover:text-white rounded-xl transition-all"
													title="Edit Product"
												>
													<FaEdit className="text-lg" />
												</Link>

												<DeleteProductModel product={item} refresh={() => setIsLoading(true)} />
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>

			{/* Floating Quick Add Button */}
			<Link
				to="/admin/add-product"
				title="Add New Product"
				className="w-14 h-14 bg-accent hover:bg-accent/90 text-white rounded-full text-xl shadow-2xl flex justify-center items-center fixed right-8 bottom-8 hover:scale-110 transition-all z-40"
			>
				<FaPlus />
			</Link>
		</div>
	);
}