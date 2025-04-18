import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart, MdAddCircleOutline } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineRateReview } from "react-icons/md";
import { IoColorFilterSharp, IoInformationCircle } from "react-icons/io5";

export const UserTitle = ["User ID", "Name", "Phone", "Create At", "Action"];
export const ProductTitle = ["Product ID", "Image", "Name", "Price", "Category", "Brand", "Action"];
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

export const adminItem = [
    { name: "Manage Admins", url: "/admin", icon: RiAdminLine },
];
 