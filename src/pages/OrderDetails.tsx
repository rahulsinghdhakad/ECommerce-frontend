import { Navigate, useParams } from "react-router-dom";
import { useOrderDetailQuery } from "../redux/api/orderApi";
import { Order } from "../types/types";
import { ProductCard } from "./admin/management/transactionmanagement";

const orderItems: any[] = [];

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: 0,
  },
  _id: "",
  user: {
    _id: "",
    name: "",
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems,
};

const OrderDetails = () => {
  const param = useParams();
  const orderID = param.id

  const { data, isError, isLoading, error } = useOrderDetailQuery(orderID!)

  if (isError) return <Navigate to={'/404'} />

  const {
    shippingInfo: {
      address,
      city,
      state,
      country,
      pinCode,
    },
    _id,
    user: {
      name,
    },
    status,
    subTotal,
    discount,
    shippingCharges,
    tax,
    total,
    orderItems,
  } = data?.order || defaultData;

  return (
    <div >
      <main className="product-management" style={{backgroundColor: "#8080803b"}}>
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>

          {orderItems.map((i) => (
            <ProductCard
              key={i._id}
              _id={i._id}
              name={i.name}
              photo={i.photo}
              productID={i._id}
              quantity={i.quantity}
              price={i.price}
            />
          ))}
        </section>

        <article className="shipping-info-card">
          <h1>Order Info</h1>
          <h5>User Info</h5>
          <p>Name: {name}</p>
          <p>
            Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
          </p>
          <h5>Amount Info</h5>
          <p>Subtotal: {subTotal}</p>
          <p>Shipping Charges: {shippingCharges}</p>
          <p>Tax: {tax}</p>
          <p>Discount: {discount}</p>
          <p>Total: {total}</p>

          <h5>Status Info</h5>
          <p>
            Status:{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                    ? "green"
                    : "red"
              }
            >
              {status}
            </span>
          </p>
        </article>
      </main>
    </div>
  )
}

export default OrderDetails