import { ReactElement } from "react"
import { Navigate, Outlet, redirect } from "react-router-dom"

interface Props {
  isAuthenticated: boolean,
  children?: ReactElement,
  redirect?: string,
  AdminOnly?:boolean,
  admin?:boolean,
}

const ProtectedRoute = ({
  isAuthenticated,
  children,
  AdminOnly,
  admin,
  redirect = "/"
}: Props) => {

  if (!isAuthenticated) return <Navigate to={redirect} />;

  if(AdminOnly && !admin) return <Navigate to={redirect} />;

  return children ? children : <Outlet />
}

export default ProtectedRoute