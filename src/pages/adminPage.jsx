import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { BsCart2, BsBox } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaHome, FaSignOutAlt, FaUserShield } from "react-icons/fa";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminUsersPage from "./admin/adminUsersPage";
import AddProductsForm from "./admin/adminAddProductsForm";
import EditProductsForm from "./admin/adminEditProductForm";
import AdminOrdersPage from "./admin/adminOrdersPage";
import { useContext, useEffect } from "react";
import UserContext from "../context/userContext";

export default function AdminPage() {
	const userData = useContext(UserContext);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!userData.user || !userData.user.isAdmin) {
			navigate("/login");
		}
	}, [userData, navigate]);

	return (
		<div className="flex w-full min-h-screen bg-primary font-sans">
			{/* Admin Sidebar */}
			<aside className="w-72 bg-accent text-white min-h-screen shadow-2xl flex flex-col justify-between sticky top-0 h-screen z-30">
				<div>
					{/* Logo & Admin Title */}
					<div className="p-6 border-b border-white/10 flex flex-col items-start gap-2">
						<Link to="/" className="hover:opacity-90 transition-opacity">
							<img src="/logo-white.png" alt="Isuri Computers Logo" className="h-10 object-contain" />
						</Link>
						<span className="inline-flex items-center gap-1.5 bg-yellow-400 text-black text-xs font-bold px-2.5 py-0.5 rounded-full mt-1">
							<FaUserShield className="text-xs" /> Admin Portal
						</span>
					</div>

					{/* Navigation Links */}
					<nav className="p-4 space-y-2">
						<Link
							to="/admin"
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all ${
								location.pathname === "/admin"
									? "bg-white/15 text-yellow-300 font-bold border-l-4 border-yellow-400 shadow-sm"
									: "text-white/80 hover:bg-white/10 hover:text-white"
							}`}
						>
							<BsCart2 className="text-xl" />
							<span>Orders</span>
						</Link>

						<Link
							to="/admin/products"
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all ${
								location.pathname.startsWith("/admin/products") || location.pathname.includes("product")
									? "bg-white/15 text-yellow-300 font-bold border-l-4 border-yellow-400 shadow-sm"
									: "text-white/80 hover:bg-white/10 hover:text-white"
							}`}
						>
							<BsBox className="text-xl" />
							<span>Products</span>
						</Link>

						<Link
							to="/admin/users"
							className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base transition-all ${
								location.pathname.startsWith("/admin/users")
									? "bg-white/15 text-yellow-300 font-bold border-l-4 border-yellow-400 shadow-sm"
									: "text-white/80 hover:bg-white/10 hover:text-white"
							}`}
						>
							<FiUsers className="text-xl" />
							<span>Users</span>
						</Link>
					</nav>
				</div>

				{/* Sidebar Footer */}
				<div className="p-4 border-t border-white/10 space-y-2">
					<Link
						to="/"
						className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
					>
						<FaHome className="text-sm" /> Return to Website
					</Link>

					<button
						onClick={() => {
							localStorage.removeItem("token");
							userData.setUser(null);
							navigate("/login");
						}}
						className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors cursor-pointer"
					>
						<FaSignOutAlt className="text-sm" /> Logout
					</button>
				</div>
			</aside>

			{/* Admin Main Content Container */}
			<main className="flex-1 min-h-screen bg-gray-50 flex flex-col">
				{/* Top Header Strip */}
				<header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex justify-between items-center sticky top-0 z-20 shadow-sm">
					<h2 className="text-lg font-bold text-secondary">
						{location.pathname === "/admin" && "Orders Management"}
						{location.pathname === "/admin/products" && "Products Management"}
						{location.pathname === "/admin/users" && "Users Management"}
						{location.pathname === "/admin/add-product" && "Add New Product"}
						{location.pathname === "/admin/edit-product" && "Edit Product"}
					</h2>

					<div className="flex items-center gap-3">
						<span className="text-xs text-gray-500 font-medium">
							Logged in as: <strong className="text-secondary">{userData.user?.firstName} {userData.user?.lastName}</strong>
						</span>
					</div>
				</header>

				{/* Dynamic Page Views */}
				<div className="p-6 flex-1 overflow-y-auto">
					<Routes>
						<Route path="/" element={<AdminOrdersPage />} />
						<Route path="/products" element={<AdminProductsPage />} />
						<Route path="/users" element={<AdminUsersPage />} />
						<Route path="/add-product" element={<AddProductsForm />} />
						<Route path="/edit-product" element={<EditProductsForm />} />
					</Routes>
				</div>
			</main>
		</div>
	);
}
