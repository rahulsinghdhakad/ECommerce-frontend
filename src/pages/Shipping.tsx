import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shippingInfoSet } from "../redux/reducers/cartReducer";
import { RootState, server } from "../redux/store";


const Shipping = () => {
    const {
        cartItems,
        total,
    } = useSelector((state: RootState) => (
        state.cartReducer
    ))

    const [shippingInfo, setShippingInfo] = useState({
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: 0,
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (cartItems.length === 0) navigate('/cart')
    }, [])

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const dispatch = useDispatch();

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(shippingInfoSet(shippingInfo));

        try {
            const res = await axios.post(`${server}/api/vi/payment/create`,
                {
                    amount: total
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
            navigate('/pay', {
                state: res.data.clientSecret,
            })
        } catch (error) {
            toast.error("something went wrong");
            console.log(error);
        }
    }

    return (
        <div className="shipping">
            <button onClick={() => navigate("/cart")}>
                <BiArrowBack />
            </button>
            <form onSubmit={submitHandler}>
                <h1>Shipping Address</h1>
                <input
                    required
                    type="text"
                    placeholder="Address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={changeHandler}
                />
                <input
                    required
                    type="text"
                    placeholder="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={changeHandler}
                />
                <input
                    required
                    type="text"
                    placeholder="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={changeHandler}
                />
                <select
                    required
                    name="country"
                    value={shippingInfo.country}
                    onChange={changeHandler}
                >
                    <option value="">choose country</option>
                    <option value="india">India</option>
                </select>
                <input
                    required
                    type="number"
                    placeholder="pinCode"
                    name="pinCode"
                    value={shippingInfo.pinCode}
                    onChange={changeHandler}
                />
                <button type="submit">Pay Now</button>
            </form>
        </div>
    )
}

export default Shipping