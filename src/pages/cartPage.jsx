import { useState } from "react";
import { getCart, getCartTotal } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { addToCart } from "../lib/cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsCartX, BsArrowRight } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
	const [cart, setCart] = useState(getCart());
	const navigate = useNavigate();

	function handleProceedToCheckout() {
		if (!cart || cart.length === 0) {
			toast.error("Your cart is empty! Please add products to your cart first.", {
				id: "empty-cart-error",
				duration: 4000,
			});
			navigate("/products");
			return;
		}

		navigate("/checkout", { state: cart });
	}

	return (
		<div className="w-full min-h-[calc(100vh-90px)] bg-primary flex flex-col items-center py-8 pb-[140px] px-4 font-sans">
			{cart.length === 0 ? (
				/* Empty Cart State Card */
				<div className="w-full max-w-xl bg-white p-10 my-8 rounded-3xl shadow-xl border border-gray-200 text-center space-y-6 animate-fadeIn">
					<div className="w-24 h-24 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto shadow-inner">
						<BsCartX className="text-5xl" />
					</div>

					<div className="space-y-2">
						<h2 className="text-2xl font-extrabold text-secondary tracking-tight">Your Cart is Empty</h2>
						<p className="text-sm text-gray-500 max-w-md mx-auto">
							Looks like you haven't added any products to your shopping cart yet. Browse our hardware catalog and find great deals!
						</p>
					</div>

					<button
						onClick={() => navigate("/products")}
						className="px-8 py-3.5 bg-accent hover:bg-accent/90 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer inline-flex items-center gap-2"
					>
						<FaShoppingBag /> Browse Products <BsArrowRight />
					</button>
				</div>
			) : (
				/* Cart Items List */
				<div className="w-full max-w-xl space-y-3">
					<h2 className="text-xl font-extrabold text-secondary mb-4 text-left">
						Shopping Cart ({cart.length} item{cart.length > 1 ? "s" : ""})
					</h2>

					{cart.map((item, index) => {
						return (
							<div
								key={index}
								className="w-full bg-white p-3.5 rounded-2xl shadow-md border border-gray-200 flex gap-4 items-center"
							>
								<img
									src={item.product?.images?.[0] || item.product?.image || "/placeholder.jpg"}
									alt={item.product?.name}
									className="w-24 h-24 object-contain p-2 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0"
								/>

								<div className="flex-1 min-w-0 flex flex-col justify-between">
									<div>
										<h3 className="font-bold text-secondary text-base line-clamp-1">
											{item.product?.name}
										</h3>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-lg font-extrabold text-accent">
												{getFormattedPrice(item.product?.price || 0)}
											</span>
											{item.product?.labelledPrice > item.product?.price && (
												<span className="text-xs text-gray-400 line-through font-medium">
													{getFormattedPrice(item.product.labelledPrice)}
												</span>
											)}
										</div>
									</div>

									<div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
										<div className="h-8 border border-accent/30 rounded-lg overflow-hidden flex items-center bg-gray-50">
											<button
												onClick={() => {
													addToCart(item.product, -1);
													setCart(getCart());
												}}
												className="w-8 h-full hover:bg-accent hover:text-white text-secondary font-bold transition-colors bg-gray-200 cursor-pointer"
											>
												-
											</button>
											<span className="w-9 h-full flex items-center justify-center text-sm font-bold text-secondary">
												{item.quantity}
											</span>
											<button
												onClick={() => {
													addToCart(item.product, 1);
													setCart(getCart());
												}}
												className="w-8 h-full hover:bg-accent hover:text-white text-secondary font-bold transition-colors bg-gray-200 cursor-pointer"
											>
												+
											</button>
										</div>

										<p className="text-accent font-extrabold text-base">
											{getFormattedPrice((item.product?.price || 0) * item.quantity)}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{/* Sticky Fixed Bottom Summary Bar */}
			<div className="w-full max-w-xl fixed bottom-[75px] lg:bottom-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-4 flex items-center justify-between z-40">
				<div>
					<span className="text-xs text-gray-500 block font-medium">Total Order Amount</span>
					<span className="text-2xl font-black text-accent">{getFormattedPrice(getCartTotal(cart))}</span>
				</div>

				<button
					onClick={handleProceedToCheckout}
					className="bg-accent hover:bg-accent/90 transition-all duration-300 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
				>
					Proceed to Checkout <BsArrowRight />
				</button>
			</div>
		</div>
	);
}