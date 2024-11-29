import { FaPlus } from "react-icons/fa"
import { CartItem } from "../types/types"

type PropType = {
  name: string,
  id: string,
  price: number,
  stock: number,
  photo: string,
  handler: (cartItem: CartItem) => void,
}

const ProductCart = ({ name, id, price, stock, photo, handler }: PropType) => {
  const cartItem: CartItem = {
    name,
    price,
    photo,
    quantity:1,
    productID:id,
    stock,
  }
  return (
    <div className="product-card">
      <img src={photo} alt="photo" />
      <p>{name}</p>
      <strong>${price}</strong>
      <div>
        <button onClick={() => handler(cartItem)}>
          <FaPlus />
        </button>
      </div>
    </div>
  )
}

export default ProductCart