
import ProductView from "../components/ProductView";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
const ProductPage = () => {
    const {id} = useParams(); 
    return(
        <div className="component-container">
        <Navbar></Navbar>
        <ProductView id={id}></ProductView>
        <Footer></Footer>
        </div>
    )
}
export default ProductPage;