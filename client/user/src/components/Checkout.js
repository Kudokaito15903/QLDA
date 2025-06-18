import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  let subTotal = location.state?.subtotal;
  
  const handlePayment = () => {
    
  };

  return (
    <div className="py-3 py-md-4 checkout">
      <div className="container">
        <div className="col-md-12 mb-4 shadow bg-white p-3">
          <h4>
            Tổng tiền:
            <span className="float-end">{subTotal.toLocaleString('vi-VN')}đ</span>
          </h4>
          <hr />
          <button className="btn w-100 mt-3" onClick={handlePayment} style={{ background: "#871C1C", color: "#fff"}}>
            Xác nhận Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


