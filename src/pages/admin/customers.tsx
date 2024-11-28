import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useAllUsersQuery, useDeleteUserMutation } from "../../redux/api/userApi";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { resToast } from "../../utils/feature";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((store: RootState) => store.userReducer)

  const { data, isError, error } = useAllUsersQuery(user?._id!)

  if (isError) {
    toast.error((error as CustomError).data.message)
  }

  const [deleteUser]=useDeleteUserMutation();

  const deleteHandler=async(id:string)=>{
    const res= await deleteUser({userID:id, adminUserID:user?._id!})
    resToast(res,null,"");
  }

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      setRows(data.users.map(i => ({
        avatar: (
          <img
            style={{
              borderRadius: "50%",
              backgroundSize:"cover",
            }}
            src={i.photo}
            alt="photo"
          />
        ),
        name: i.name,
        email: i.email,
        gender: i.gender,
        role: i.role,
        action: (
          <button onClick={()=>deleteHandler(i._id)}>
            <FaTrash />
          </button>
        ),
      })))
    }
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
