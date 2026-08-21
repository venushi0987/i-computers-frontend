import { Link } from "react-router-dom";
import { FaShieldAlt, FaTruck, FaHeadset, FaTag, FaLaptop, FaAward, FaUsers, FaCheckCircle } from "react-icons/fa";

export default function AboutPage() {
	return (
		<div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary overflow-y-auto pb-[100px] lg:pb-12">
			{/* Main Content Area */}
			<div className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-10">
				{/* Hero Header Section (Separated Card) */}
				<div className="w-full bg-gradient-to-r from-accent to-blue-900 text-white py-10 px-8 text-center flex flex-col items-center justify-center rounded-2xl shadow-lg relative overflow-hidden">
					<div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
					<div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
					
					<h1 className="text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
						About <span className="text-blue-300">Isuri Computers</span>
					</h1>
					<p className="text-base lg:text-lg max-w-2xl text-blue-100 font-light leading-relaxed">
						Your trusted partner for high-performance laptops, custom PC builds, genuine computer components, and exceptional tech support in Sri Lanka.
					</p>
				</div>

				{/* Who We Are & Story Section */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white p-8 rounded-2xl shadow-md border border-gray-200">
					<div className="flex flex-col gap-4">
						<span className="text-accent font-semibold tracking-wider uppercase text-sm">
							Empowering Your Tech Experience
						</span>
						<h2 className="text-3xl font-bold text-secondary">
							Who We Are
						</h2>
						<p className="text-gray-600 leading-relaxed">
							Founded with a passion for innovation, <strong>Isuri Computers</strong> has grown to become one of Sri Lanka’s premier destinations for hardware technology and computing solutions.
						</p>
						<p className="text-gray-600 leading-relaxed">
							Whether you are a student building your first PC, a gaming enthusiast seeking high-end graphics performance, or an enterprise upgrading office infrastructure, we provide authentic products backed by official manufacturer warranties.
						</p>
						<div className="flex flex-col gap-2 mt-2">
							<div className="flex items-center gap-3 text-secondary font-medium">
								<FaCheckCircle className="text-accent text-lg" /> 100% Genuine & Brand New Hardware
							</div>
							<div className="flex items-center gap-3 text-secondary font-medium">
								<FaCheckCircle className="text-accent text-lg" /> Official Manufacturer Warranty Coverage
							</div>
							<div className="flex items-center gap-3 text-secondary font-medium">
								<FaCheckCircle className="text-accent text-lg" /> Expert Technical Consultation
							</div>
						</div>
					</div>

					<div className="w-full h-full min-h-[280px] bg-accent/5 rounded-xl border border-accent/20 flex flex-col items-center justify-center p-8 text-center gap-4">
						<FaLaptop className="text-7xl text-accent" />
						<h3 className="text-2xl font-bold text-accent">Quality Hardware Guaranteed</h3>
						<p className="text-sm text-gray-600 max-w-sm">
							We partner directly with leading worldwide technology brands to bring you top-tier desktops, laptops, storage, and accessories at competitive prices.
						</p>
					</div>
				</div>

				{/* Mission & Vision Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-3">
						<div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-2xl mb-2">
							🎯
						</div>
						<h3 className="text-2xl font-bold text-secondary">Our Mission</h3>
						<p className="text-gray-600 leading-relaxed">
							To empower individuals and businesses across Sri Lanka by providing state-of-the-art computer technology, affordable pricing, and reliable after-sales service.
						</p>
					</div>

					<div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 flex flex-col gap-3">
						<div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent text-2xl mb-2">
							🌟
						</div>
						<h3 className="text-2xl font-bold text-secondary">Our Vision</h3>
						<p className="text-gray-600 leading-relaxed">
							To be the most customer-centric e-commerce tech platform in the region, recognized for excellence in authentic technology products and customer trust.
						</p>
					</div>
				</div>

				{/* Key Value Features */}
				<div className="w-full">
					<h2 className="text-2xl font-bold text-center text-secondary mb-8">
						Why Choose Isuri Computers?
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
							<FaShieldAlt className="text-4xl text-accent" />
							<h4 className="font-bold text-lg text-secondary">Official Warranty</h4>
							<p className="text-sm text-gray-600">All products come with genuine manufacturer warranty protection.</p>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
							<FaTruck className="text-4xl text-accent" />
							<h4 className="font-bold text-lg text-secondary">Island-wide Delivery</h4>
							<p className="text-sm text-gray-600">Fast, safe, and secure delivery right to your doorstep anywhere in Sri Lanka.</p>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
							<FaHeadset className="text-4xl text-accent" />
							<h4 className="font-bold text-lg text-secondary">Expert Support</h4>
							<p className="text-sm text-gray-600">Our knowledgeable technical team is always ready to guide your selection.</p>
						</div>

						<div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow">
							<FaTag className="text-4xl text-accent" />
							<h4 className="font-bold text-lg text-secondary">Best Market Prices</h4>
							<p className="text-sm text-gray-600">Enjoy premium computing equipment at fair and transparent prices.</p>
						</div>
					</div>
				</div>

				{/* Company Stats Grid */}
				<div className="bg-accent text-white p-8 rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
					<div className="flex flex-col items-center gap-1">
						<FaAward className="text-3xl text-blue-300 mb-1" />
						<span className="text-3xl font-extrabold">10+</span>
						<span className="text-sm text-blue-100 font-medium">Years Experience</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<FaUsers className="text-3xl text-blue-300 mb-1" />
						<span className="text-3xl font-extrabold">15,000+</span>
						<span className="text-sm text-blue-100 font-medium">Happy Customers</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<FaLaptop className="text-3xl text-blue-300 mb-1" />
						<span className="text-3xl font-extrabold">1,000+</span>
						<span className="text-sm text-blue-100 font-medium">Products Sold</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<FaCheckCircle className="text-3xl text-blue-300 mb-1" />
						<span className="text-3xl font-extrabold">100%</span>
						<span className="text-sm text-blue-100 font-medium">Authentic Guaranteed</span>
					</div>
				</div>

				{/* Call to Action Banner */}
				<div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 text-center flex flex-col items-center gap-4">
					<h3 className="text-2xl font-bold text-secondary">Ready to Upgrade Your Setup?</h3>
					<p className="text-gray-600 max-w-xl">
						Browse our extensive product catalog to find the latest laptops, desktops, components, and accessories.
					</p>
					<Link
						to="/products"
						className="mt-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-colors cursor-pointer"
					>
						Explore Products
					</Link>
				</div>
			</div>
		</div>
	);
}
