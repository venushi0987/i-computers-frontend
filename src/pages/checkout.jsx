import { useState, useEffect } from "react";
import { getCartTotal } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { useLocation, useNavigate } from "react-router-dom";
import OrderModal from "../components/orderModal";
import toast from "react-hot-toast";

export default function Checkout() {
	const location = useLocation();
	const navigate = useNavigate();
	const [cart, setCart] = useState(location.state || []);

	useEffect(() => {
		if (!cart || cart.length === 0) {
			toast.error("Your cart is empty! Please add products before checking out.", {
				id: "checkout-empty-cart",
				duration: 4000,
			});
			navigate("/products");
		}
	}, [cart, navigate]);

	if (!cart || cart.length === 0) {
		return null;
	}

	return (
		<div className="w-full min-h-[calc(100vh-90px)] overflow-y-auto bg-primary flex flex-col items-center py-6 pb-[140px] px-4 font-sans">
			{/* Order Progress Stepper Bar */}
			<div className="w-full max-w-xl bg-white p-4 mb-6 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
				<div className="flex items-center gap-2 text-accent font-semibold text-sm">
					<span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">1</span>
					<span>Cart Items</span>
				</div>
				<div className="h-0.5 flex-1 bg-accent mx-3"></div>
				<div className="flex items-center gap-2 text-accent font-bold text-sm">
					<span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold ring-4 ring-accent/20">2</span>
					<span>Checkout</span>
				</div>
				<div className="h-0.5 flex-1 bg-gray-200 mx-3"></div>
				<div className="flex items-center gap-2 text-gray-400 font-medium text-sm">
					<span className="w-7 h-7 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">3</span>
					<span>Complete</span>
				</div>
			</div>

			<h2 className="text-xl font-bold text-secondary mb-4 w-full max-w-xl text-left">Review Order Items ({cart.length})</h2>

			{/* Cart Items List */}
			<div className="w-full max-w-xl space-y-3">
				{cart.map((item, index) => {
					const currentQty = item.quantity || item.qty || 1;
					return (
						<div key={index} className="w-full bg-white p-3.5 rounded-2xl shadow-sm border border-gray-200 flex gap-4 items-center">
							<img
								src={item.product?.images?.[0] || item.product?.image || "/placeholder.jpg"}
								alt={item.product?.name}
								className="w-24 h-24 object-contain p-2 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0"
							/>

							<div className="flex-1 min-w-0 flex flex-col justify-between">
								<div>
									<h3 className="font-semibold text-secondary text-base line-clamp-1">{item.product?.name}</h3>
									<div className="flex items-center gap-2 mt-1">
										<span className="text-lg font-bold text-accent">{getFormattedPrice(item.product?.price || 0)}</span>
										{item.product?.labelledPrice > item.product?.price && (
											<span className="text-xs text-gray-400 line-through">{getFormattedPrice(item.product.labelledPrice)}</span>
										)}
									</div>
								</div>

								<div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
									<div className="h-8 border border-accent rounded-lg overflow-hidden flex items-center bg-gray-50">
										<button
											onClick={() => {
												if (currentQty > 1) {
													const newCart = [...cart];
													newCart[index] = { ...newCart[index], quantity: currentQty - 1, qty: currentQty - 1 };
													setCart(newCart);
												}
											}}
											className="w-8 h-full hover:bg-accent hover:text-white text-secondary font-bold transition-colors bg-gray-200 cursor-pointer"
										>
											-
										</button>
										<span className="w-9 h-full flex items-center justify-center text-sm font-semibold text-secondary">{currentQty}</span>
										<button
											onClick={() => {
												const newCart = [...cart];
												newCart[index] = { ...newCart[index], quantity: currentQty + 1, qty: currentQty + 1 };
												setCart(newCart);
											}}
											className="w-8 h-full hover:bg-accent hover:text-white text-secondary font-bold transition-colors bg-gray-200 cursor-pointer"
										>
											+
										</button>
									</div>

									<p className="text-accent font-extrabold text-base">
										{getFormattedPrice((item.product?.price || 0) * currentQty)}
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			{/* Sticky Fixed Bottom Summary Bar */}
			<div className="w-full max-w-xl fixed bottom-[75px] lg:bottom-4 bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl p-4 flex items-center justify-between z-40">
				<div>
					<span className="text-xs text-gray-500 block font-medium">Total Order Amount</span>
					<span className="text-2xl font-black text-accent">{getFormattedPrice(getCartTotal(cart))}</span>
				</div>

				<OrderModal cart={cart} />
			</div>
		</div>
	);
}