import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { getCartTotal } from '../lib/cart';
import getFormattedPrice from '../lib/price-format';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../lib/api';
import UserContext from '../context/userContext';
import { FaTimes, FaShieldAlt, FaShoppingBag } from 'react-icons/fa';

Modal.setAppElement('#root');

export default function OrderModal(props) {
	const userData = useContext(UserContext);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [firstName, setFirstName] = useState(userData.user?.firstName || '');
	const [lastName, setLastName] = useState(userData.user?.lastName || '');
	const [addressLine1, setAddressLine1] = useState('');
	const [addressLine2, setAddressLine2] = useState('');
	const [city, setCity] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [secondaryPhoneNumber, setSecondaryPhoneNumber] = useState('');
	const [specialNotes, setSpecialNotes] = useState('');
	const navigate = useNavigate();

	async function handleConfirmOrder() {
		const token = localStorage.getItem('token');
		if (!token || token.startsWith('google_session_')) {
			toast.error('Please log in with your email & password to place an order');
			localStorage.removeItem('token');
			userData.setUser(null);
			setModalIsOpen(false);
			navigate('/login');
			return;
		}

		if (!firstName.trim() || !lastName.trim()) {
			toast.error('Please enter your first and last name');
			return;
		}

		if (!addressLine1.trim() || !city.trim() || !phoneNumber.trim()) {
			toast.error('Please enter your address, city, and phone number');
			return;
		}

		const orderData = {
			firstName: firstName,
			lastName: lastName,
			addressLine1: addressLine1,
			addressLine2: addressLine2,
			city: city,
			postalCode: postalCode,
			phone: phoneNumber,
			secondaryPhone: secondaryPhoneNumber,
			customerNotes: specialNotes,
			items: [],
		};

		for (let i = 0; i < props.cart.length; i++) {
			const itemQty = Number(props.cart[i].quantity || props.cart[i].qty || 1);
			orderData.items.push({
				productId: props.cart[i].product.productId,
				qty: itemQty,
				quantity: itemQty,
			});
		}

		try {
			await api.post('/orders', orderData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			toast.success('Order placed successfully!');
			localStorage.setItem('cart', '[]');
			setModalIsOpen(false);
			navigate('/my-orders');
		} catch (err) {
			console.error(err);
			if (err.response?.status === 401) {
				toast.error('Your login session has expired. Please log in again.');
				localStorage.removeItem('token');
				userData.setUser(null);
				setModalIsOpen(false);
				navigate('/login');
			} else {
				toast.error(err.response?.data?.message || 'Failed to place order. Please try again.');
			}
		}
	}

	return (
		<>
			<button
				onClick={() => setModalIsOpen(true)}
				className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer flex items-center gap-2"
			>
				<FaShoppingBag /> Place Order
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.65)',
						backdropFilter: 'blur(4px)',
						zIndex: 1000,
					},
					content: {
						top: '50%',
						left: '50%',
						right: 'auto',
						bottom: 'auto',
						marginRight: '-50%',
						transform: 'translate(-50%, -50%)',
						border: 'none',
						background: 'none',
						padding: '0',
						maxWidth: '650px',
						width: '92%',
						maxHeight: '90vh',
					},
				}}
			>
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col font-sans max-h-[90vh]">
					{/* Modal Header */}
					<div className="bg-accent p-6 text-white flex justify-between items-center relative">
						<div className="flex items-center gap-3">
							<div className="p-3 bg-white/15 rounded-2xl backdrop-blur-md">
								<FaShoppingBag className="text-2xl text-yellow-400" />
							</div>
							<div>
								<h2 className="text-xl font-extrabold tracking-tight">Checkout Order Details</h2>
								<p className="text-xs text-white/80 mt-0.5">Complete your delivery address and details</p>
							</div>
						</div>

						<button
							onClick={() => setModalIsOpen(false)}
							className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
						>
							<FaTimes />
						</button>
					</div>

					{/* Modal Body Form */}
					<div className="p-6 overflow-y-auto space-y-6">
						{/* Cart Summary Header */}
						<div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 flex justify-between items-center text-sm">
							<span className="font-semibold text-secondary">Total Amount Payable:</span>
							<span className="font-extrabold text-accent text-lg">{getFormattedPrice(getCartTotal(props.cart))}</span>
						</div>

						{/* Form Fields */}
						<div className="space-y-4">
							<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2">
								1. Shipping Contact
							</h3>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">First Name *</label>
									<input
										type="text"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
										required
									/>
								</div>

								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">Last Name *</label>
									<input
										type="text"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
										required
									/>
								</div>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">Primary Phone *</label>
									<input
										type="tel"
										value={phoneNumber}
										onChange={(e) => setPhoneNumber(e.target.value)}
										placeholder="077 123 4567"
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
										required
									/>
								</div>

								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">Secondary Phone</label>
									<input
										type="tel"
										value={secondaryPhoneNumber}
										onChange={(e) => setSecondaryPhoneNumber(e.target.value)}
										placeholder="071 987 6543 (Optional)"
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
									/>
								</div>
							</div>

							<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-2 pt-2">
								2. Delivery Address
							</h3>

							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">Address Line 1 *</label>
								<input
									type="text"
									value={addressLine1}
									onChange={(e) => setAddressLine1(e.target.value)}
									placeholder="House No, Street Name"
									className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
									required
								/>
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">Address Line 2</label>
								<input
									type="text"
									value={addressLine2}
									onChange={(e) => setAddressLine2(e.target.value)}
									placeholder="Apartment, suite, unit (Optional)"
									className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">City *</label>
									<input
										type="text"
										value={city}
										onChange={(e) => setCity(e.target.value)}
										placeholder="Colombo / Kandy / etc."
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
										required
									/>
								</div>

								<div>
									<label className="block text-xs font-bold text-gray-700 mb-1">Postal Code</label>
									<input
										type="text"
										value={postalCode}
										onChange={(e) => setPostalCode(e.target.value)}
										placeholder="10100"
										className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
									/>
								</div>
							</div>

							<div>
								<label className="block text-xs font-bold text-gray-700 mb-1">Special Delivery Notes</label>
								<textarea
									rows="2"
									value={specialNotes}
									onChange={(e) => setSpecialNotes(e.target.value)}
									placeholder="Any specific delivery instructions..."
									className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
								></textarea>
							</div>
						</div>
					</div>

					{/* Modal Footer Actions */}
					<div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
						<div className="flex items-center gap-2 text-xs text-gray-500">
							<FaShieldAlt className="text-green-600" /> Safe & Secure Order Processing
						</div>

						<div className="flex items-center gap-3 w-full sm:w-auto">
							<button
								onClick={() => setModalIsOpen(false)}
								className="flex-1 sm:flex-initial px-5 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm hover:bg-gray-300 transition-colors cursor-pointer"
							>
								Cancel
							</button>

							<button
								onClick={handleConfirmOrder}
								className="flex-1 sm:flex-initial px-6 py-2.5 bg-accent text-white font-bold rounded-xl text-sm hover:bg-accent/90 shadow-md transition-colors cursor-pointer"
							>
								Confirm & Place Order
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
}