import { useEffect, useMemo, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Table from "../components/Table";
import axios from "axios";
import ExportToExcel from "../components/ExportToExcel";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import { OrderTitle, OrderColumnsToExport } from "../until/constants";
export default function Orders() {
  const [query, setQuery] = useState("");
  const titleRef = useRef(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/orders/?page=${currentPage}&size=5`);
      setOrders(res.data.content || []);
      setTotalPages(res.data.totalPages || 0);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewClick = (order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const filterOrders = useMemo(() => {
    if (!query.trim()) {
      return orders;
    }
    return orders.filter((item) => {
      const title = titleRef.current?.value;
      const searchQuery = query.toLowerCase();
      
      switch (title) {
        case "id":
          return item.id.toString().includes(searchQuery);
        case "customer":
          return (
            item.username.toLowerCase().includes(searchQuery) || 
            (item.fullname && item.fullname.toLowerCase().includes(searchQuery))
          );
        case "email":
          return item.email.toLowerCase().includes(searchQuery);
        case "phone":
          return item.phonenumber && item.phonenumber.toLowerCase().includes(searchQuery);
        case "status":
          return item.status.toLowerCase().includes(searchQuery);
        case "payment":
          return item.paymentMethod.toLowerCase().includes(searchQuery);
        default:
          return (
            item.username.toLowerCase().includes(searchQuery) ||
            (item.email && item.email.toLowerCase().includes(searchQuery))
          );
      }
    });
  }, [query, orders]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusBadge = (status) => {
    let colorClass = "bg-gray-200 text-gray-800";
    if (status.toLowerCase() === "completed") {
      colorClass = "bg-green-100 text-green-800";
    } else if (status.toLowerCase() === "processing") {
      colorClass = "bg-blue-100 text-blue-800";
    } else if (status.toLowerCase() === "cancelled") {
      colorClass = "bg-red-100 text-red-800";
    } else if (status.toLowerCase() === "pending") {
      colorClass = "bg-yellow-100 text-yellow-800";
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {status}
      </span>
    );
  };

  const rowsDisplay = useMemo(() => {
    return filterOrders.map((order) => {
      return (
        <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
          <td>#{order.id}</td>
          <td>
            <div className="font-bold text-gray-800">{order.fullname || order.username}</div>
            <div className="text-sm text-gray-500">{order.email}</div>
          </td>
          <td>{formatDate(order.orderDate)}</td>
          <td className="font-medium">{formatPrice(order.totalPrice)}</td>
          <td>{order.paymentMethod}</td>
          <td>{getStatusBadge(order.status)}</td>
          <td>
            <div className="flex gap-2 items-center justify-center">
              <button 
                onClick={() => handleViewClick(order)}
                className="p-1.5 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
                title="View Details"
              >
                <FaEye className="text-blue-600" />
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }, [filterOrders]);

  return (
    <div className="overflow-auto custom-scroll-container bg-white rounded-xl shadow-lg sm:m-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Management</h2>
        <TopSection
          query={query}
          setQuery={setQuery}
          titleRef={titleRef}
          setCurrentPage={setCurrentPage}
          filterOrders={filterOrders}
          columnsToExport={OrderColumnsToExport}
        />
      </div>
      <div className="px-6">
        <Table title={OrderTitle} RowsDisplay={rowsDisplay} />
      </div>
      
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {/* View Order Modal */}
      {isViewModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
          <div className="relative bg-white rounded-lg shadow-xl w-11/12 max-w-4xl mx-auto">
            <div className="flex items-center justify-between p-5 border-b">
              <h3 className="text-xl font-semibold text-gray-900">
                Order #{selectedOrder.id} Details
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">Customer Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2"><span className="font-medium">Name:</span> {selectedOrder.fullname}</p>
                    <p className="mb-2"><span className="font-medium">Username:</span> {selectedOrder.username}</p>
                    <p className="mb-2"><span className="font-medium">Email:</span> {selectedOrder.email}</p>
                    <p className="mb-2"><span className="font-medium">Phone:</span> {selectedOrder.phonenumber}</p>
                    <p><span className="font-medium">Address:</span> {selectedOrder.address}</p>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-700">Order Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2"><span className="font-medium">Order Date:</span> {formatDate(selectedOrder.orderDate)}</p>
                    <p className="mb-2"><span className="font-medium">Total Price:</span> {formatPrice(selectedOrder.totalPrice)}</p>
                    <p className="mb-2"><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                    <p className="mb-2"><span className="font-medium">Payment Status:</span> {selectedOrder.paid ? "Paid" : "Unpaid"}</p>
                    <p className="mb-2">
                      <span className="font-medium">Status:</span> {getStatusBadge(selectedOrder.status)}
                    </p>
                    <p className="mb-2"><span className="font-medium">Delivery Status:</span> {selectedOrder.deliveryState}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="btn btn-outline hover:bg-gray-200 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TopSection(props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-3">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 border-b-2 border-gray-300 focus-within:border-blue-500 transition-colors duration-200 px-2 py-1 rounded-t-md">
          <IoMdSearch className="text-2xl text-gray-500" />
          <input
            onChange={(e) => {
              props.setQuery(e.target.value);
              props.setCurrentPage(0);
            }}
            type="search"
            className="h-8 focus:outline-none w-52"
            placeholder="Search orders..."
          />
        </div>
        <select 
          ref={props.titleRef} 
          onChange={() => props.setQuery("")}
          className="select select-bordered rounded-md h-10 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        >
          <option value="customer">Customer</option>
          <option value="id">Order ID</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="status">Status</option>
          <option value="payment">Payment Method</option>
        </select>
      </div>
      <ExportToExcel
        data={props.filterOrders}
        fileName="Orders.xlsx"
        columns={props.columnsToExport}
      />
    </div>
  );
}