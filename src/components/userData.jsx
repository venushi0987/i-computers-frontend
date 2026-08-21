import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { CiUser } from "react-icons/ci";
import { FaUserCircle, FaCog, FaShoppingBag, FaSignOutAlt, FaChevronDown, FaCamera, FaTachometerAlt } from "react-icons/fa";
import uploadMedia from "../lib/uploadMedia";
import api from "../lib/api";
import toast from "react-hot-toast";

export default function UserData() {
	const userData = useContext(UserContext);
	const navigate = useNavigate();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [imgError, setImgError] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const dropdownRef = useRef(null);
	const fileInputRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event) {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const handleImageChange = async (e) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const token = localStorage.getItem("token");
		if (!token) {
			toast.error("Please login to update profile picture");
			return;
		}

		try {
			setIsUploading(true);
			toast.loading("Uploading new profile photo...", { id: "avatar-upload" });

			const uploadedUrl = await uploadMedia(file);

			await api.put(
				"/users/update",
				{
					firstName: userData.user?.firstName,
					lastName: userData.user?.lastName,
					image: uploadedUrl,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			userData.setUser({
				...userData.user,
				image: uploadedUrl,
			});

			setImgError(false);
			toast.success("Profile photo updated successfully!", { id: "avatar-upload" });
		} catch (err) {
			console.error(err);
			toast.error("Failed to update profile photo", { id: "avatar-upload" });
		} finally {
			setIsUploading(false);
		}
	};

	if (userData.user == null) {
		return (
			<>
				{/* Desktop Login / Register links */}
				<div className="text-white text-sm font-medium hidden lg:flex items-center gap-2">
					<Link to="/login" className="hover:text-blue-200 transition-colors">
						Login
					</Link>
					<span className="text-white/40">|</span>
					<Link to="/register" className="hover:text-blue-200 transition-colors">
						Register
					</Link>
				</div>

				{/* Mobile Login Navigation Link */}
				<Link className="flex lg:hidden flex-col items-center justify-center text-gray-500 hover:text-accent transition-colors cursor-pointer" to="/login">
					<CiUser className="text-2xl" />
					<span className="text-xs mt-0.5">Login</span>
				</Link>
			</>
		);
	}

	const userName = `${userData.user.firstName || ""} ${userData.user.lastName || ""}`.trim() || "User";

	return (
		<div className="relative" ref={dropdownRef}>
			{/* Hidden File Input for Avatar Upload */}
			<input
				type="file"
				ref={fileInputRef}
				accept="image/*"
				onChange={handleImageChange}
				className="hidden"
			/>

			{/* User Trigger Button */}
			<button
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
			>
				<div className="relative group">
					{userData.user.image && !imgError ? (
						<img
							src={userData.user.image}
							alt={userName}
							onError={() => setImgError(true)}
							className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border-2 border-accent lg:border-white/80 shadow-md group-hover:opacity-80 transition-opacity"
						/>
					) : (
						<FaUserCircle className="text-2xl lg:text-4xl text-accent lg:text-white/90 group-hover:opacity-80 transition-opacity" />
					)}
					<div
						onClick={(e) => {
							e.stopPropagation();
							fileInputRef.current?.click();
						}}
						title="Upload Profile Picture"
						className="absolute -bottom-1 -right-1 lg:bottom-0 lg:right-0 bg-accent text-white p-1 rounded-full text-[9px] lg:text-[10px] border border-white shadow-sm hover:scale-110 transition-transform cursor-pointer"
					>
						<FaCamera />
					</div>
				</div>

				<span className="hidden lg:inline text-sm font-semibold text-white max-w-[120px] truncate">
					{userName}
				</span>
				<span className="inline lg:hidden text-[10px] text-gray-600 font-bold max-w-[60px] truncate">
					Profile
				</span>
				<FaChevronDown className={`hidden lg:block text-xs text-white/80 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
			</button>

			{/* Custom Dropdown Menu (Opens Upward on Mobile, Downward on Desktop) */}
			{dropdownOpen && (
				<div className="absolute right-0 bottom-full mb-3 lg:bottom-auto lg:top-full lg:mb-0 lg:mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-fadeIn">
					<div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
						<div>
							<p className="text-[11px] text-gray-400 font-medium">Signed in as</p>
							<p className="text-sm font-bold text-secondary truncate">{userName}</p>
						</div>
					</div>

					{/* Admin Portal Shortcut for Admins */}
					{userData.user?.isAdmin && (
						<button
							onClick={() => {
								setDropdownOpen(false);
								navigate("/admin");
							}}
							className="w-full px-4 py-2.5 text-left text-xs font-extrabold text-accent bg-blue-50 hover:bg-accent hover:text-white flex items-center gap-2.5 transition-colors cursor-pointer border-b border-gray-100"
						>
							<FaTachometerAlt className="text-sm" /> Admin Dashboard
						</button>
					)}

					{/* Upload Photo Button inside Dropdown */}
					<button
						disabled={isUploading}
						onClick={() => {
							setDropdownOpen(false);
							fileInputRef.current?.click();
						}}
						className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-accent/10 hover:text-accent flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
					>
						<FaCamera className="text-accent text-xs" /> Change Profile Photo
					</button>

					<button
						onClick={() => {
							setDropdownOpen(false);
							navigate("/settings");
						}}
						className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-accent/10 hover:text-accent flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
					>
						<FaCog className="text-gray-400 text-xs" /> Account Settings
					</button>

					<button
						onClick={() => {
							setDropdownOpen(false);
							navigate("/my-orders");
						}}
						className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-accent/10 hover:text-accent flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
					>
						<FaShoppingBag className="text-gray-400 text-xs" /> My Orders
					</button>

					<div className="border-t border-gray-100 my-1"></div>

					<button
						onClick={() => {
							setDropdownOpen(false);
							localStorage.removeItem("token");
							userData.setUser(null);
							navigate("/login");
						}}
						className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer font-medium"
					>
						<FaSignOutAlt className="text-xs" /> Logout
					</button>
				</div>
			)}
		</div>
	);
}