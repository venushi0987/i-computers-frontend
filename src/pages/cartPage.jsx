import { useState } from "react";
import { getCart, getCartTotal } from "../lib/cart";
import getFormattedPrice from "../lib/price-format";
import { addToCart } from "../lib/cart";
import { Link } from "react-router-dom";

export default function CartPage() {

    const [cart, setCart] = useState(getCart());

    return (
        <div className="w-full h-[calc(100vh-100px)] overflow-y-scroll flex flex-col items-center py-4 pb-[120px]">
            {
                cart.map(
                    (item, index) => {
                        return (
                            <div key={index} className="w-[550px] min-h-[130px] bg-white my-2 rounded-md shadow-md flex flex-row overflow-hidden">
                                <img src={item.product.image} className="w-[130px] h-full object-cover p-1" />

                                <div className="w-[calc(100%-130px)] h-full p-1 ">
                                    <h1 className="font-semibold">{item.product.name}</h1>
                                    {
                                        item.product.labelledPrice > item.product.price && <span className="text-sm text-gray-500 line-through mt-1 ">{getFormattedPrice(item.product.labelledPrice)}</span>
                                    }
                                    <span className="text-lg font-bold mt-1  text-accent px-2 ">{getFormattedPrice(item.product.price)}</span>

                                    <div className="w-full h-[40px] flex justify-between items-center mt-1 pr-2">

                                        <div className=" h-[40px] border border-accent rounded-md overflow-hidden flex flex-row mt-1">
                                        <button 
                                        onClick={
                                            ()=>{
                                                addToCart(item.product, -1)
                                                setCart(getCart())
                                            }
                                        }
                                        className="w-[40px] h-full hover:bg-accent hover:text-white text-black font-bold hover:bg-accent-dark transition-colors duration-300 bg-gray-300 hover:cursor-pointer">-</button>
                                        <span className="w-[40px] h-full flex items-center justify-center">{item.quantity}</span>
                                        <button 
                                        onClick={
                                            ()=>{
                                                addToCart(item.product, 1);
                                                setCart(getCart());
                                            }
                                        }
                                        className="w-[40px] h-full hover:bg-accent hover:text-white text-black font-bold hover:bg-accent-dark transition-colors duration-300 bg-gray-300 hover:cursor-pointer">+</button>
                                    </div>
                                        <p className="text-gray-600 font-semibold mt-1 ml-4">{getFormattedPrice(item.product.price * item.quantity)}</p>

                                    </div>
                                    
                                </div>
                            </div>
                        )
                    }
                )
            }
            <div className="w-[550px] min-h-[90px] my-2 rounded-md shadow-sm flex flex-row overflow-hidden fixed bottom-2 bg-white shadow-accent items-center justify-between p-3">
            
            <Link state={cart} to="/checkout" className="bg-accent/75 hover:bg-accent transition-colors duration-300 text-white px-4 py-2 rounded-md font-semibold">
                Proceed to Checkout
            </Link>

            <span className="text-lg font-semibold text-secondary">
                {getFormattedPrice(getCartTotal(cart))}
            </span>
            
            </div>
        </div>
    )
}