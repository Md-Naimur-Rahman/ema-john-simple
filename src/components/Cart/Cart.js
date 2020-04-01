import React from 'react';
import './Cart.css'
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
   // const totalPrice = cart.reduce((total,prd) => total +prd.price,0);
   let totalPrice= 0;
   for (let i=0;i<cart.length;i++){
       const product = cart[i];
       totalPrice = totalPrice + product.price * product.quantity;
      
   }

   let shipping = 0;
   if(totalPrice>35){
       shipping=0;
   }
   else if (totalPrice>15){
       shipping = 4.99;
   }
   else if (totalPrice>0){
    shipping = 12.99;
}
    const tax = Math.round(totalPrice /10);
 
    return (
        <div  className="CartItem">
            <h4> Order Summary</h4>
            <p>Items Ordered : {cart.length}  </p>
            <p>Product Price : {totalPrice}</p>
            <p><small>Shipping Cost : {shipping}</small>     </p>
            <p><small>Tax + VAT: {tax}</small></p>
             <p>Total Price: {totalPrice + shipping + tax}</p> <br/>
             
                {
                    props.children
                }


             
        </div>  
    );
};

export default Cart;