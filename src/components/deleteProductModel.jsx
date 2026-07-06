import { CiTrash } from "react-icons/ci";
import { useState } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

export default function DeleteProductModel({ product, refresh }){

    const [showModal, setShowModal] = useState(false);
    return(
        <>
        <CiTrash 
        onClick={() => setShowModal(true)}
        className="text-3xl text-black hover:text-red-700 cursor-pointer"/>

        {showModal && 
            <div className="w-screen h-screen bg-black/50 flex justify-center items-center fixed top-0 left-0">
                <div className="w-[450px] h-[200px] bg-white rounded-md shadow-md flex flex-col p-6 gap-4 relative">
                    <button className=" flex flex-end text-black font-bold text-2xl absolute top-2 right-4 cursor-pointer hover:text-red-700" onClick={() => setShowModal(false)}>X</button>
                    <h1 className="text-2xl font-semibold text-secondary text-center mt-6">Are you sure you want to delete this product with ID {product.productId}?</h1>
                    
                    <div className="flex gap-4 items-center justify-center w-full">
                        <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 cursor-pointer"

                        onClick={async () => {
                            const token = localStorage.getItem("token");
                            try{
                                const res = await api.delete(`/products/${product.productId}`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                });
                                toast.success("Product deleted successfully");
                                setShowModal(false);
                                refresh();
                            }
                            catch(err){
                                toast.error("Failed to delete product");
                            }
                        }}
                       >
                        Delete
                        </button>
                        <button className="p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer"
                        onClick={
                            () => 
                                setShowModal(false)}
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </div>
        }
        </>
        
    )
}