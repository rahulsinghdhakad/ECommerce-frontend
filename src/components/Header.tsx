import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaSearch, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { auth } from "../firebase"
import { User } from "../types/types"

type PropType = {
    user: User | null,
}

const Header = ({ user }: PropType) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(()=>{
        window.addEventListener("mousedown",(e)=>{
            if("parentElement" in e.target! ){
                const a=e.target.parentElement as HTMLElement;
                console.log(a.className)
                if(a.className==="dialog" || a.className==="userbutton") return ;
                else setIsOpen(false)
                console.log("F")
            }
        })    
    },[])

    const logOutHandler = async () => {
        try {
            await signOut(auth);

            toast.success("sign out successfully");

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
                            <div className="userbtn">
                            </div>
                            <FaUser />
                        </button>
                        <dialog open={isOpen}>
                            <div className="dialog">
                                {
                                    user.role === "admin" && (
                                        <Link to={"admin/dashboard"} onClick={()=>setIsOpen(false)}>Admin</Link>
                                    )
                                }
                                <Link to={"/order"} onClick={()=>setIsOpen(false)}>Orders</Link>
                                <button onClick={logOutHandler} className="dialog" style={{position:"relative"}}>
                                <div className="userbtn">
                                </div>
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