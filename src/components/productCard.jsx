import getFormattedPrice from "../lib/price-format";
import { Link } from "react-router-dom";

export default function ProductCard(props){ // ProductCard first letter should be capitalized to be used as a component in React

    const product = props.product; // This is the product object that is passed as a prop to the ProductCard component. It contains the product's name, price, and image.

    return(
        // if you want to add manual values you need to add [] around it.
        <Link to={"/overview/"+product.productId}state={product} className="bg-white w-[390px] h-[500px] m-6 shadow-2xl rounded-xl flex flex-col overflow-hidden hover:[&_.primary-image]:opacity-0"> 
          
          <div className="w-full h-[350px] relative">
            <img src={product.images[0]} className="w-full h-full absolute"/>
            <img src={product.images[1]} className="w-full h-full absolute bg-white primary-image transition-opacity duration-700 "/>

          </div>

          <span className="text-sm font-thin text-gray-400 px-2 mt-2">{product.productId}</span>
          <h1 className="text-lg font-semibold mt-1 px-2">{product.name}</h1>
          {
            product.labelledPrice > product.price && <span className="text-sm text-gray-500 line-through mt-1 px-2">{getFormattedPrice(product.labelledPrice)}</span>
          }

            <span className="text-lg font-bold mt-1 px-2">{getFormattedPrice(product.price)}</span>
        </Link>
    
    )
}