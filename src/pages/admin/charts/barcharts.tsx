import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";
import { getLastMonts } from "../../../utils/feature";

const Barcharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError } = useBarQuery(user?._id!);

  if (isError) return <Navigate to={"/admin/dashboard"}/>

  const chart = data?.charts!;

  const {last12Month,last6Month}=getLastMonts();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading
            ? <>Loader</>
            : (<>
              <h1>Bar Charts</h1>
              <section>
                <BarChart
                  data_2={chart.product}
                  data_1={chart.user}
                  title_1="Products"
                  title_2="Users"
                  labels={last6Month}
                  bgColor_1={`hsl(260, 50%, 30%)`}
                  bgColor_2={`hsl(360, 90%, 90%)`}
                />
                <h2>Top Products & Top Customers</h2>
              </section>

              <section>
                <BarChart
                  horizontal={true}
                  data_1={chart.order}
                  data_2={[]}
                  title_1="Orders"
                  title_2=""
                  bgColor_1={`hsl(180, 40%, 50%)`}
                  bgColor_2=""
                  labels={last12Month}
                />
                <h2>Orders throughout the year</h2>
              </section>
            </>)
        }
      </main>
    </div>
  );
};

export default Barcharts;
