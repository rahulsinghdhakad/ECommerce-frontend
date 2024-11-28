import { FaPlus } from "react-icons/fa"
import { server } from "../redux/store"
import { CartItem } from "../types/types"

const img = "data:image/webp;base64,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"

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
      <img src={`${server}/${photo}`} alt="photo" />
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