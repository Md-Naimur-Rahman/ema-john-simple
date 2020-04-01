import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import happyImage from '../../images/giphy.gif';

const Review = () => {

    const [cart,setCart] = useState([]);
    const [orderPlaced,setOrderPlaced] = useState(false);


        const handlePlaceorder = () =>{
            setCart([]);
            setOrderPlaced(true);
                processOrder();
        }




    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd=> pd.key !==productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }



    useEffect (  () =>{

        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProduct = productKeys.map(key => {
                const product = fakeData.find(pd => pd.key=== key);
                product.quantity = savedCart[key];
                return product;
        });

        setCart(cartProduct);

    } ,[]   );



    let thankyou ;
   if(orderPlaced){
   thankyou=<img src={happyImage} />
}
    return (
        <div className="shop-container" >
            <div className="product-container">
            {
                    cart.map(pd=>  <ReviewItem key={pd.key}
                        removeProduct = {removeProduct}
                        product={pd}

                    
                    
                    > </ReviewItem> )    

            }
            {
                thankyou
            }

            </div>

            <div className="cart-container">
                <Cart  cart={cart}>
                <button onClick={handlePlaceorder} className="cartRvwbutton">Place Order</button>
                </Cart>

            </div>
        
        </div>
    );
};

export default Review;