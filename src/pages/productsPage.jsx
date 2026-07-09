import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import LoadingAnimation from "../components/loadingAnimation";
import ProductCard from "../components/productCard";

export default function ProductsPage(){

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(
        () => {

            if (loading){
                api.get("/products")
                .then((res) => {
                    setProducts(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("Failed to load products");
                    setLoading(false);
                });
            }

        }, 
        
        [loading]);

    return(
        
        <div className="w-full flex flex-wrap p-8 justify-center">
           {
            loading?<LoadingAnimation />
            :<>
                {
                    products.map(
                        (product) => {
                            return(
                                <ProductCard product={product} key={product.productId}/>
                            )
                        }
                    )
                }
            </>

            
           }
        </div>
    )
}