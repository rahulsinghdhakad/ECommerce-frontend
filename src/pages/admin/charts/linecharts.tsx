import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { useLineQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { getLastMonts } from "../../../utils/feature";
import Loader from "../../../components/Loader";


const Linecharts = () => {
  const {last12Month:months}=getLastMonts();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError } = useLineQuery(user?._id!);

  if (isError) return <Navigate to={"/admin/dashboard"}/>

  const charts = data?.charts!;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading
            ? <Loader/>
            : (<>
              <h1>Line Charts</h1>
              <section>
                <LineChart
                  data={charts.user}
                  label="Users"
                  borderColor="rgb(53, 162, 255)"
                  labels={months}
                  backgroundColor="rgba(53, 162, 255, 0.5)"
                />
                <h2>Active Users</h2>
              </section>

              <section>
                <LineChart
                  data={charts.product}
                  backgroundColor={"hsla(269,80%,40%,0.4)"}
                  borderColor={"hsl(269,80%,40%)"}
                  labels={months}
                  label="Products"
                />
                <h2>Total Products (SKU)</h2>
              </section>

              <section>
                <LineChart
                  data={charts.revenue}
                  backgroundColor={"hsla(129,80%,40%,0.4)"}
                  borderColor={"hsl(129,80%,40%)"}
                  label="Revenue"
                  labels={months}
                />
                <h2>Total Revenue </h2>
              </section>

              <section>
                <LineChart
                  data={charts.discount}
                  backgroundColor={"hsla(29,80%,40%,0.4)"}
                  borderColor={"hsl(29,80%,40%)"}
                  label="Discount"
                  labels={months}
                />
                <h2>Discount Allotted </h2>
              </section>
            </>)
        }
      </main>
    </div>
  );
};

export default Linecharts;
