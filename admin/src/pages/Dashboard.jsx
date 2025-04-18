import { BiShoppingBag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

// import Widget from "../component/Graph/Widget";
// import TopSellingGraph from "../component/Graph/TopSelling";
// import BestSelling from "../component/Graph/BestSelling";
// import TrendingProduct from "../component/Graph/TrendingProduct";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [users, setUsers] = useState({
    total_user: 0,
    user_list: [],
  });
  const [profit, setProfit] = useState({
    total_profit: 0,
    profit_by_days: [],
  });
  const [orders, setOrders] = useState({
    total_order: 0,
    order_by_days: [],
  });
  const fetchTotalUser = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users/graph_users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProfit = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/total_profit");
      const data = await res.json();
      setProfit(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:8080/admin/total_order");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTotalUser();
    fetchProfit();
    fetchOrders();
  }, []);
  return (
    <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 custom-scroll-container">
      {/* <Widget
        title="Total Order"
        stat={orders.total_order}
        icon={<BiShoppingBag className="text-2xl text-red-500" />}
        url={"/orders"}
        data={orders?.order_by_days}
      />
      <Widget
        title="Total User"
        stat={users.total_user}
        icon={<FaUsers className="text-2xl text-blue-600" />}
        url={"/user"}
        data={users?.user_list}
      />
      <Widget
        title="Total Profit"
        stat={profit.total_profit}
        icon={<FaMoneyBill1Wave className="text-2xl text-green-600" />}
        url={"/transactions"}
        data={profit?.profit_by_days}
        view={false}
      />
      <TrendingProduct />

      <TopSellingGraph />
      <BestSelling /> */}
      <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 custom-scroll-container">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total User</h2>
          </div>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 custom-scroll-container">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total User</h2>
          </div>
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 custom-scroll-container">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Total User</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
