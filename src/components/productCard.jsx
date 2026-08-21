import getFormattedPrice from "../lib/price-format";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductCard(props) {
	const product = props.product;

	const discountPercent =
		product.labelledPrice > product.price
			? Math.round(((product.labelledPrice - product.price) / product.labelledPrice) * 100)
			: 0;

	// Use dynamic rating from product data if available, fallback to 5.0
	const ratingValue = product.rating ? Number(product.rating).toFixed(1) : "5.0";

	const firstImage = product.images?.[0] || product.image || "/placeholder.jpg";
	const secondImage = product.images?.[1] || null;

	return (
		<Link
			to={"/overview/" + product.productId}
			state={product}
			className="group bg-white w-[350px] lg:w-[380px] h-[510px] m-4 shadow-md hover:shadow-2xl rounded-2xl flex flex-col overflow-hidden transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100 relative cursor-pointer"
		>
			{/* Discount Badge Tag */}
			{discountPercent > 0 && (
				<div className="absolute top-3 left-3 z-20 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
					-{discountPercent}% OFF
				</div>
			)}

			{/* Category Tag */}
			{product.category && (
				<div className="absolute top-3 right-3 z-20 bg-accent/80 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
					{product.category}
				</div>
			)}

			{/* Smooth Cross-Fade Flip Image Container */}
			<div className="w-full h-[340px] relative overflow-hidden bg-gray-50 flex items-center justify-center">
				<img
					src={firstImage}
					alt={product.name}
					className="w-full h-full object-contain p-4 absolute transition-all duration-700 ease-in-out group-hover:scale-105"
				/>
				{secondImage && (
					<img
						src={secondImage}
						alt={product.name}
						className="w-full h-full object-contain p-4 absolute bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out group-hover:scale-105"
					/>
				)}
			</div>

			<div className="p-4 flex flex-col justify-between flex-1 bg-white z-10">
				<div>
					<div className="flex items-center justify-between text-xs text-gray-400 mb-1">
						<span className="font-medium text-gray-500">{product.productId}</span>
						<span className="flex items-center text-amber-500 font-bold gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
							<FaStar className="text-xs text-amber-400" /> {ratingValue}
						</span>
					</div>
					<h3 className="text-base font-semibold text-secondary line-clamp-2 group-hover:text-accent transition-colors duration-300">
						{product.name}
					</h3>
				</div>

				<div className="mt-3 pt-2 border-t border-gray-100 flex items-baseline justify-between">
					<div className="flex flex-col">
						{product.labelledPrice > product.price && (
							<span className="text-xs text-gray-400 line-through">
								{getFormattedPrice(product.labelledPrice)}
							</span>
						)}
						<span className="text-xl font-extrabold text-accent">
							{getFormattedPrice(product.price)}
						</span>
					</div>
					<span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors duration-300">
						View Details
					</span>
				</div>
			</div>
		</Link>
	);
}