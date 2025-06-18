import { useParams } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import OrderDetail from "../components/OrderDetail"

export const UserOrderDetails = () => {
    const {id} = useParams();
    return(
        <div className="component-container">
        <Navbar></Navbar>
        <OrderDetail id = {id}></OrderDetail>
        <Footer></Footer>
        </div>
    )
}