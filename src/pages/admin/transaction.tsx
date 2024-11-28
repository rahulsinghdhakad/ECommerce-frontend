import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllOrderQuery } from "../../redux/api/orderApi";
import { CustomError } from "../../types/api-types";
import { UserReducerInitialState } from "../../types/reducer-types";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector((store: { userReducer: UserReducerInitialState }) => store.userReducer);
  const { data, isLoading, isError, error } = useAllOrderQuery(user?._id!)

  if (isError) {
    toast.error((error as CustomError).data.message)
  }

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {

      console.log(data)
      setRows(data.orders.map(i => ({
        user: i.user.name,
        amount: i.total,
        discount: i.discount,
        quantity: i.orderItems.length,
        status:  <span className= {
          i.status==="Processing"
          ?"red"
          : i.status==="Shipped"
            ?"purple"
            :"green"
        }>{i.status}</span> ,
        action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
      })))
    }
  }, [data])

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{
        isLoading
        ?<>Loader</>
        :Table}</main>
    </div>
  );
};

export default Transaction;
