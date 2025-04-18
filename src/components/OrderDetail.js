import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";


export default function OrderDetail({ id }) {
  const [details, setDetails] = useState([]);
  const [overview, setOverview] = useState();

  const calculateTotal = () => {
    return details.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/orderdetails/${id}`);
        const data = await response.json();
        setDetails(data);

        const response1 = await fetch(`http://localhost:8080/orders/byid/${id}`);
        const data1 = await response1.json();
        setOverview(data1);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="container my-5" style={{maxWidth:"1200px"}}>
      <div className="row g-4">
        {/* Order Overview */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header d-flex align-items-center bg-primary text-white">
              <RiShoppingCart2Line className="me-2" size={24} />
              <h5 className="mb-0">Order Details</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li style={{marginBottom:"0.5rem"}}><strong>Order ID:</strong> {overview?.orderID}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Card Owner:</strong> {overview?.fullname}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Status:</strong> {overview?.status}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Order Date:</strong> {overview?.order_date}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-header d-flex align-items-center bg-primary text-white">
              <LiaShippingFastSolid className="me-2" size={24} />
              <h5 className="mb-0">Shipping Details</h5>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li style={{marginBottom:"0.5rem"}}><strong>Address:</strong> {overview?.address}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Phone:</strong> {overview?.phonenumber}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Email:</strong> {overview?.email}</li>
                <li style={{marginBottom:"0.5rem"}}><strong>Payment Method:</strong> {overview?.payment_method}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="table-responsive my-4">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{textAlign:"center"}}>#</th>
              <th style={{textAlign:"center"}}>Product</th>
              <th style={{textAlign:"center"}}>Color</th>
              <th style={{textAlign:"center"}}>Quantity</th>
              <th style={{textAlign:"center"}}>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index}>
                <td style={{textAlign:"center"}}>{index + 1}</td>
                <td style={{textAlign:"center"}}>{item.productName}</td>
                <td style={{textAlign:"center"}}>{item.color}</td>
                <td style={{textAlign:"center"}}>{item.quantity}</td>
                <td style={{textAlign:"center"}}>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Total */}
      <div className="row justify-content-end">
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex justify-content-between mb-3">
              <span>Shipping:</span>
              <strong>Free</strong>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span>Total:</span>
              <strong>${calculateTotal()}</strong>
            </div>
            <Link
              to={"/order"}
              className="btn btn-primary w-100"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
