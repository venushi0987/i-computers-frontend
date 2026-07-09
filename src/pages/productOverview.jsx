import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import ImageSlideShow from "../components/imageSlideShow";

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

                    <div className="w-1/2 h-full ">

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