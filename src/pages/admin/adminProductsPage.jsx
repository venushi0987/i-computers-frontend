import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../lib/api";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import LoadingAnimation from "../../components/LoadingAnimation";
import toast from "react-hot-toast";
import DeleteProductModel from "../../components/deleteProductModel";
import EditProductsForm from "./adminEditProductForm";


export default function AdminProductsPage(){

    const [products, setProducts] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

        useEffect(()=>{
            api.get("/products").then((res)=>{
                if(isLoading){
                    console.log(res.data)
                    setProducts(res.data)
                    setIsLoading(false)
                }
            })
        },
        [isLoading]
    );

    //---------------------------------------alert--------------------------------------------------------------------

    // async function handleDelete(productId){
    //     const token = localStorage.getItem("token");
    //     const confirm = window.confirm("Are you sure you want to delete this product?");
    //     if(!confirm){
    //         return;
    //     }

    //     try{
    //         const res = await api.delete(`/products/${productId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         toast.success("Product deleted successfully");
    //         setIsLoading(true);

    //     }catch(err){
    //         toast.error("Failed to delete product");
    //     }
    // }

    //-----------------------------------toast---------------------------------------------------------------------

    // function handleDelete(productId){
    //     toast(
    //         (t) => {
    //             return <div className="flex flex-col justify-center items-center gap-4">
    //                 <h1 className="text-lg font-semibold text-secondary">Are you sure you want to delete this product with ID {productId}?</h1>
    //                 <div className="flex gap-4 justify-end w-full">

    //                     <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 "
    //                         onClick = { async () => {
    //                                 const token = localStorage.getItem("token");
    //                                 try{
    //                                     const res = await api.delete(`/products/${productId}`, {
    //                                         headers: {
    //                                             Authorization: `Bearer ${token}`
    //                                         }
    //                                     });
    //                                     toast.dismiss();
    //                                     toast.success("Product deleted successfully");
    //                                     setIsLoading(true);
    //                                 }catch(err){
    //                                     toast.dismiss();
    //                                     toast.error("Failed to delete product");
    //                                 }
                                   
    //                             }
    //                         }
                            
    //                         >
    //                         Yes
    //                     </button>
    //                     <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
    //                         onClick = { () => {
    //                             toast.dismiss();
    //                         }
    //                         }
    //                         >
    //                         No
    //                     </button>
    //                 </div>
    //             </div>
    //             },
    //         {
    //             position: "top-center",
    //             // duration: infinity,
    //         }
    //     )
    // }


    //-----------------------------------pop up menu-------------------------------------------------------------





//Make the backend call to get products
//update the products variable's value with response from backend


    return(
        <div className="w-full max-h-full flex flex-wrap p-4 items-start overflow-y-scroll ">

            {
                // products.map((item, index)=>{
                //     return(
                //         <div key={index} className="w-full h-[100px] flex flex-row border-b-2 border-gray-300 p-2">
                            
                //         </div>
                //     )
                // })  
            }

            <div className="w-full h-[100px] bg-white shadow-md rounded-md flex items-center p-4 justify-between mb-6">
                {
                    isLoading && <LoadingAnimation />
                }
                <h1 className="text-2xl font-semibold text-secondary">Add Product</h1>

                <div className="flex gap-4 justify-center items-center">
                    <span>{products.length} products</span>

                    <button 
                    onClick={
                        ()=>{
                            //window.location.reload();
                            //rerun the function inside useEffect to get the products again
                            setIsLoading(!isLoading)

                        }
                    }
                    
                    className="bg-accent text-white px-4 py-2 rounded-md">
                        Refresh
                    </button>

                </div>  
            </div>

            <table className="w-full bg-white shadow-md rounded-md overflow-hidden text-center">
                <thead className="bg-accent text-white h-[60px]">
                    <tr>
                        <th>Image</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Labelled Price</th>
                        <th>Stock</th>
                        <th>Availability</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>
                    {
                        products.map((item)=>{
                            return(
                                <tr key={item.productId} className="odd:bg-gray-200 even:bg-white">
                                    <td><img src={item.images[0]} className="w-[50px] h-[50px] object-cover"/></td>
                                    <td>{item.productId}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.labelledPrice}</td>
                                    <td>{item.stock}</td>
                                    <td>{item.isAvailable ? "Available" : "Not Available"}</td>
                                    <td>{item.category}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.model}</td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            {/* <Link to={`/admin/edit-product/${item.productId}`} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                                                Edit
                                            </Link>
                                            <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
                                                Delete
                                            </button> */}

                                            <Link 
                                            state={item}
                                            to={`/admin/edit-product`}>
                                                <CiEdit className="text-3xl text-black hover:text-accent cursor-pointer"/>
                                            </Link>
                                            {/* <CiTrash className="hover:text-red-600 cursor-pointer"
                                            onClick={
                                                () => handleDelete(item.productId)}
                                            /> */}

                                            <DeleteProductModel product={item} refresh={() => {setIsLoading(true)}}/>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/add-product" className="w-[80px] h-[80px] bg-accent text-white rounded-full text-2xl flex justify-center items-center fixed right-[35px] bottom-[35px]"><FaPlus/></Link>

        </div>
    )
}