import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { usePieQuery } from "../../../redux/api/dashboardApi";
import { RootState } from "../../../redux/store";

const PieCharts = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError } = usePieQuery(user?._id!);

  if (isError) return <Navigate to={"/admin/dashboard"}/>
  console.log(data);
  const charts = data?.charts!;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        {
          isLoading
            ? <>Loader</>
            : (<>
              <h1>Pie & Doughnut Charts</h1>
              <section>
                <div>
                  <PieChart
                    labels={["Processing", "Shipped", "Delivered"]}
                    data={[charts.status.processing, charts.status.shipped, charts.status.delivered]}
                    backgroundColor={[
                      `hsl(110,80%, 80%)`,
                      `hsl(110,80%, 50%)`,
                      `hsl(110,40%, 50%)`,
                    ]}
                    offset={[0, 0, 50]}
                  />
                </div>
                <h2>Order Fulfillment Ratio</h2>
              </section>

              <section>
                <div>
                  <DoughnutChart
                    labels={charts.categoryCount.map(i => Object.keys(i)[0])}
                    data={charts.categoryCount.map(i => Object.values(i)[0])}

                    backgroundColor={charts.categoryCount.map(i => {
                      const value = Object.values(i)[0];
                      return `hsl(${value * 5},${value}%,50%)`;
                    })}
                    legends={false}
                    offset={[0, 0, 0, 80]}
                  />
                </div>
                <h2>Product Categories Ratio</h2>
              </section>

              <section>
                <div>
                  <DoughnutChart
                    labels={["In Stock", "Out Of Stock"]}
                    data={[charts.stockAvailability.inStock, charts.stockAvailability.outStock]}
                    backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                    legends={false}
                    offset={[0, 80]}
                    cutout={"70%"}
                  />
                </div>
                <h2> Stock Availability</h2>
              </section>

              <section>
                <div>
                  <DoughnutChart
                    labels={[
                      "Marketing Cost",
                      "Discount",
                      "Burnt",
                      "Production Cost",
                      "Net Margin",
                    ]}
                    data={[
                      charts.revenueDistibution.marketingCost,
                      charts.revenueDistibution.discount,
                      charts.revenueDistibution.burnt,
                      charts.revenueDistibution.productionCost,
                      charts.revenueDistibution.netMargin,
                    ]}
                    backgroundColor={[
                      "hsl(110,80%,40%)",
                      "hsl(19,80%,40%)",
                      "hsl(69,80%,40%)",
                      "hsl(300,80%,40%)",
                      "rgb(53, 162, 255)",
                    ]}
                    legends={false}
                    offset={[20, 30, 20, 30, 80]}
                  />
                </div>
                <h2>Revenue Distribution</h2>
              </section>

              <section>
                <div>
                  <PieChart
                    labels={[
                      "Teenager(Below 20)",
                      "Adult (20-40)",
                      "Older (above 40)",
                    ]}
                    data={[
                      charts.userAgeGroup.teen,
                      charts.userAgeGroup.adult,
                      charts.userAgeGroup.old,
                    ]}
                    backgroundColor={[
                      `hsl(10, ${80}%, 80%)`,
                      `hsl(10, ${80}%, 50%)`,
                      `hsl(10, ${40}%, 50%)`,
                    ]}
                    offset={[0, 0, 50]}
                  />
                </div>
                <h2>Users Age Group</h2>
              </section>

              <section>
                <div>
                  <DoughnutChart
                    labels={["Admin", "Customers"]}
                    data={[charts.AdminCustomer.admin, charts.AdminCustomer.customer]}
                    backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                    offset={[0, 50]}
                  />
                </div>
              </section>
            </>)
        }

      </main>
    </div>
  );
};

export default PieCharts;
