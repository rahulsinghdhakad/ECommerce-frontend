import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../components/admin/Charts";
import Table from "../../components/admin/DashboardTable";
import { useStatsQuery } from "../../redux/api/dashboardApi";
import { RootState } from "../../redux/store";
import { getLastMonts } from "../../utils/feature";
import Loader from "../../components/Loader";

const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { data, isLoading, isError } = useStatsQuery(user?._id!);

  if (isError) return <Navigate to={"/"}/>

  const stats=data?.stats!;

  const {last6Month}=getLastMonts();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
        {
          isLoading
            ? <Loader/>
            : (<>
              <div className="bar">
                <BsSearch />
                <input type="text" placeholder="Search for data, users, docs" />
                <FaRegBell />
                <img src={user?.photo || userImg} alt="User" />
              </div>

              <section className="widget-container">
                <WidgetItem
                  percent={stats.changePercentage.revenue}
                  amount={true}
                  value={stats.count.revenue}
                  heading="Revenue"
                />
                <WidgetItem
                  percent={stats.changePercentage.user}
                  value={stats.count.user}
                  heading="Users"
                />
                <WidgetItem
                  percent={stats.changePercentage.order}
                  value={stats.count.order}
                  heading="Transactions"
                />

                <WidgetItem
                  percent={stats.changePercentage.product}
                  value={stats.count.product}
                  heading="Products"
                />
              </section>

              <section className="graph-container">
                <div className="revenue-chart">
                  <h2>Revenue & Transaction</h2>
                  <BarChart
                    data_2={stats.chart.order}
                    data_1={stats.chart.revenue}
                    labels={last6Month}
                    title_1="Revenue"
                    title_2="Transaction"
                    bgColor_1="rgb(0, 115, 255)"
                    bgColor_2="rgba(53, 162, 235, 0.8)"
                  />
                </div>

                <div className="dashboard-categories">
                  <h2>Inventory</h2>

                  <div>
                    {
                      data?.stats.categoryCount.map((i) => {
                        const [heading, value] = Object.entries(i)[0];
                        return (
                          <CategoryItem
                            key={heading}
                            value={value}
                            heading={heading}
                            color={`hsl(${value * 4}, ${value}%, 50%)`}
                          />
                        )
                      })
                    }
                  </div>
                </div>
              </section>

              <section className="transaction-container">
                <div className="gender-chart">
                  <h2>Gender Ratio</h2>
                  <DoughnutChart
                    labels={["Female", "Male"]}
                    data={[stats.UserRation.female,stats.UserRation.male]}
                    backgroundColor={[
                      "hsl(340, 82%, 56%)",
                      "rgba(53, 162, 235, 0.8)",
                    ]}
                    cutout={90}
                  />
                  <p>
                    <BiMaleFemale />
                  </p>
                </div>
                <Table data={(data?.stats.latestTransaction.map(i => ({
                  _id: i._id,
                  quantity: i.orderItems,
                  discount: i.disconnect,
                  amount: i.total,
                  status: i.status,
                })))!} />
              </section>
            </>)
        }

      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  amount = false,
}: WidgetItemProps) => {

  if(percent>=10000) percent=9999;
  if(percent<=-10000) percent=-9999;

  const color=`hsl(${percent},60%,50%)`
  return (
    <article className="widget">
      <div className="widget-info">
        <p>{heading}</p>
        <h4>{amount ? `₹${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp /> +{percent}%{" "}
          </span>
        ) : (
          <span className="red">
            <HiTrendingDown /> {percent}%{" "}
          </span>
        )}
      </div>
  
      <div
        className="widget-circle"
        style={{
          background: `conic-gradient(
          ${color} ${(Math.abs(percent) / 100) * 360}deg,
          rgb(255, 255, 255) 0
        )`,
        }}
      >
        <span
          style={{
            color,
          }}
        >
          {percent}%
        </span>
      </div>
    </article>
  )
};

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
