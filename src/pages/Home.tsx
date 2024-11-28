import { Link } from "react-router-dom"
import ProductCart from "../components/ProductCart"
import { useLatestProductQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducer";


const Home = () => {
  const { data, isLoading, isError,error } = useLatestProductQuery("");
  if (isError) {
    toast.error("cannot load product");
    console.log(error);
  };

  const dispatch=useDispatch();

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1) return ;
    dispatch(addToCart(cartItem));
    toast.success("item added to cart")
  };
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Product
        <Link to={"/search"} >
          MORE
        </Link>
      </h1>
      <main>
        {
          isLoading?
          (<Loader/>):
          (data?.products.map(i =>
            <ProductCart
              key={i._id}
              name={i.name}
              id={i._id}
              price={i.price}
              stock={i.stock}
              photo={i.photo}
              handler={addToCartHandler}
            />)
          )
        }
      </main>
    </div>
  )
}

export default Home