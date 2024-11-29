import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, deleteCartItem } from "../redux/reducers/cartReducer";
import { CartItem } from "../types/types";


const CardItems = ({ cartItem }: { cartItem: CartItem }) => {

    const { name, price, photo, quantity, stock, productID } = cartItem;
    const dispatch = useDispatch();

    const incrementHandler = () => {
        if(cartItem.quantity>=stock) return ;
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
    };

    const decrementHandler = () => {
        if(cartItem.quantity===1) return;
        dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
    };

    const deleteHandler= ()=> {
        dispatch(deleteCartItem(productID))
    }

    return (
        <div className="cart-box">
            <img src={photo} alt="" />
            <div>
                <Link to={`/product/${name}`}>{name}</Link>
                <strong>${price}</strong>
            </div>

            <button onClick={decrementHandler}>-</button>
            {quantity}
            <button onClick={incrementHandler}>+</button>

            <FaTrash onClick={deleteHandler} cursor={"pointer"}/>
        </div>
    )
}

export default CardItems