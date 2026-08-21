import { useContext, useState } from "react";
import UserContext from "../context/userContext";
import uploadMedia from "../lib/uploadMedia";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import toast from "react-hot-toast";
import { FaUser, FaLock, FaCamera, FaUserCog, FaShieldAlt, FaSave } from "react-icons/fa";

export default function SettingsPage() {
	const userInfo = useContext(UserContext);

	const [firstName, setFirstName] = useState(userInfo.user?.firstName || "");
	const [lastName, setLastName] = useState(userInfo.user?.lastName || "");
	const [image, setImage] = useState(null);
	const [previewUrl, setPreviewUrl] = useState(userInfo.user?.image || null);

	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	function handleImageChange(e) {
		const file = e.target.files[0];
		if (file) {
			setImage(file);
			setPreviewUrl(URL.createObjectURL(file));
		}
	}

	async function handleProfileUpdate() {
		const token = localStorage.getItem("token");

		if (token != null) {
			try {
				setIsLoading(true);

				const data = {
					firstName: firstName,
					lastName: lastName,
					image: userInfo.user?.image,
				};

				if (image != null) {
					data.image = await uploadMedia(image);
				}

				await api.put("/users/update", data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				toast.success("Profile updated successfully!");
				window.location.reload();
			} catch (err) {
				console.log(err);
				toast.error("Failed to update profile");
				setIsLoading(false);
			}
		}
	}

	async function handlePasswordUpdate() {
		const token = localStorage.getItem("token");

		if (token != null) {
			if (!password) {
				toast.error("Please enter a new password");
				return;
			}

			if (password !== confirmPassword) {
				toast.error("Passwords do not match");
				return;
			}

			try {
				setIsLoading(true);

				const data = {
					password: password,
				};

				await api.put("/users/password", data, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				localStorage.removeItem("token");
				userInfo.setUser(null);

				toast.success("Password updated successfully. Please log in again.");
				window.location.href = "/login";
			} catch (err) {
				console.log(err);
				toast.error("Failed to update password");
				setIsLoading(false);
			}
		}
	}

	return (
		<div className="w-full min-h-[85vh] bg-primary py-10 px-4 font-sans space-y-8">
			{isLoading && <LoadingAnimation />}

			{/* Page Header */}
			<div className="max-w-5xl mx-auto bg-white p-6 rounded-3xl shadow-md border border-gray-200 flex items-center gap-4">
				<div className="p-4 bg-accent/10 text-accent rounded-2xl">
					<FaUserCog className="text-3xl" />
				</div>
				<div>
					<h1 className="text-2xl font-extrabold text-secondary tracking-tight">Account Settings</h1>
					<p className="text-sm text-gray-500 font-normal mt-0.5">Manage your personal profile and security preferences</p>
				</div>
			</div>

			{/* Grid Cards Container */}
			<div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* 1. Profile Details Card */}
				<div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between">
					<div className="space-y-6">
						<div className="flex items-center gap-3 border-b border-gray-100 pb-4">
							<div className="p-2.5 bg-blue-50 text-accent rounded-xl">
								<FaUser className="text-lg" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-secondary">Update Profile</h2>
								<p className="text-xs text-gray-400">Personal information & display photo</p>
							</div>
						</div>

						{/* Avatar Preview Box */}
						<div className="flex flex-col items-center justify-center pt-2 pb-4">
							<div className="relative group cursor-pointer">
								{previewUrl ? (
									<img
										src={previewUrl}
										alt="Profile Avatar"
										className="w-24 h-24 rounded-full object-cover border-4 border-accent/20 shadow-md transition-all group-hover:opacity-85"
									/>
								) : (
									<div className="w-24 h-24 rounded-full bg-accent/10 text-accent font-extrabold text-3xl flex items-center justify-center border-4 border-accent/20 shadow-md">
										{(firstName?.charAt(0) || "U").toUpperCase()}
									</div>
								)}

								<label htmlFor="profile-image-upload" className="absolute bottom-0 right-0 p-2 bg-accent text-white rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer">
									<FaCamera className="text-xs" />
								</label>
								<input
									id="profile-image-upload"
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="hidden"
								/>
							</div>
							<span className="text-xs font-semibold text-gray-500 mt-2">Click camera to upload new photo</span>
						</div>

						{/* Form Inputs */}
						<div className="space-y-4">
							<div>
								<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
									First Name
								</label>
								<div className="relative">
									<FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
										placeholder="First Name"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
									Last Name
								</label>
								<div className="relative">
									<FaUser className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
										placeholder="Last Name"
									/>
								</div>
							</div>
						</div>
					</div>

					<button
						onClick={handleProfileUpdate}
						className="w-full py-3.5 mt-8 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wide"
					>
						<FaSave /> Save Profile Changes
					</button>
				</div>

				{/* 2. Password Security Card */}
				<div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 flex flex-col justify-between">
					<div className="space-y-6">
						<div className="flex items-center gap-3 border-b border-gray-100 pb-4">
							<div className="p-2.5 bg-purple-50 text-purple-700 rounded-xl">
								<FaShieldAlt className="text-lg" />
							</div>
							<div>
								<h2 className="text-lg font-bold text-secondary">Change Password</h2>
								<p className="text-xs text-gray-400">Update account password for security</p>
							</div>
						</div>

						{/* Security Info Graphic Banner */}
						<div className="bg-purple-50/60 p-4 rounded-2xl border border-purple-100 flex items-center gap-3 text-xs text-purple-900 font-medium">
							<FaShieldAlt className="text-2xl text-purple-600 flex-shrink-0" />
							<p>Ensure your new password contains at least 6 characters with a combination of letters and numbers.</p>
						</div>

						{/* Password Form Inputs */}
						<div className="space-y-4">
							<div>
								<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
									New Password
								</label>
								<div className="relative">
									<FaLock className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
										placeholder="••••••••"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
									Confirm New Password
								</label>
								<div className="relative">
									<FaLock className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
									<input
										type="password"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
										className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
										placeholder="••••••••"
									/>
								</div>
							</div>
						</div>
					</div>

					<button
						onClick={handlePasswordUpdate}
						className="w-full py-3.5 mt-8 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2 text-sm tracking-wide"
					>
						<FaLock /> Update Password
					</button>
				</div>
			</div>
		</div>
	);
}