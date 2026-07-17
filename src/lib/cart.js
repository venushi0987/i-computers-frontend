const sampleCart = [
    {
        product : {
            productId: "123456",
            name: "Sample Product 1",
            image: "https://via.placeholder.com/150",
            price: 100,
            labelledPrice: 120,
        },
        quantity: 1
    },
    {
        product : {
            productId: "789012",
            name: "Sample Product 2",
            image: "https://via.placeholder.com/150",
            price: 200,
            labelledPrice: 250,            
        },
        quantity: 2
    }
]

// get cart from local storage
export function getCart() {
    const cartInString = localStorage.getItem("cart");

    // if cartInString is null, return an empty array and set the cart in local storage to an empty array
    if(cartInString == null){
        localStorage.setItem("cart", "[]");
        return [];
    }else{
        const cart = JSON.parse(cartInString); // convert the string to an array of objects
        return cart;
    }
}

export function addToCart(product, quantity) {
    const cart = getCart();
    
    // check if product is already in cart
    const productIndex = cart.findIndex(
        (item) => {
            return item.product.productId == product.productId
        }
    );

    if(productIndex == -1){

        if(quantity < 1){
            return;
        }
        cart.push(
            {
                product : {
                    productId: product.productId,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    labelledPrice: product.labelledPrice,
                },
                quantity: quantity
            }
        )

        const newCartInString = JSON.stringify(cart);
       
    }else{
        cart[productIndex].quantity += quantity;

        if(cart[productIndex].quantity < 1){
            cart.splice(productIndex, 1);
        }
    }

    const cartInString = JSON.stringify(cart);
    localStorage.setItem("cart", cartInString);

}

export function getCartTotal(cart) {
   
    let total = 0;
    
    for(let i=0; i<cart.length; i++){
        total += cart[i].product.price * cart[i].quantity;
    }
    return total;
}