import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardItems from "../components/CardItems";
import { applyDiscount, calculatePrice } from "../redux/reducers/cartReducer";
import { RootState, server } from "../redux/store";

const Cart = () => {
  const {
    cartItems,
    shippingCharges,
    total,
    tax,
    discount,
    subtotal,
  }=useSelector((state:RootState)=>(
    state.cartReducer
  ))

  const [coupenCode,setCoupenCode]=useState<string>("");
  const [isValidCoupen, setIsValidCoupen]=useState<boolean>(false)

  useEffect(() => {
    const {token,cancel}=axios.CancelToken.source()

    const id= setTimeout(() => {
      
      axios.get(`${server}/api/vi/payment/discount?coupon=${coupenCode}`,{
        cancelToken:token,
      })
      .then((res)=>{
        dispatch(applyDiscount(res.data.discount));
        setIsValidCoupen(true);
        dispatch(calculatePrice());
      })
      .catch((error)=>{
        console.log(error)
        dispatch(applyDiscount(0));
        setIsValidCoupen(false);
        dispatch(calculatePrice());
      });

    }, 1000);
  
    return () => {
      cancel();
      clearTimeout(id);
    }
  }, [coupenCode])

  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])
  

  return (
    <div className="cart">
      <main style={{boxShadow:"5px 0 5px rgba(0,0,0,0.1)"}}>
        {
          cartItems.length===0?
          <h1 style={{margin:"0 auto", fontWeight:"400"}}>NO ITEMS ADDED</h1>:
          cartItems.map(i => <CardItems key={i.name} cartItem={i} />)
        }
      </main>
      <aside>
        <div>
          <p>Subtoal: ${subtotal}</p>
          <p>Shipping Charges: ${shippingCharges}</p>
          <p>tax: ${tax}</p>
          <p>Discount: ${discount}</p>
          <strong>total: ${total}</strong>

          <input 
          type="text"
           placeholder="coupen code" 
           value={coupenCode}
           onChange={(e)=>setCoupenCode(e.target.value)}
           />

           {
            coupenCode && (
              isValidCoupen?
              <span className="green">{discount} is get from <code>{coupenCode}</code></span>:
              <span className="red">invalid coupen</span>
            )
           }
           {
            cartItems.length>0 && <Link to={"/shipping"} className="check-out-btn">checkout</Link>
           }
        </div>
      </aside>
    </div>
  )
}

export default Cart