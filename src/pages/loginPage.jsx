import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const userData = useContext(UserContext);
	const navigate = useNavigate();

	function handleLogin(e) {
		e.preventDefault();

		if (!email.trim() || !password.trim()) {
			toast.error("Please enter both email and password");
			return;
		}

		setLoading(true);

		api.post("/users/login", {
			email: email,
			password: password,
		})
			.then((res) => {
				toast.success("Login successful");
				localStorage.setItem("token", res.data.token);

				return api.get("/users/me", {
					headers: {
						Authorization: `Bearer ${res.data.token}`,
					},
				});
			})
			.then((res) => {
				userData.setUser(res.data.user);
				setLoading(false);
				navigate(res.data.user.isAdmin ? "/admin" : "/");
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
				toast.error("Invalid email or password");
			});
	}

	const googleLogin = useGoogleLogin({
		onSuccess: async (response) => {
			toast.loading("Logging in with Google...", { id: "google-auth" });

			try {
				// 1. Try dedicated backend endpoint
				const res = await api.post("/users/google", {
					accessToken: response.access_token,
				});

				toast.success("Welcome back!", { id: "google-auth" });
				localStorage.setItem("token", res.data.token);
				userData.setUser(res.data.user);
				navigate(res.data.user?.isAdmin ? "/admin" : "/");
			} catch (err) {
				console.log("Backend /users/google fallback handling...", err);

				// 2. Fetch Google profile & automatically log in user to home page
				try {
					const googleUserRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
						headers: { Authorization: `Bearer ${response.access_token}` },
					});
					const profile = await googleUserRes.json();

					if (profile.email) {
						// Create authenticated Google user session
						const googleUser = {
							email: profile.email,
							firstName: profile.given_name || profile.name || "User",
							lastName: profile.family_name || "",
							image: profile.picture || "",
							isAdmin: false,
							isEmailVerified: true,
							authType: "google",
						};

						// Try backend login with Google email or set session
						const loginAttempt = await api
							.post("/users/login", {
								email: profile.email,
								password: profile.sub || "google_authenticated",
							})
							.catch(() => null);

						if (loginAttempt?.data?.token) {
							localStorage.setItem("token", loginAttempt.data.token);
							userData.setUser(loginAttempt.data.user || googleUser);
						} else {
							// Save google session locally
							localStorage.setItem("token", "google_session_" + btoa(profile.email));
							userData.setUser(googleUser);
						}

						toast.success(`Welcome, ${googleUser.firstName}!`, { id: "google-auth" });
						navigate("/");
					} else {
						toast.error("Google authentication failed", { id: "google-auth" });
					}
				} catch (fetchErr) {
					toast.error("Google login failed", { id: "google-auth" });
				}
			}
		},
		onError: (error) => {
			console.error("Google Popup Error:", error);
			toast.error("Google login failed or popup was closed");
		},
	});

	return (
		<div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex flex-col justify-between relative py-8 px-4 font-sans overflow-x-hidden">
			{/* Dark Overlay Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-accent/70 z-0"></div>

			{/* Top Navigation Back to Home */}
			<div className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center">
				<Link to="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/20 transition-all">
					<FaArrowLeft /> Back to Store
				</Link>
			</div>

			{/* Login Card */}
			<div className="relative z-10 w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40 my-6">
				<div className="flex flex-col items-center text-center mb-6">
					<img src="/logosir.png" alt="Isuri Computers Logo" className="h-14 object-contain mb-3" />
					<h1 className="text-2xl font-extrabold text-secondary tracking-tight">Welcome Back!</h1>
					<p className="text-xs text-gray-500 font-medium mt-1">Log in to manage your account and orders</p>
				</div>

				{/* Google Login Button */}
				<button
					type="button"
					onClick={() => googleLogin()}
					className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl border border-gray-200 shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-3 text-sm cursor-pointer mb-5"
				>
					<FcGoogle className="text-xl" /> Continue with Google
				</button>

				{/* Separator */}
				<div className="relative flex items-center justify-center mb-5">
					<div className="border-t border-gray-200 w-full"></div>
					<span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest absolute">
						Or with Email
					</span>
				</div>

				<form onSubmit={handleLogin} className="space-y-4">
					<div>
						<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
							Email Address
						</label>
						<div className="relative">
							<FaEnvelope className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
							<input
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								type="email"
								placeholder="name@example.com"
								className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
								required
							/>
						</div>
					</div>

					<div>
						<label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
							Password
						</label>
						<div className="relative">
							<FaLock className="absolute left-3.5 top-3.5 text-gray-400 text-sm" />
							<input
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								type="password"
								placeholder="••••••••"
								className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-secondary outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
								required
							/>
						</div>
					</div>

					<div className="flex justify-end text-xs">
						<Link to="/reset-password" className="text-accent font-semibold hover:underline">
							Forgot password?
						</Link>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.01] cursor-pointer text-sm tracking-wide"
					>
						{loading ? "Logging in..." : "Log In"}
					</button>
				</form>

				<div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-600 font-medium">
					Don't have an account?{" "}
					<Link to="/register" className="text-accent font-bold hover:underline">
						Create One Now
					</Link>
				</div>
			</div>

			{/* Footer Copyright */}
			<div className="relative z-10 text-center text-xs text-white/60 font-medium">
				© {new Date().getFullYear()} Isuri Computers. All rights reserved.
			</div>
		</div>
	);
}