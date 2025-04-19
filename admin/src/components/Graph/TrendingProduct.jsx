import { useEffect, useState } from "react"
import { SlChart } from "react-icons/sl";
import axios from "axios"
function TrendingProduct() {
  const [TopSellingProduct, setTopSellingProduct] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/admin/trending_products?size=5"
        );
        setTopSellingProduct(res.data.content); 
        console.log(res.data.content);
      } catch (err) {
        console.error(err); 
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="bg-white rounded-lg col-span-1 flex flex-col gap-4 p-6">
      <h2 className="font-bold text-lg flex items-center gap-2">
        <SlChart className="text-2xl text-blue-500 mr-4"/>Trending Product
      </h2>
      <div className="flex flex-col gap-4 ml-6">
        {TopSellingProduct.map(item => {
          return (
            <div
              className="flex items-center justify-between gap-6"
              key={item.id}
            >
              <div className="flex flex-col">
                <h2 className="text-sm font-bold">{item.name}</h2>
                <h3 className="text-xs font-bold text-[#8B909A]">
                  ID: #{item.id}
                </h3>
              </div>
              <div className="font-semibold">${item.sellingPrice}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TrendingProduct
