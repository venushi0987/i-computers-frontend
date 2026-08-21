import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import UserData from "./userData";
import { CiBoxList, CiHome, CiPhone, CiShoppingCart } from "react-icons/ci";
import { FaTachometerAlt } from "react-icons/fa";
import { getCart } from "../lib/cart";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/userContext";

export default function Header() {
	const location = useLocation();
	const userData = useContext(UserContext);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const cart = getCart();
		const count = cart.reduce((acc, item) => acc + (item.quantity || item.qty || 1), 0);
		setCartCount(count);
	}, [location]);

	return (
		<>
			<header className="w-full h-[85px] bg-accent/95 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 flex px-6 justify-between items-center shadow-lg transition-all">
				<Link to="/" className="h-[55px] flex items-center hover:opacity-90 transition-opacity">
					<img src="/logo-white.png" alt="Isuri Computers Logo" referrerPolicy="no-referrer" className="h-full object-contain" />
				</Link>

				{/* Desktop Navigation Links */}
				<div className="h-full text-white font-semibold hidden lg:flex items-center gap-1">
					<Link
						to="/"
						className={`h-full flex items-center px-6 relative transition-all duration-300 ${
							location.pathname === "/"
								? "text-yellow-300 font-extrabold after:content-[''] after:absolute after:bottom-3 after:left-5 after:right-5 after:h-1 after:bg-yellow-400 after:rounded-full shadow-sm"
								: "hover:text-blue-200"
						}`}
					>
						Home
					</Link>
					<Link
						to="/products"
						className={`h-full flex items-center px-6 relative transition-all duration-300 ${
							location.pathname.startsWith("/products")
								? "text-yellow-300 font-extrabold after:content-[''] after:absolute after:bottom-3 after:left-5 after:right-5 after:h-1 after:bg-yellow-400 after:rounded-full shadow-sm"
								: "hover:text-blue-200"
						}`}
					>
						Products
					</Link>
					<Link
						to="/about"
						className={`h-full flex items-center px-6 relative transition-all duration-300 ${
							location.pathname === "/about"
								? "text-yellow-300 font-extrabold after:content-[''] after:absolute after:bottom-3 after:left-5 after:right-5 after:h-1 after:bg-yellow-400 after:rounded-full shadow-sm"
								: "hover:text-blue-200"
						}`}
					>
						About
					</Link>
				</div>

				{/* Desktop Right User & Cart Area */}
				<div className="h-full hidden lg:flex items-center justify-between gap-5">
					{/* Admin Portal Return Button for Admins */}
					{userData.user?.isAdmin && (
						<Link
							to="/admin"
							className="bg-yellow-400 hover:bg-yellow-300 text-secondary font-extrabold text-xs px-4 py-2 rounded-xl shadow-md transition-all flex items-center gap-2 tracking-wide"
						>
							<FaTachometerAlt /> Admin Portal
						</Link>
					)}

					<Link to="/cart" className="relative p-2 hover:scale-110 transition-transform cursor-pointer">
						<PiShoppingCartSimpleLight className="text-white text-3xl" />
						{cartCount > 0 && (
							<span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
								{cartCount}
							</span>
						)}
					</Link>
					<UserData />
				</div>
			</header>

			{/* Mobile Bottom Navigation Bar */}
			<div className="fixed bottom-0 flex lg:hidden w-screen h-[70px] z-50 bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200 justify-evenly items-center">
				<Link className={`h-full flex flex-col items-center justify-center transition-colors ${location.pathname === "/" ? "text-accent font-bold" : "text-gray-500"}`} to="/">
					<CiHome className="text-2xl" />
					<span className="text-xs mt-0.5">Home</span>
				</Link>

				<Link className={`h-full flex flex-col items-center justify-center transition-colors ${location.pathname.startsWith("/products") ? "text-accent font-bold" : "text-gray-500"}`} to="/products">
					<CiBoxList className="text-2xl" />
					<span className="text-xs mt-0.5">Products</span>
				</Link>

				<Link className={`h-full flex flex-col items-center justify-center transition-colors ${location.pathname === "/about" ? "text-accent font-bold" : "text-gray-500"}`} to="/about">
					<CiPhone className="text-2xl" />
					<span className="text-xs mt-0.5">About</span>
				</Link>

				<Link className={`h-full flex flex-col items-center justify-center relative transition-colors ${location.pathname === "/cart" ? "text-accent font-bold" : "text-gray-500"}`} to="/cart">
					<CiShoppingCart className="text-2xl" />
					<span className="text-xs mt-0.5">Cart</span>
					{cartCount > 0 && (
						<span className="absolute top-1 right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
							{cartCount}
						</span>
					)}
				</Link>

				<UserData />
			</div>
		</>
	);
}