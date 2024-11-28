import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetState } from "../redux/reducers/cartReducer";
import { RootState } from "../redux/store";
import { resToast } from "../utils/feature";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState<boolean>(false)

    const {
        shippingInfo,
        subtotal,
        shippingCharges,
        tax,
        total,
        discount,
        cartItems: orderItems,
    } = useSelector((state: RootState) => (
        state.cartReducer
    ))

    const { user } = useSelector((store:RootState) => store.userReducer);

    const order = {
        shippingInfo,
        user: user?._id!,
        subTotal: subtotal,
        shippingCharges,
        tax,
        total,
        discount,
        orderItems,
    }

    const [newOrder] = useNewOrderMutation();
    const dispatch = useDispatch();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin
            },
            redirect: "if_required"
        })

        if (error) {
            setProcessing(false);
            return toast.error(error.message || "something went wrong");
        }
        if (paymentIntent.status === "succeeded") {
            const res = await newOrder(order);
            dispatch(resetState())
            resToast(res,navigate,'/order');
        }
        setProcessing(false);
    };

    return (
        <div className="checkout-cont">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button>{processing ? "Processing" : "Submit"}</button>
            </form>
        </div>
    )
}

const Checkout = () => {
    const location = useLocation();
    const clientSecret = location.state;

    const options = {
        clientSecret,
    };

    return <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
    </Elements>
}

export default Checkout