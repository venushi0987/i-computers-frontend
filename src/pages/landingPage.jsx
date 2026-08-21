import { Link } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaHeadset, FaTag } from "react-icons/fa";

export default function LandingPage() {
	return (
		<div className="w-full min-h-[calc(100vh-90px)] bg-primary flex flex-col justify-between relative overflow-x-hidden">
			{/* Video Background Hero Container */}
			<div className="w-full h-[calc(100vh-90px)] relative flex items-center justify-center">
				<video
					src="/720p.mp4"
					autoPlay
					loop
					muted
					className="w-full h-full object-cover absolute top-0 left-0 z-0"
				/>
				{/* Dark Glass Overlay */}
				<div className="w-full h-full absolute top-0 left-0 z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/80 flex flex-col justify-center items-center gap-6 text-center px-4">
					
					{/* Pill Badge */}
					<div className="inline-flex items-center gap-2 bg-accent/80 backdrop-blur-md border border-white/20 text-white text-xs lg:text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg animate-bounce">
						<span>⚡ Sri Lanka's Premier Technology Destination</span>
					</div>

					<h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-extrabold tracking-tight max-w-4xl drop-shadow-md">
						Welcome to <span className="text-blue-300">Isuri Computers</span>
					</h1>

					<p className="text-gray-200 text-base sm:text-xl lg:text-2xl max-w-2xl font-light leading-relaxed drop-shadow-sm">
						Your one-stop destination for high-performance laptops, custom gaming PCs, components, and accessories.
					</p>

					<div className="flex items-center gap-4 mt-2">
						<Link
							to="/products"
							className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3.5 rounded-xl text-lg lg:text-xl shadow-xl transition-all duration-300 transform hover:scale-105 border border-white/10"
						>
							Shop Now
						</Link>
						<Link
							to="/about"
							className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl text-lg lg:text-xl border border-white/30 transition-all duration-300"
						>
							About Us
						</Link>
					</div>

					{/* Bottom Feature Ticker Bar Overlay */}
					<div className="absolute bottom-6 w-full max-w-5xl px-4 hidden md:grid grid-cols-4 gap-4 z-20">
						<div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center gap-3 text-white">
							<FaTruck className="text-2xl text-blue-300 flex-shrink-0" />
							<div className="text-left">
								<h4 className="text-xs font-bold">Island-wide Delivery</h4>
								<p className="text-[10px] text-gray-300">Fast & Secure Shipping</p>
							</div>
						</div>

						<div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center gap-3 text-white">
							<FaShieldAlt className="text-2xl text-blue-300 flex-shrink-0" />
							<div className="text-left">
								<h4 className="text-xs font-bold">Official Warranty</h4>
								<p className="text-[10px] text-gray-300">100% Genuine Hardware</p>
							</div>
						</div>

						<div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center gap-3 text-white">
							<FaHeadset className="text-2xl text-blue-300 flex-shrink-0" />
							<div className="text-left">
								<h4 className="text-xs font-bold">Expert Tech Support</h4>
								<p className="text-[10px] text-gray-300">Dedicated Assistance</p>
							</div>
						</div>

						<div className="bg-white/10 backdrop-blur-md border border-white/15 p-3 rounded-xl flex items-center gap-3 text-white">
							<FaTag className="text-2xl text-blue-300 flex-shrink-0" />
							<div className="text-left">
								<h4 className="text-xs font-bold">Best Market Prices</h4>
								<p className="text-[10px] text-gray-300">Unbeatable Value</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}