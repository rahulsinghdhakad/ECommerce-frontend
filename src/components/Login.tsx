import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            console.log(user);

            const res = await login({
                name: user.displayName!,
                _id: user.uid!,
                email: user.email!,
                photo: user.photoURL!,
                role: "user",
                gender,
                dob: date,
            })

            if("data" in res){
                toast.success(res.data?.message!)
            }else{
                const error=res.error as FetchBaseQueryError;
                const data=error.data as MessageResponse;

                toast.error(data.message)
            }

        } catch (error) {
            toast.error("sign in failed")
        }
    };

    return (
        <div className="login">
            <main>
                <h1>login</h1>
                <div>
                    <label>Gender</label>
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                    >
                        <option value="">select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Date Of Birth</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                <div>
                    <p>already signed in</p>
                    <button onClick={loginHandler}>
                        <FcGoogle />
                        <span>sign in with google</span>
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login