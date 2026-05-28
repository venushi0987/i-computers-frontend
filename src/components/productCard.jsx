export default function ProductCard(props){ // ProductCard first letter should be capitalized to be used as a component in React

    return(
        // if you want to add manual values you need to add [] around it.
        <div className="bg-blue-300 w-60 h-65"> 
            <img src={props.image}/>
            <h1>{props.name}</h1>
            <p>Price: {props.price}</p>
        </div>
    )
}