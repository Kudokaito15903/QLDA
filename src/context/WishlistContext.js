import { createContext, useContext, useEffect, useState } from "react";
import LogInContext from "./LogInContext";
import axios from "axios";
export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [numberOfItem, setNumberOfItem] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const { LoginData } = useContext(LogInContext);
  const { username } = LoginData;

  const wishListKey = `wishlist_${username || "guest"}`; //key cho ng dùng hoặc khách
  
  // lấy chi tiết sp thông qua producid
  const fetchProductDetails = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8080/view/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi fetch product details:", error);
      return null;
    }
  };
  
  //Load wishlist khi component mount
  useEffect(() => {
    const loadWishlist = async () => {
      let storedList = [];
      
      if (username === "Username") {
        // tải từ localStorage nếu ng dùng là khách
        storedList = localStorage.getItem(wishListKey) || "[]";
      } else {
        try {
          // lấy tca wishlists và lọc bởi ng dùng gần đây
          const response = await axios.get("http://localhost:8080/wishlist");
          const userWishlist = response.data
            .filter((item) => item.username === username) 
            .map((item) => item.product_id); //danh sách các ID sản phẩm mà người dùng đã thêm vào wishlist
          storedList = JSON.stringify(userWishlist);
        } catch (error) {
          console.error("Lỗi khi fetch wishlist từ server:", error);
        }
      }

      if (storedList) {
        const productIds = JSON.parse(storedList);
        const products = await Promise.all( //gọi fetchProductDetails(id) cho mỗi id trong mảng productIds
          productIds.map((id) => fetchProductDetails(id))
        );
        //trường hợp có sản phẩm trả về null
        const validProducts = products.filter((product) => product !== null);
        setWishlist(validProducts);
        setNumberOfItem(validProducts.length);
      }
    };

    loadWishlist();
  }, [wishListKey, username]);

  // Sync wishlist với localStorage (nếu là guest)
  useEffect(() => {
    if (username === "Username" && wishlist.length > 0) { //Nếu là khách và có wishlist
      localStorage.setItem(wishListKey, JSON.stringify(wishlist.map((item) => item.id))); //Lưu wishlist vào localStorage theo key wishlist_guest
    } else if (username === "Username") { //Nếu là khách nhưng wishlist trống
      localStorage.removeItem(wishListKey); //Xóa khỏi localStorage
    }
  }, [wishlist, wishListKey, username]);


  const addToWishList = (product) => {
    //Kiểm tra sản phẩm đã có trong wishlist chưa
    if (!wishlist.some((item) => item.id === product.id)) {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      setNumberOfItem(updatedWishlist.length);
      
      //Nếu là người dùng đã đăng nhập
      if (username !== "Username") {
        // Gửi một POST request đến backend để lưu wishlist
        axios
          .post("http://localhost:8080/wishlist/save", {
            id:username+product.id,
            username:username,
            product_id: product.id,
          })
          .catch((error) => {
            console.error("Lỗi khi lưu wishlist item:", error);
          });
      }
    }
  };

  const removeFromWishList = (productID) => {
    //chỉ loại những item trùng với tham số
    const updatedWishlist = wishlist.filter((item) => item.id !== productID);
    setWishlist(updatedWishlist);
    setNumberOfItem(updatedWishlist.length);

    //nếu là người dùng đăng nhập
    if (username !== "Username") {
      //Gửi một request DELETE đến backend gồm id, username, product_id
      axios
        .delete(`http://localhost:8080/wishlist/delete`, {
          data: { id:username+productID, username:username, product_id: productID },
        })
        .catch((error) => {
          console.error("Lỗi khi xóa wishlist item:", error);
        });
    }
  };

  const isInWishlist = (productID) => {
    return wishlist.some((item) => item.id === productID);
    //trả bool nếu productId đã có trong wishlist
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        setWishlist,
        numberOfItem,
        addToWishList,
        removeFromWishList,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
