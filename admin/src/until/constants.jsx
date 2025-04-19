import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart, MdAddCircleOutline } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { IoColorFilterSharp, IoInformationCircle } from "react-icons/io5";

export const UserTitle = ["User ID", "Name", "Phone", "Create At", "Action"];
export const ProductTitle = ["Product ID", "Image", "Name", "Price", "Category", "Brand", "Action"];
export const OrderTitle = ["ID", "Customer", "Order Date", "Total", "Payment", "Status", "Actions"];

export const UserColumnsToExport = [
  { header: "ID", accessor: "id" },
  { header: "Username", accessor: "username" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phonenumber" },
  { header: "Created At", accessor: "createdAt" },
];
export const OrderColumnsToExport = [
  { header: "ID", accessor: "id" },
  { header: "Username", accessor: "username" },
  { header: "Full Name", accessor: "fullname" },
  { header: "Phone", accessor: "phonenumber" },
  { header: "Address", accessor: "address" },
  { header: "Email", accessor: "email" },
  { header: "Order Date", accessor: "orderDate" },
  { header: "Total Price", accessor: "totalPrice" },
  { header: "Payment Method", accessor: "paymentMethod" },
  { header: "Status", accessor: "status" }
];
export const ProductColumnsToExport = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Price", accessor: "sellingPrice" },
  { header: "Category", accessor: "productType" },
  { header: "Brand", accessor: "brand" },
]  

export const sidebarSmall = [
  { name: "Dashboard", url: "/", icon: AiOutlineHome },
  { name: "Orders", url: "/orders", icon: MdOutlineShoppingCart },
  { name: "User", url: "/user", icon: LuUsers },
  { name: "Product", url: "/product", icon: BsBoxSeam },
];
export const mainMenuItem = [
    { name: "Dashboard", url: "/", icon: AiOutlineHome },
    { name: "Order Management", url: "/orders", icon: MdOutlineShoppingCart },
    { name: "User", url: "/user", icon: LuUsers },
    { name: "Reviews", url: "/reviews", icon: MdOutlineRateReview },
];

export const productItem = [
    { name: "Product List", url: "/product", icon: BsBoxSeam },
    {
      name: "Add Product",
      url: "/product/add-product",
      icon: MdAddCircleOutline,
    },
    {
      name: "Product Information",
      url: "/product/product-info",
      icon: IoInformationCircle,
    },
    {
      name: "Product Available",
      url:"/product/available",
      icon: IoColorFilterSharp,
    },
];

export const StarRating = ({ star }) => {
  const rate = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= star) {
        rate.push(<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400 opacity-100"/>);
    } else {
        rate.push(<input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400 "/>);
    }
  }
  return <>{rate}</>;
};
