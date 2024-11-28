import { useState } from "react"
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { User } from "../types/types"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import toast from "react-hot-toast"

type PropType = {
    user: User | null,
}

const Header = ({ user }: PropType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logOutHandler = async () => {
        try {
            await signOut(auth);

            toast.success("sign out successfully")
            setIsOpen(false);
        } catch (error) {
           toast.error("sign out fail") 
        }
    }

    return (
        <nav className="header">
            <Link to={"/"}>Home</Link>
            <Link to={"/search"}>
                <FaSearch />
            </Link>
            <Link to={"/cart"}>
                <FaCartShopping />
            </Link>
            {
                user?._id ?
                    <>
                        <button onClick={() => setIsOpen(prev => !prev)} className="userbutton">
                            <FaUser />
                        </button>
                        <dialog open={isOpen}>
                            <div>
                                {
                                    user.role === "admin" && (
                                        <Link to={"admin/dashboard"}>Admin</Link>
                                    )
                                }
                                <Link to={"/order"}>Orders</Link>
                                <button onClick={logOutHandler}>
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </dialog>
                    </>
                    :
                    <Link to={"/login"}>
                        <FaSignInAlt />
                    </Link>
            }
        </nav>
    )
}

export default Header