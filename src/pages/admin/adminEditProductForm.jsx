import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import uploadMedia from "../../lib/uploadMedia";
import api from "../../lib/api";
import { CiCircleInfo } from "react-icons/ci";
import LoadingAnimation from "../../components/loadingAnimation";
import { FaSave, FaTimes, FaBoxOpen, FaDollarSign, FaTags, FaImage } from "react-icons/fa";

export default function EditProductsForm() {
	const location = useLocation();
	const navigate = useNavigate();

	const [productId, setProductId] = useState(location?.state?.productId || "");
	const [name, setName] = useState(location?.state?.name || "");
	const [altNames, setAltNames] = useState(location?.state?.altNames ? location.state.altNames.join(",") : "");
	const [description, setDescription] = useState(location?.state?.description || "");
	const [images, setImages] = useState([]);
	const [price, setPrice] = useState(location?.state?.price || "");
	const [labelledPrice, setLabelledPrice] = useState(location?.state?.labelledPrice || "");
	const [stock, setStock] = useState(location?.state?.stock || "");
	const [isAvailable, setIsAvailable] = useState(location?.state?.isAvailable !== undefined ? location?.state?.isAvailable : true);
	const [category, setCategory] = useState(location?.state?.category || "");
	const [brand, setBrand] = useState(location?.state?.brand || "");
	const [model, setModel] = useState(location?.state?.model || "");
	const [loading, setLoading] = useState(false);

	if (!location?.state) {
		toast.error("No product data found");
		navigate("/admin/products");
	}

	async function handleUpdate() {
		setLoading(true);
		const token = localStorage.getItem("token");
		if (token == null) {
			toast.error("You are not logged in");
			navigate("/login");
			return;
		}

		const productData = {
			productId: productId,
			name: name,
			altNames: [],
			description: description,
			images: [],
			price: Number(price),
			labelledPrice: Number(labelledPrice) || Number(price),
			stock: Number(stock) || 0,
			isAvailable: isAvailable === true || isAvailable === "true",
			category: category,
			brand: brand,
			model: model,
		};

		try {
			const imageUploadPromises = [];

			for (let i = 0; i < images.length; i++) {
				imageUploadPromises[i] = uploadMedia(images[i]);
			}

			const uploadedImages = await Promise.all(imageUploadPromises);

			if (uploadedImages.length > 0) {
				productData.images = uploadedImages;
			} else {
				productData.images = location?.state?.images || [];
			}

			productData.altNames = altNames ? altNames.split(",").map((s) => s.trim()) : [];

			await api.put("/products/" + productId, productData, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});

			toast.success("Product updated successfully!");
			navigate("/admin/products");
		} catch (err) {
			console.error(err);
			toast.error("Failed to update product");
			setLoading(false);
		}
	}

	return (
		<div className="w-full max-w-5xl mx-auto py-6 px-4">
			{loading && <LoadingAnimation />}

			{/* Form Header */}
			<div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
				<div className="flex items-center gap-3">
					<div className="p-3 bg-accent/10 text-accent rounded-xl">
						<FaBoxOpen className="text-2xl" />
					</div>
					<div>
						<h1 className="text-2xl font-bold text-secondary">Edit Product</h1>
						<p className="text-xs text-gray-500">Update inventory details for {productId}</p>
					</div>
				</div>

				<div className="flex gap-3 w-full sm:w-auto">
					<Link
						to="/admin/products"
						className="flex-1 sm:flex-initial px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors text-sm flex items-center justify-center gap-2"
					>
						<FaTimes /> Cancel
					</Link>
					<button
						className="flex-1 sm:flex-initial px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-md transition-colors text-sm cursor-pointer flex items-center justify-center gap-2"
						onClick={handleUpdate}
					>
						<FaSave /> Update Product
					</button>
				</div>
			</div>

			{/* Form Body Cards */}
			<div className="space-y-6">
				{/* 1. Basic Info Section */}
				<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
					<h3 className="text-base font-bold text-secondary border-b border-gray-100 pb-3 flex items-center gap-2">
						<FaTags className="text-accent text-sm" /> 1. General Product Details
					</h3>

					<div className="grid grid-cols-1 md:grid-cols-12 gap-4">
						<div className="md:col-span-3">
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Product ID (Read-only)
							</label>
							<input
								type="text"
								disabled
								value={productId}
								className="w-full px-3.5 py-2.5 bg-gray-100 border border-gray-300 rounded-xl text-sm text-gray-500 cursor-not-allowed font-mono"
							/>
						</div>

						<div className="md:col-span-5">
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Product Name *
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
								required
							/>
						</div>

						<div className="md:col-span-4">
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
								Alternative Names <CiCircleInfo className="text-accent text-sm" title="Comma-Separated" />
							</label>
							<input
								type="text"
								value={altNames}
								onChange={(e) => setAltNames(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
							Description & Overview
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows="4"
							className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
						></textarea>
					</div>

					<div>
						<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1">
							<FaImage className="text-accent" /> Replace Product Images (Optional)
						</label>
						<input
							type="file"
							multiple={true}
							onChange={(e) => setImages(e.target.files)}
							className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-accent file:text-white hover:file:bg-accent/90 cursor-pointer"
						/>
					</div>
				</div>

				{/* 2. Pricing & Inventory Section */}
				<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
					<h3 className="text-base font-bold text-secondary border-b border-gray-100 pb-3 flex items-center gap-2">
						<FaDollarSign className="text-accent text-sm" /> 2. Pricing & Stock Inventory
					</h3>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Selling Price (LKR) *
							</label>
							<input
								type="number"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
								required
							/>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Labelled Price (LKR)
							</label>
							<input
								type="number"
								value={labelledPrice}
								onChange={(e) => setLabelledPrice(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Stock Quantity
							</label>
							<input
								type="number"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Availability Status
							</label>
							<select
								value={isAvailable}
								onChange={(e) => setIsAvailable(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							>
								<option value={true}>Available</option>
								<option value={false}>Not Available</option>
							</select>
						</div>
					</div>
				</div>

				{/* 3. Category & Specifications Section */}
				<div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
					<h3 className="text-base font-bold text-secondary border-b border-gray-100 pb-3 flex items-center gap-2">
						<FaTags className="text-accent text-sm" /> 3. Categorization & Specs
					</h3>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Category *
							</label>
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
								required
							>
								<option value="">Select Category</option>
								<option value="Laptop">Laptop</option>
								<option value="Desktop">Desktop</option>
								<option value="Monitor">Monitor</option>
								<option value="Keyboard">Keyboard</option>
								<option value="Mouse">Mouse</option>
								<option value="Graphics Card">Graphics Card</option>
								<option value="Processor">Processor</option>
								<option value="Motherboard">Motherboard</option>
								<option value="Power Supply">Power Supply</option>
								<option value="RAM">RAM</option>
								<option value="Storage">Storage</option>
								<option value="Cooling">Cooling</option>
								<option value="Web Cam">Web Cam</option>
								<option value="Headset">Headset</option>
							</select>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Brand
							</label>
							<input
								type="text"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
								Model
							</label>
							<input
								type="text"
								value={model}
								onChange={(e) => setModel(e.target.value)}
								className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}