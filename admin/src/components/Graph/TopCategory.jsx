import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
export default function TopCategory() {
  const [categoryStat, setCategoryStat] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const res = await axios.get("http://localhost:8080/api/admin/top_category?sort=desc&&sortBy=totalSold");
      setCategoryStat(res.data);
    };
    fetchCategory();
  }, []);
  return (
    <div className="bg-white rounded-lg col-span-1 flex flex-col gap-4 p-6">
      <h2 className="font-bold text-lg flex items-center gap-2">
        <SlChart className="text-2xl text-blue-500 mr-4"/>Top Category
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={categoryStat} dataKey="totalSold" nameKey="productType" fill="#8884d8" />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
