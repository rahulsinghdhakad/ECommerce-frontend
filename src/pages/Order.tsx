import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { useMyOrderQuery } from "../redux/api/orderApi";
import { RootState } from "../redux/store";
import { CustomError } from "../types/api-types";
import Loader from "../components/Loader";

interface DataType {
    _id: string;
    quantity: number;
    discount: number;
    amount: number;
    status: ReactElement;
    action: ReactElement;
}

const columns: Column<DataType>[] = [
    {
        Header: "Id",
        accessor: "_id",
    },
    {
        Header: "Quantity",
        accessor: "quantity",
    },
    {
        Header: "Discount",
        accessor: "discount",
    },
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Action",
        accessor: "action"
    }
];

const Order = () => {
    const { user } = useSelector((store: RootState) => store.userReducer);
    const { data, isLoading, isError, error } = useMyOrderQuery(user?._id!)

    if (isError) {
        toast.error((error as CustomError).data.message)
    }

    const [rows, setRows] = useState<DataType[]>([])

    useEffect(() => {
        if (data) {
            setRows(data.orders.map(i => ({
                _id: i._id,
                amount: i.total,
                discount: i.discount,
                quantity: i.orderItems.length,
                status: <span className={
                    i.status === "Processing"
                        ? "red"
                        : i.status === "Shipped"
                            ? "purple"
                            : "green"
                }>{i.status}</span>,
                action: <Link to={`/order/${i._id}`}>Details</Link>,
            })))
        }
    }, [data])

    const table = TableHOC<DataType>(
        columns,
        rows,
        "dashboard-product-box",
        "Orders",
        rows.length>6,
    )();

    return (
        <div className="container">
            <h1>My Orders</h1>
            {
                isLoading
                    ? <Loader/>
                    : table
            }
        </div>
    )
}

export default Order