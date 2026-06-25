import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../lib/api";
import { CiTrash } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";




export default function AdminProductsPage(){

    const [products, setProducts] = useState([]);

        useEffect(()=>{
            api.get("/products").then((res)=>{
                console.log(res.data)
                setProducts(res.data)
            })
        },[]);

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
                <h1 className="text-2xl font-semibold text-secondary">Add Product</h1>
                <div className="flex gap-2">
                    {products.length} products
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
                                            <CiEdit />
                                            <CiTrash />
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