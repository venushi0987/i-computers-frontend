import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";
import { BiCategory } from "react-icons/bi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { FaAngleRight } from "react-icons/fa";
import getFormattedPrice from "../lib/price-format";
import { addToCart} from "../lib/cart";
import { Link } from "react-router-dom";


export default function ProductOverview() {

    const params = useParams(); 
    const location = useLocation(); 
    const [product, setProduct] = useState(location.state);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            api.get("/products/" + params.productId)
                .then((res) => {
                    setProduct(res.data);
                    setLoading(false);
                }
                )
                .catch((err) => {
                    toast.error("Failed to load product");
                    setProduct(null);
                    setLoading(false);
                });
        }
    }
);

    return (
        <div className="w-full h-[calc(100vh-100px)] min-h-[calc(100vh-100px)]">
            {
                loading&&<LoadingAnimation />
            }

            {
                product!=null&&
                <div className="w-full h-full min-h-full flex ">
                    <div className="w-1/2 h-full flex justify-center items-center">
                        <ImageSlideShow images={product.images} />
                    </div>

                    <div className="w-1/2 h-full p-8 flex flex-col">
                        <h1 className="text-3xl font-semibold">{product.name}
                            {product.altNames.map(
                                (names, index)=>{
                                    return(
                                        <span key={index} className="font-normal text-gray-500"> | {names}</span>
                                    )
                                }
                            )}
                        </h1>
                        <p className="text-lg text-gray-600 italic">{product.productId}</p>
                        <p className="text-xl mt-4 flex items-center font-thin"><BiCategory /> <span className="mx-2 font-normal"> Category </span> <FaAngleRight /> {product.category}</p>
                        <p className="text-xl mt-4 flex items-center font-thin mb-4"><HiOutlineBadgeCheck /> <span className="mx-2 font-normal">{product.brand}</span><FaAngleRight />{product.model}</p>
                        {
                            product.labelledPrice > product.price && 
                            <span className="text-lg text-gray-500 line-through font-normal">{getFormattedPrice(product.labelledPrice)}</span>
                        }
                        <p className="text-3xl font-semibold text-accent">{getFormattedPrice(product.price)}</p>
                        <p className="text-lg mt-4 font-semibold text-secondary">{product.description}</p>

                        <div className="flex">
                            <button className="bg-accent text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-colors duration-300 cursor-pointer w-[170px] h-[50px]"
                            onClick={
                                ()=>{
                                    addToCart(product, 1);
                                    toast.success("Product added to cart");
                                }
                            }>Add to Cart</button>

                            <Link to="/checkout" 
                            state={
                                [
                                    {
                                       product:{
                                            productId: product.productId,
                                            name: product.name,
                                            price: product.price,
                                            labelledPrice: product.labelledPrice,
                                            image: product.images[0],
                                       },
                                       quantity: 1
                                    }

                                ]
                                
                            }
                            className="bg-gray-300 text-gray-800 px-4 py-2 font-semibold rounded-lg mt-4 ml-4 flex justify-center items-center hover:bg-gray-400 transition-colors duration-300 cursor-pointer w-[170px] h-[50px]"
                            
                            >Buy Now</Link>

                        </div>



                    </div>
                    
                </div>
            }

            {
                product==null&&!loading&&
                <div className="w-full h-[calc(100vh-100px)] flex justify-center items-center">
                    <h1 className="text-4xl font-bold">Product not found</h1>
                </div>
            }

        </div>
    )
}