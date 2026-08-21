import { useState, useEffect, useContext } from "react";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import UserContext from "../context/userContext";

export default function ReviewSection({ productId = "general" }) {
	const userData = useContext(UserContext);
	const user = userData?.user;

	const storageKey = `reviews_${productId}`;

	const [reviews, setReviews] = useState(() => {
		try {
			const saved = localStorage.getItem(storageKey);
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	const [reviewerName, setReviewerName] = useState("");
	const [rating, setRating] = useState(5);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (user) {
			const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
			if (fullName) {
				setReviewerName(fullName);
			}
		}
	}, [user]);

	useEffect(() => {
		try {
			localStorage.setItem(storageKey, JSON.stringify(reviews));
		} catch (err) {
			console.error("Failed to save reviews", err);
		}
	}, [reviews, storageKey]);

	function handleSubmit(e) {
		e.preventDefault();

		if (!reviewerName.trim()) {
			toast.error("Please enter your name");
			return;
		}

		if (rating < 1 || rating > 5) {
			toast.error("Please select a star rating (1 to 5)");
			return;
		}

		if (!comment.trim()) {
			toast.error("Please write your review comment");
			return;
		}

		const newReview = {
			id: Date.now(),
			name: reviewerName.trim(),
			rating: Number(rating),
			comment: comment.trim(),
			date: new Date().toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			}),
		};

		setReviews([newReview, ...reviews]);
		setComment("");
		if (!user) {
			setReviewerName("");
		}
		toast.success("Thank you! Your review has been added.");
	}

	const totalReviews = reviews.length;
	const averageRating =
		totalReviews > 0
			? (
					reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) /
					totalReviews
			  ).toFixed(1)
			: "0.0";

	// Calculate Rating Breakdown Counts (5 stars to 1 star)
	const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
	reviews.forEach((r) => {
		const star = Math.min(5, Math.max(1, Math.round(Number(r.rating || 5))));
		ratingCounts[star] = (ratingCounts[star] || 0) + 1;
	});

	return (
		<div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
			<h2 className="text-2xl font-bold text-secondary mb-6 border-b pb-3 flex items-center justify-between">
				<span>Customer Reviews & Ratings</span>
			</h2>

			{/* Rating Overview & Breakdown Header */}
			<div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-6 items-center">
				{/* Average Score Summary Box */}
				<div className="flex flex-col items-center justify-center md:w-1/3 text-center border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-6 w-full">
					<span className="text-5xl font-extrabold text-secondary">{averageRating}</span>
					<div className="flex items-center gap-1 my-2">
						{[1, 2, 3, 4, 5].map((star) => (
							<span key={star}>
								{star <= Math.round(Number(averageRating)) ? (
									<FaStar className="text-yellow-400 text-xl" />
								) : (
									<FaRegStar className="text-gray-300 text-xl" />
								)}
							</span>
						))}
					</div>
					<span className="text-sm font-medium text-gray-500">
						Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
					</span>
				</div>

				{/* 5-Star Breakdown Progress Bars */}
				<div className="flex flex-col gap-2 md:w-2/3 w-full">
					<h4 className="text-sm font-semibold text-secondary mb-1">Rating Breakdown</h4>
					{[5, 4, 3, 2, 1].map((star) => {
						const count = ratingCounts[star] || 0;
						const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
						return (
							<div key={star} className="flex items-center gap-3 text-sm">
								<span className="w-12 font-medium text-secondary flex items-center gap-1">
									{star} <FaStar className="text-yellow-400 text-xs inline" />
								</span>

								<div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
									<div
										className="h-full bg-accent transition-all duration-500 rounded-full"
										style={{ width: `${percentage}%` }}
									></div>
								</div>

								<span className="w-20 text-right text-xs text-gray-600 font-semibold">
									{count} ({percentage}%)
								</span>
							</div>
						);
					})}
				</div>
			</div>

			{/* Review Form */}
			<form onSubmit={handleSubmit} className="mb-8 p-5 bg-primary/40 rounded-lg border border-gray-200">
				<h3 className="text-lg font-semibold text-accent mb-4">Write a Review</h3>

				<div className="mb-4">
					<label className="block text-sm font-medium text-secondary mb-1">Your Rating *</label>
					<div className="flex items-center gap-2">
						{[1, 2, 3, 4, 5].map((star) => {
							const isFilled = star <= (hoverRating || rating);
							return (
								<button
									type="button"
									key={star}
									onClick={() => setRating(star)}
									onMouseEnter={() => setHoverRating(star)}
									onMouseLeave={() => setHoverRating(0)}
									className="text-2xl focus:outline-none transition-transform transform hover:scale-110 cursor-pointer"
								>
									{isFilled ? (
										<FaStar className="text-yellow-400" />
									) : (
										<FaRegStar className="text-gray-400" />
									)}
								</button>
							);
						})}
						<span className="ml-2 text-sm font-semibold text-secondary">
							{hoverRating || rating} / 5 Stars
						</span>
					</div>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-secondary mb-1">Your Name *</label>
					<input
						type="text"
						value={reviewerName}
						onChange={(e) => setReviewerName(e.target.value)}
						placeholder="Enter your full name"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-accent text-secondary bg-white"
						required
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium text-secondary mb-1">Your Review *</label>
					<textarea
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Share details of your experience with this product..."
						rows="3"
						className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-accent text-secondary bg-white"
						required
					></textarea>
				</div>

				<button
					type="submit"
					className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2 rounded-md transition-colors cursor-pointer shadow-sm"
				>
					Submit Review
				</button>
			</form>

			{/* Reviews List */}
			<div className="space-y-4">
				<h3 className="text-lg font-semibold text-secondary mb-2">User Reviews ({reviews.length})</h3>

				{reviews.length === 0 ? (
					<div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
						<p className="text-base font-medium">No reviews yet.</p>
						<p className="text-sm mt-1">Be the first to share your thoughts about this product!</p>
					</div>
				) : (
					reviews.map((rev) => (
						<div key={rev.id} className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col gap-2">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<FaUserCircle className="text-2xl text-accent" />
									<span className="font-semibold text-secondary">{rev.name}</span>
								</div>
								<span className="text-xs text-gray-500">{rev.date}</span>
							</div>

							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<span key={star}>
										{star <= rev.rating ? (
											<FaStar className="text-yellow-400 text-sm" />
										) : (
											<FaRegStar className="text-gray-300 text-sm" />
										)}
									</span>
								))}
								<span className="text-xs font-semibold text-secondary ml-1">({rev.rating}/5)</span>
							</div>

							<p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{rev.comment}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
}
