import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";
import ImageSlideShow from "../components/imageSlideShow";
import { BiCategory } from "react-icons/bi";
import { FaAngleRight, FaShieldAlt, FaTruck, FaCheckCircle } from "react-icons/fa";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import getFormattedPrice from "../lib/price-format";
import { addToCart } from "../lib/cart";
import ReviewSection from "../components/reviewSection";

export default function ProductOverview() {
	const params = useParams();
	const location = useLocation();
	const [product, setProduct] = useState(location.state);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) {
			api.get("/products/" + params.productId)
				.then((response) => {
					setProduct(response.data);
					setLoading(false);
				})
				.catch(() => {
					toast.error("Error fetching product details");
					setProduct(null);
					setLoading(false);
				});
		}
	}, []);

	const discountPercent =
		product && product.labelledPrice > product.price
			? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
			: 0;

	const savingsAmount =
		product && product.labelledPrice > product.price ? product.labelledPrice - product.price : 0;

	return (
		<div className="w-full min-h-[calc(100vh-90px)] overflow-y-auto bg-primary pt-6 lg:pt-8 pb-[100px]">
			{loading && <LoadingAnimation />}
			{product != null && (
				<div className="w-full max-w-7xl mx-auto flex flex-col px-4">
					<div className="w-full h-auto flex flex-col lg:flex-row bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden p-4 lg:p-8">
						<h1 className="lg:hidden text-2xl py-2 font-bold text-secondary">
							{product.name}
							{product.altNames?.map((name, index) => (
								<span key={index} className="font-normal text-gray-500 text-lg">
									{" "}
									| {name}
								</span>
							))}
						</h1>

						<div className="lg:w-1/2 flex justify-center items-center p-2 bg-gray-50 rounded-xl">
							<ImageSlideShow images={product.images} />
						</div>

						<div className="w-full lg:w-1/2 p-4 lg:p-8 flex flex-col justify-between">
							<div>
								<div className="flex items-center justify-between mb-2">
									<span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
										Product ID: {product.productId}
									</span>
									<span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
										<FaCheckCircle className="text-xs" /> In Stock & Ready to Ship
									</span>
								</div>

								<h1 className="hidden lg:block text-3xl font-extrabold text-secondary leading-snug">
									{product.name}
									{product.altNames?.map((name, index) => (
										<span key={index} className="font-normal text-gray-400 text-xl">
											{" "}
											| {name}
										</span>
									))}
								</h1>

								{/* Category & Brand Badges */}
								<div className="flex flex-wrap gap-4 my-4 text-sm">
									<p className="flex items-center text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
										<BiCategory className="mr-1 text-accent" />
										<span className="font-medium text-secondary">Category:</span>
										<FaAngleRight className="mx-1 text-xs text-gray-400" />
										<span className="font-bold text-accent">{product.category}</span>
									</p>

									<p className="flex items-center text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
										<HiOutlineBadgeCheck className="mr-1 text-accent text-base" />
										<span className="font-medium text-secondary">{product.brand}</span>
										<FaAngleRight className="mx-1 text-xs text-gray-400" />
										<span className="font-bold text-accent">{product.model}</span>
									</p>
								</div>

								{/* Pricing */}
								<div className="flex items-baseline gap-3 my-4 flex-wrap">
									<p className="text-4xl font-black text-accent">{getFormattedPrice(product.price)}</p>
									{product.labelledPrice > product.price && (
										<>
											<span className="text-xl font-normal line-through text-gray-400">
												{getFormattedPrice(product.labelledPrice)}
											</span>
											<span className="bg-red-100 text-red-600 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
												SAVE {discountPercent}% ({getFormattedPrice(savingsAmount)} OFF)
											</span>
										</>
									)}
								</div>

								<p className="text-base text-gray-600 leading-relaxed mb-6 border-t border-b border-gray-100 py-4">
									{product.description}
								</p>
							</div>

							{/* Actions & Buttons */}
							<div>
								<div className="w-full flex gap-3 mb-6">
									<button
										className="flex-1 h-[55px] bg-white border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-all duration-300 cursor-pointer shadow-sm text-base"
										onClick={() => {
											addToCart(product, 1);
											toast.success("Product added to cart");
										}}
									>
										Add to Cart
									</button>

									<button
										onClick={() => {
											navigate("/checkout", {
												state: [
													{
														product: {
															productId: product.productId,
															name: product.name,
															price: product.price,
															labelledPrice: product.labelledPrice,
															image: product.images[0],
														},
														qty: 1,
														quantity: 1,
													},
												],
											});
										}}
										className="flex-1 h-[55px] bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all duration-300 cursor-pointer shadow-md text-base"
									>
										Buy Now
									</button>
								</div>

								{/* Decorative Guarantee Box */}
								<div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600">
									<div className="flex items-center gap-2">
										<FaShieldAlt className="text-accent text-base" />
										<span>Official Warranty Guaranteed</span>
									</div>
									<div className="flex items-center gap-2">
										<FaTruck className="text-accent text-base" />
										<span>Island-wide Delivery</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="w-full mt-8">
						<ReviewSection productId={product.productId} />
					</div>
				</div>
			)}

			{product == null && !loading && (
				<div className="w-full h-full flex justify-center items-center py-20">
					<h1 className="text-3xl font-bold text-gray-700">Product not found</h1>
				</div>
			)}
		</div>
	);
}