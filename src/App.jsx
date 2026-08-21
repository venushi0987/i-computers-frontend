import "./App.css";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { Route, Routes } from "react-router-dom";
import AdminPage from "./pages/adminPage";
import TestPage from "./pages/testPage";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import api from "./lib/api";
import UserContext from "./context/userContext";
import ResetPasswordPage from "./pages/resetPassword";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

function App() {
	const [user, setUser] = useState(null);
	const [userLoadingFinished, setUserLoadingFinished] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		api
			.get("/users/me", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				setUser(res.data.user);
				setUserLoadingFinished(true);
			})
			.catch(() => {
				localStorage.removeItem("token");
				setUser(null);
				setUserLoadingFinished(true);
			});
	}, []);

	return (
		<GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
			<UserContext
				value={{
					user: user,
					setUser: setUser,
					userLoadingFinished: userLoadingFinished,
				}}
			>
				<div className="w-full h-screen bg-primary">
					<Toaster position="top-right" />
					<Routes>
						<Route path="/*" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/reset-password" element={<ResetPasswordPage />} />
						<Route path="/admin/*" element={<AdminPage />} />
						<Route path="/test" element={<TestPage />} />
					</Routes>
				</div>
			</UserContext>
		</GoogleOAuthProvider>
	);
}

export default App;